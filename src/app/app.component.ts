import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Network} from '@capacitor/network';
import {Capacitor} from '@capacitor/core';
import {AlertController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document,
              private platform: Platform,
              private alertCtrl: AlertController) {
    this.document.documentElement.dir = 'rtl';
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.currentStatus();
    });
  }

  async currentStatus() {
    const alert = await this.alertCtrl.create({
      header: 'اشکال ارتباطی',
      message: 'ارتباط خود را با اینترنت ایجاد نمایید',
      buttons: ['حتما']
    });
    const status = await Network.getStatus();
    if (!status.connected) {
      alert.present();
    }
  }



}
