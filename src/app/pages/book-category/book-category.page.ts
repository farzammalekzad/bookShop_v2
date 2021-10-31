import { Component, OnInit } from '@angular/core';
import {AcademicModel, LibraryService} from '../../services/library.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.page.html',
  styleUrls: ['./book-category.page.scss'],
})
export class BookCategoryPage implements OnInit {

  categories: [AcademicModel];

  constructor(private libraryService: LibraryService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    return this.libraryService.getAllCategoriesFromServer().subscribe((data) => {
      this.libraryService.setCategory(data);
      this.categories = data;
    });
  }

  openSource(id: string) {
    console.log('open', id);
    return this.libraryService.getCurrentCategoryById(id).subscribe((academic) => {
      const navigationExtras: NavigationExtras = {
        state: {
          data: academic
        }
      };
      this.router.navigateByUrl('library-book', navigationExtras);
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
