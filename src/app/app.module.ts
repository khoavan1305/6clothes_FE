import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForGetPasswordComponent } from './for-get-password/for-get-password.component';
import { GetPassComponent } from './get-pass/get-pass.component';
import { IntroduceComponent } from './introduce/introduce.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    DetailComponent,
    SigninComponent,
    SignupComponent,
    UserdetailComponent,
    ForGetPasswordComponent,
    GetPassComponent,
    IntroduceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule, 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
