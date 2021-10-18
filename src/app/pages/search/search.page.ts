import { Component, OnInit } from '@angular/core';
import {BookModel, LibraryService} from '../../services/library.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchInput: string;


  constructor(private libraryService: LibraryService, private router: Router) { }

  ngOnInit() {

  }

  search() {
    this.libraryService.searching(this.searchInput).subscribe((books) => {
      const navigationExtras: NavigationExtras = {
        state: {
          result: books
        }
      };
      this.libraryService.setSearchResult(books);
      console.log(navigationExtras);
      this.router.navigateByUrl('search/details', navigationExtras);
    });

  }

}
