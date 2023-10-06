import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  {
  ProductArray: any[] = [];
  currentProductID = '';
  items: ICart[] = [];
  itemss:any;


  constructor(private http: HttpClient, private router: Router) {4
    this.itemss= sessionStorage.getItem('items');
    this.items= JSON.parse(this.itemss);
    // console.log(this.items);
  }
  ngOnInit(): void {}
  
}
