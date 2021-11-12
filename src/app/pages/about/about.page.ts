import { Component, OnInit } from '@angular/core';
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async openMalekzadSite() {
    await Browser.open({url: 'http://www.mohammad-malekzad.ir'});
  }

  async openMalekzadInsta() {
    await Browser.open({url: 'https://www.instagram.com/farzammalekzad/'});
  }

  async downloadBookApp() {
    await Browser.open({url: 'https://cafebazaar.ir/app/ir.mohammad.malekzad.ketabyab'});
  }

  async downloadBookAppLite() {
    await Browser.open({url: 'https://cafebazaar.ir/app/ir.malekzad.mohammad.moviebank'});
  }

  async downloadNcReport() {
    await Browser.open({url: 'https://cafebazaar.ir/app/ir.mohammad.malekzad'});
  }

  async openAppInsta() {
    await Browser.open({url: 'https://www.instagram.com/downloadbook/'});

  }


}
