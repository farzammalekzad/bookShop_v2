import { Component, OnInit } from '@angular/core';
import {FavoritesService} from '../../services/favorites.service';
import {SearchBookModel} from '../../services/library.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: SearchBookModel[];
  favorite: SearchBookModel;

  constructor(private favService: FavoritesService, private router: Router) { }

  ngOnInit() {
    this.loadFav();
  }

  async loadFav() {
    this.favService.getFavor().then((favs) => {
      if (favs == null) {
        console.log(favs);
        this.favorites = null;
      }
      this.favorites = favs;
    });
  }

   async openDetail(id: string) {
    const favorite = await this.favService.getFavorById(id);
    const navigationExtras: NavigationExtras = {
      state: {
        data: favorite
      }
    };
    this.router.navigateByUrl('detail-book', navigationExtras);
  }

  async deleteFav(id: string) {
   await this.favService.removeById(id).then(() => {
      this.loadFav();
    });
  }

}
