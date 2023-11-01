import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForGetPasswordComponent } from './for-get-password/for-get-password.component';
import { GetPassComponent } from './get-pass/get-pass.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { HistoryBuyComponent } from './history-buy/history-buy.component';
import { SuccessBuyComponent } from './success-buy/success-buy.component';
import { DetailcheckoutComponent } from './detailcheckout/detailcheckout.component';
import { HashLocationStrategy,LocationStrategy } from "@angular/common";

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
    IntroduceComponent,
    HistoryBuyComponent,
    SuccessBuyComponent,
    DetailcheckoutComponent,
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
    NgxPaginationModule,
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}