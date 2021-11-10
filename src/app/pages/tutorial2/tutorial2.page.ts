import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-tutorial2',
  templateUrl: './tutorial2.page.html',
  styleUrls: ['./tutorial2.page.scss'],
})
export class Tutorial2Page implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private router: Router) { }

  ngOnInit() {
  }



  async finish() {
    await this.slides.isBeginning();
    await this.router.navigateByUrl('/landing');
  }

}
