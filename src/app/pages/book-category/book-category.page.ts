import { Component, OnInit } from '@angular/core';
import {AcademicModel, LibraryService} from '../../services/library.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.page.html',
  styleUrls: ['./book-category.page.scss'],
})
export class BookCategoryPage implements OnInit {

  categories: [AcademicModel];

  constructor(private libraryService: LibraryService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    return this.libraryService.getAllCategoriesFromServer().subscribe((data) => {
      this.libraryService.setCategory(data);
      this.categories = data;
    });
  }

  openSource(data) {
    console.log('open', data);
    return this.libraryService.getSomeBooks().subscribe((books) => {
      console.log(books);
    });
  }

  getBlockColor(name) {
    return this.sanitizer.bypassSecurityTrustStyle(`--myvar: #${this.intToRGB(this.hashCode(name))}`);
  }

  hashCode(str) {
    // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c + '80';
  }

}
