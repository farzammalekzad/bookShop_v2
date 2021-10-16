import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../../services/library.service';

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

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.libraryService.getSomeBooks().subscribe((booksArray) => {
      booksArray.map((bks) => bks.forEach((x) =>  this.books.push(x)));
    });
  }

}
