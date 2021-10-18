import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LibraryService, SearchBookModel} from '../../services/library.service';
import {Browser} from '@capacitor/browser';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  results: SearchBookModel[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private libraryService: LibraryService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.results = this.router.getCurrentNavigation().extras.state.result;
      } else {
        this.libraryService.getAllCurrentSearchResult().subscribe((books) => {
          this.results = books;
        });
      }
    });
  }

  downloadPage(detail: SearchBookModel) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: detail
      }
    };
    console.log(navigationExtras);
    this.router.navigateByUrl('detail-book', navigationExtras);
  }



}
