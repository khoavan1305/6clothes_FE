import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  ProductArray: any[] = [];
  NewP : any[] = [];
  HotP : any[] = [];

  constructor(private http: HttpClient, private router: Router ) 
  {
    this.getNewP();
    this.getHotP();
    this.getItems();
  }
  ngOnInit(): void {
  }
  getNewP()
  { 
    this.http.get("http://127.0.0.1:8000/api/NewP")
    .subscribe((resultData: any)=>
    {
        this.NewP = resultData;
    });
  }
  getHotP()
  { 
    this.http.get("http://127.0.0.1:8000/api/HotP")
    .subscribe((resultData: any)=>
    {
        this.HotP = resultData;
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
}
