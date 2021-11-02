import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AcademicModel, BookModel} from '../../services/library.service';
import {HttpService} from '../../services/http.service';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-library-book',
  templateUrl: './library-book.page.html',
  styleUrls: ['./library-book.page.scss'],
})
export class LibraryBookPage implements OnInit {
  field: AcademicModel;
  books: BookModel[];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((books) => {
      if (this.router.getCurrentNavigation().extras.state.data) {
        this.field = this.router.getCurrentNavigation().extras.state.data;
        this.books = this.field.books;
      }
    });
  }

  async downloadPreview(url: string, bookName: string) {
    const loading = await this.loadingCtrl.create({
      message: 'لطفا منتظر بمانید'
    });
    const toast = await this.toastCtrl.create({
      message: 'اشکالی در ارتباط با سرور وجود دارد',
      duration: 1500
    });
    loading.present();
    this.httpService.downloadBook(encodeURI(url), bookName).then(() => {
      loading.dismiss();
      console.log('download complete');
    }).catch(e => {
      toast.present();
      loading.dismiss();
    });
  }


}
