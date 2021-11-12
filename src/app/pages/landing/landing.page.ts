import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../../services/library.service';
import {Platform} from '@ionic/angular';
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  books = [];
  optionSlide = {
    slidesPerView: 4.5,
    freeMode: true
  };

  constructor(private libraryService: LibraryService,
              private platform: Platform) {
  }

  ngOnInit() {
    this.libraryService.getSomeBooks().subscribe((booksArray) => {
      booksArray.map((bks) => bks.forEach((x) => this.books.push(x)));
    });
  }

  async proVersion() {
    await Browser.open({url: 'https://cafebazaar.ir/app/ir.mohammad.malekzad.ketabyab'});
  }

}
