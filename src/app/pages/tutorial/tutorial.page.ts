import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Storage} from '@capacitor/storage';
import {SEEN_KEY} from '../../guard/tutorial.guard';
import {Router} from '@angular/router';
export const TRIAL_KEY = 'trial';
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async finish() {
    await Storage.set({key: SEEN_KEY, value: JSON.stringify(true)});
    await Storage.set({key: TRIAL_KEY, value: JSON.stringify(true)});
    this.router.navigateByUrl('/landing');
  }

}
