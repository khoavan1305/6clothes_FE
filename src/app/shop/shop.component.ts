import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';

import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  ProductArray: any[] = [];
  name: string = '';
  key: string = '';
  currentProductID = '';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tableSizes = [3, 6, 9, 12];

  constructor(
    private http: HttpClient,
    private router: Router,
    private pagination: PaginationService
  ) {
    this.getAllProduct();
    this.getItems();
  }
  ngOnInit(): void {
    this.postList();
  }
  postList(): void {
    this.pagination.getAllProduct().subscribe((response) => {
      this.POSTS = response;
      console.log(this.POSTS);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.postList();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }

  getAllProduct() {
    this.http
      .get('http://127.0.0.1:8000/api/product/')
      .subscribe((resultData: any) => {
        this.ProductArray = resultData;
      });
  }
  search() {
    this.http
      .get('http://127.0.0.1:8000/api/product?key=' + this.key)
      .subscribe((resultData: any) => {
        // console.log(resultData);
        this.ProductArray = resultData;
      });
  }
  productdetaill(id: string) {
    this.http
      .get('http://127.0.0.1:8000/api/product/' + id)
      .subscribe((resultData: any) => {
        this.ProductArray = resultData;
        localStorage.setItem('productdt', resultData['data']['id']);
        this.router.navigate(['detail']);
      });
  }
  nam: boolean = false;
  nu: boolean = false;
  searchnam() {
    if (this.nam === false) {
      this.http
        .get('http://127.0.0.1:8000/api/product?key=nam')
        .subscribe((resultData: any) => {
          // console.log(resultData);
          this.ProductArray = resultData;
        });
    } else {
      this.http
        .get('http://127.0.0.1:8000/api/product?key=' + this.key)
        .subscribe((resultData: any) => {
          // console.log(resultData);
          this.ProductArray = resultData;
        });
    }
  }
  searchP(featured: string) {
    if (featured == '0') {
      this.http
        .get('http://127.0.0.1:8000/api/product?featured=0')
        .subscribe((resultData: any) => {
          // console.log(resultData);
          this.ProductArray = resultData;
        });
    }
    if (featured == '1') {
      this.http
        .get('http://127.0.0.1:8000/api/product?featured=1')
        .subscribe((resultData: any) => {
          // console.log(resultData);
          this.ProductArray = resultData;
        });
    }
    if (featured == '2') {
      this.http
        .get('http://127.0.0.1:8000/api/product?featured=2')
        .subscribe((resultData: any) => {
          // console.log(resultData);
          this.ProductArray = resultData;
        });
    }
  }
  items: ICart[] = [];

  addToCart(id: string) {
    // this.getItems();
    // console.log(this.getItems());
    this.http
      .get('http://127.0.0.1:8000/api/product/' + id)
      .subscribe((resultData: any) => {
        var index = this.items.findIndex(
          (item) => item.id == resultData['data']['id']
        );
        if (index >= 0) {
          this.items[index].quantity++;
        } else {
          var c: ICart;
          c = {
            id: resultData['data']['id'],
            name: resultData['data']['name'],
            price: resultData['data']['price'],
            image: resultData['data']['image'],
            quantity: 1,
          };
          this.items.push(c);
          // console.log(  this.items);
        }
        // if(sessionStorage.getItem('items') !== null){
        //   sessionStorage.setItem('items',JSON.stringify( this.items ));
        // }else{

        sessionStorage.setItem('items', JSON.stringify(this.items));

        // }
      });
  }
  getItems() {
    return this.items;
  }
  clearCart() {
    sessionStorage.removeItem('items');
    // this.items = [];
    return this.items;
  }
}
