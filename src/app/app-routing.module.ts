import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TutorialGuard} from './guard/tutorial.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule),
    canActivate: [TutorialGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'introduction',
    loadChildren: () => import('./pages/introduction/introduction.module').then( m => m.IntroductionPageModule)
  },
  {
    path: 'downloaded-book',
    loadChildren: () => import('./pages/downloaded-book/downloaded-book.module').then( m => m.DownloadedBookPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'search/details',
    loadChildren: () => import('./pages/search-result/search-result.module').then( m => m.SearchResultPageModule)
  },
  {
    path: 'detail-book',
    loadChildren: () => import('./pages/detail-book/detail-book.module').then( m => m.DetailBookPageModule)
  },
  {
    path: 'library-book',
    loadChildren: () => import('./pages/library-book/library-book.module').then( m => m.LibraryBookPageModule)
  },
  {
    path: 'tutorial2',
    loadChildren: () => import('./pages/tutorial2/tutorial2.module').then( m => m.Tutorial2PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
