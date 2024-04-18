import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'trending-news',
    title: 'Trending News',
    loadComponent: () => import('./features/trending-news/trending-news.component').then(m => m.TrendingNewsComponent)
  },
  {
    path: '',
    redirectTo: 'trending-news',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
