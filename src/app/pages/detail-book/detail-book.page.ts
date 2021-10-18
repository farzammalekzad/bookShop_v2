import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel} from '../../services/library.service';
import {HttpService} from '../../services/http.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  book: BookModel;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: HttpService, private domSanitizer: DomSanitizer) { }
  data = null;
  myImage = null;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((book) => {
      if (this.router.getCurrentNavigation().extras.state.data) {
        this.book = this.router.getCurrentNavigation().extras.state.data;
        console.log(this.book);
      }
    });
  }

  nativeCall() {
    this.httpService.doGet('http://31.42.184.140/covers/22000/6b51705939229182e3e5e7a61ba7d907-d.jpg').subscribe((res: any) => {
      this.data = res.data.specials;
    });
  }

  downloadFile() {
    this.httpService.downloadFile().then((base64) => {
      this.myImage = this.domSanitizer.bypassSecurityTrustResourceUrl(base64);
    });

  }


}
