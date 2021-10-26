import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-downloaded-book',
  templateUrl: './downloaded-book.page.html',
  styleUrls: ['./downloaded-book.page.scss'],
})
export class DownloadedBookPage implements OnInit {
  books: any;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getBook().then((books) => {
      this.books = books;
      console.log(books);
    });
  }

}
