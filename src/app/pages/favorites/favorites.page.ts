import { Component, OnInit } from '@angular/core';
import {FavoritesService} from '../../services/favorites.service';
import {SearchBookModel} from '../../services/library.service';
import {NavigationExtras, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: SearchBookModel[];
  favorite: SearchBookModel;

  constructor(private favService: FavoritesService,
              private router: Router,
              private toastCtrl: ToastController) { }

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
    const toast = await this.toastCtrl.create({
      message: 'علاقمندی حذف شد',
      duration: 1500
    });
    await this.favService.removeById(id).then(() => {
      toast.present();
      this.loadFav();
    });
  }

}
