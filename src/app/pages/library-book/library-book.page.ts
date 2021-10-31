import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AcademicModel, BookModel} from '../../services/library.service';
import {HttpService} from '../../services/http.service';

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
              private httpService: HttpService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((books) => {
      if (this.router.getCurrentNavigation().extras.state.data) {
        this.field = this.router.getCurrentNavigation().extras.state.data;
        this.books = this.field.books;
      }
    });
  }

  downloadPreview(url: string, bookName: string) {
    this.httpService.downloadBook(encodeURI(url), bookName).then(() => {
      console.log('download complete');
    });

  }


}
