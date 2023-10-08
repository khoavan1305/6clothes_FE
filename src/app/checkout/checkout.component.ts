import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  ProductArray: any[] = [];
  currentProductID = '';
  items: ICart[] = [];
  itemss: any;

  constructor(private http: HttpClient, private router: Router) {
    4;
    this.itemss = sessionStorage.getItem('items');
    this.items = JSON.parse(this.itemss);
    // console.log(this.items);
  }
  ngOnInit(): void {}
  ten: string = '';
  ho: string = '';
  email: string = '';
  sdt: string = '';
  diachi: string = '';
  phuong: string = '';
  thanhpho: string = '';
  quan: string = '';
}
