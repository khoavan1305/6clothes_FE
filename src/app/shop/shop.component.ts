import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';

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

  constructor(private http: HttpClient, private router: Router) {
    this.getAllProduct()
    this.getItems();
  }
  ngOnInit(): void {}
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
        // console.log(resultData);
        this.ProductArray = resultData;
        localStorage.setItem('productdt', resultData['data']['id']);
        this.router.navigate(['detail/' + id]);
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
  // var index = this.ICart.findIndex(ICart => ICart.id == resultData['data']['id'])
  // if(index>=0){
  //   this.ICart[index].
  // }
  items: ICart[] = [];

  addToCart(id: string) {
    this.http
      .get('http://127.0.0.1:8000/api/product/' + id)
      .subscribe((resultData: any) => {
        // console.log((resultData['data']['id']));
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
        }
      });
  }
  getItems() {
    console.log(this.items);
    return this.items;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
}