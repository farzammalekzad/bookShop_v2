import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel, SearchBookModel} from '../../services/library.service';
import {HttpService} from '../../services/http.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DownloadBookService} from '../../services/download-book.service';
import {FavoritesService} from '../../services/favorites.service';

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
              private favorService: FavoritesService) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((book) => {
      this.isLoading = true;
      if (this.router.getCurrentNavigation().extras.state.data) {
        this.book = this.router.getCurrentNavigation().extras.state.data;
        this.isLoading = false;
      }
    });
  }

  downloadFile(url) {
    this.httpService.downloadFile(url).then((base64) => {
      this.myImage = this.domSanitizer.bypassSecurityTrustResourceUrl(base64);
    });
  }

  download(url, name) {
    this.httpService.downloadBook(encodeURI(url), name).then((base64) => {
      this.myBook = base64;
    });
  }

  addFavorites() {
    this.favorService.addFavor(this.book).then(() => {
      console.log('added to storage');
    }).catch(e => {
      console.log('Error', e);
    });



  }

  share(book) {

  }

}
