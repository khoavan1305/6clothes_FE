import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ForGetPasswordComponent } from './for-get-password/for-get-password.component';
import { GetPassComponent } from './get-pass/get-pass.component';
import { IntroduceComponent } from './introduce/introduce.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userdetail', component: UserdetailComponent },
  { path: 'forgetpass', component: ForGetPasswordComponent },
  { path: 'getpass', component: GetPassComponent },
  { path: 'introduce', component: IntroduceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
