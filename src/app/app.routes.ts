import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then((r) => r.SHOP_ROUTES),
  },
  {
    path: 'shop/:id',
    loadChildren: () =>
      import('./shop/single-product/single-product.routes').then(
        (r) => r.SINGLE_PRODUCT_ROUTES
      ),
  },
];
