import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'search/:searchTerm', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'tag/:tag', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'food/:id', component: FoodPageComponent, canActivate:[AuthGuard] },
  { path: 'cart-page', component: CartPageComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path:'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]},
  { path:'payment', component: PaymentPageComponent, canActivate:[AuthGuard]},
  { path:'track/:orderId', component: OrderTrackPageComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'not-found-page' },
  { path: 'not-found-page', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
