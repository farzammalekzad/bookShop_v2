import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Storage} from '@capacitor/storage';

export const SEEN_KEY = 'tutorialSeen';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {

  constructor(private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    const hasSeen = await Storage.get({key: SEEN_KEY});
    if (!JSON.parse(hasSeen.value)) {
      return this.router.navigateByUrl('/tutorial');
    }
    return true;
  }

}
