import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel, SearchBookModel} from '../../services/library.service';
import {HttpService} from '../../services/http.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DownloadBookService} from '../../services/download-book.service';
import {FavoritesService} from '../../services/favorites.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Share} from '@capacitor/share';
import {Storage} from '@capacitor/storage';
import {TRIAL_KEY} from '../tutorial/tutorial.page';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  book: SearchBookModel;
  data = null;
  myImage = null;
  myBook = null;
  isLoading = false;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private domSanitizer: DomSanitizer,
              private downloadBookService: DownloadBookService,
              private favorService: FavoritesService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }


   ngOnInit() {

    this.activatedRoute.queryParams.subscribe((book) => {
      this.isLoading = true;
      if (this.router.getCurrentNavigation().extras.state.data) {
        this.book = this.router.getCurrentNavigation().extras.state.data;
        this.isLoading = false;
      }
    }, e => {
      console.log(e);
    });
  }

 async downloadFile(url) {
    const toast = await this.toastCtrl.create({
      message: 'اشکالی در ارتباط با سرور وجود دارد',
      duration: 1500
    });
    this.httpService.downloadFile(url).then((base64) => {
      this.myImage = this.domSanitizer.bypassSecurityTrustResourceUrl(base64);
    }).catch(e => {
      toast.present();
    });
  }

  async download(url, name) {
    const trial = await Storage.get({key: TRIAL_KEY});
    console.log(JSON.parse(trial.value));
    if (JSON.parse(trial.value)) {
      const loading = await this.loadingCtrl.create({
        message: 'لطفا منتظر بمانید'
      });
      const toast = await this.toastCtrl.create({
        message: 'اشکالی در ارتباط با سرور وجود دارد',
        duration: 1500
      });
      loading.present();
      if (this.book.extension == 'pdf') {
        console.log('pdf');
        this.httpService.downloadBook(encodeURI(url), name).then(async (base64) => {
          this.myBook = base64;
          loading.dismiss();
          await Storage.set({key: TRIAL_KEY, value: JSON.stringify(false)});
        }).catch(e => {
          toast.present();
          loading.dismiss();
        });
      } else if (this.book.extension == 'chm') {
        console.log('chm');
        this.httpService.downloadBookChm(encodeURI(url), name).then(async (base64) => {
          this.myBook = base64;
          loading.dismiss();
          await Storage.set({key: TRIAL_KEY, value: JSON.stringify(false)});
        }).catch(e => {
          toast.present();
          loading.dismiss();
        });
      } else if (this.book.extension == 'epub') {
        console.log('epub');
        this.httpService.downloadBookEpub(encodeURI(url), name).then(async (base64) => {
          this.myBook = base64;
          loading.dismiss();
          await Storage.set({key: TRIAL_KEY, value: JSON.stringify(false)});
        }).catch(e => {
          toast.present();
          loading.dismiss();
        });
      }
    }
    else {
      const alert = await this.alertCtrl.create({
        header: 'خریداری نسخه کامل',
        message: 'برای دانلود بیش از یک کتاب باید نسخه کامل خریداری شود',
        buttons: ['باشه']
      });
      alert.present();
    }
  }

  async addFavorites() {
    const toast = await this.toastCtrl.create({
      message: 'کتاب به علاقمندی‌ها اضافه شد',
      duration: 1500
    });
    this.favorService.addFavor(this.book).then(() => {
      toast.present();
      console.log('added to storage');
    }).catch(e => {
      console.log('Error', e);
    });



  }

  async share() {
    await Share.share({
      text: `به شما کتاب زیر با عنوان: ${this.book.title} - نویسنده: ${this.book.author} - زبان: ${this.book.language} - فرمت: ${this.book.extension}در این اپلیکیشن پیشنهاد شده است`,
      url: 'https://cafebazaar.ir/app/ir.mohammad.malekzad.ketabyablite'
    });
  }

}
