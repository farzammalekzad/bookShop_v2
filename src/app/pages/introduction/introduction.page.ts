import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import data from '../../../assets/feed.json';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {
  feed = data;
  @ViewChildren('player') videoPlayers: QueryList<any>;
  currentPlaying: HTMLVideoElement = null;
  constructor() { }

  ngOnInit() {
  }

  didScroll() {
    if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)) {
      return;
    } else if (this.currentPlaying && !this.isElementInViewport(this.currentPlaying)) {
      this.currentPlaying.pause();
      this.currentPlaying = null;
    }

   this.videoPlayers.forEach((player) => {
     if (this.currentPlaying) {
       return;
     }

     const nativeElement = player.nativeElement;
     const inView = this.isElementInViewport(nativeElement);

     if (inView) {
       this.currentPlaying = nativeElement;
       this.currentPlaying.muted = true;
       this.currentPlaying.play();
     }
   });
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitEnterFullscreen) {
      elem.webkitEnterFullscreen();
      elem.enterFullscreen();
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

}
