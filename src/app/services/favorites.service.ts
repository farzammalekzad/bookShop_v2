import {Injectable} from '@angular/core';
import {SearchBookModel} from './library.service';
import {Storage} from '@capacitor/storage';

export const FAVOR_KEY = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  selectedFavor: SearchBookModel;

  constructor() { }

  async addFavor(book: SearchBookModel) {
    const status = await this.checkFavor(book.id);
    let favorites = [];
    console.log(status);
    if (!status) {
     await this.getFavor().then(async (favors) => {
       if (favors != null) {
         favorites = favors;
         favorites.push(book);
         await Storage.set({key: FAVOR_KEY, value: JSON.stringify(favorites)});
       } else {
         favorites = [];
         favorites.push(book);
         await Storage.set({key: FAVOR_KEY, value: JSON.stringify(favorites)});
       }
      });
    }
  }

  async checkFavor(id: string): Promise<boolean> {
    let status = false;
    await this.getFavor().then((favors) => {
      if (favors != null) {
        favors.find((f) => {
          if (f.id == id) {
            status = true;
          }
        });
      }
    });
    return status;
  }

  public async clearFavor() {
    await Storage.remove({key: FAVOR_KEY});
  }

  public async getFavorById(id: string): Promise<SearchBookModel> {
    let favorite = [];
    const favorites = await this.getFavor();
    favorite = favorites.filter(f => f.id == id);
    return await favorite[0];
  }

  public async removeById(id: string) {
    let newFavorites = [];
    const favorites = await this.getFavor();
    newFavorites = favorites.filter((favor) => favor.id != id);
    await Storage.set({key: FAVOR_KEY, value: JSON.stringify(newFavorites)});
  }

  public getFavor(): Promise<SearchBookModel[]> {
    return this.getFavorAsArray();
  }

 private async getFavorAsArray(): Promise<SearchBookModel[]> {
    const favorites = await Storage.get({key: FAVOR_KEY});
    let favoritesArr = [];
    if (favorites.value) {
      favoritesArr = JSON.parse(favorites.value);
      return favoritesArr;
    }
    return null;
  }
}
