import { Component, OnInit } from '@angular/core';
import {InAppPurchase} from '@ionic-native/in-app-purchase/ngx';

const PRODUCT_ID = 'bookId';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  products = [];
  constructor(private inAppPurchase: InAppPurchase) { }

  ngOnInit() {
  }

  getProducts() {
    this.inAppPurchase.getProducts([PRODUCT_ID]).then((product) => {
      this.products = product;
      console.log(product);
    });
  }

}
