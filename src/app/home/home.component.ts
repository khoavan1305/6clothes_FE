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
  urlApi: any = 'https://admin.6clothes.click/api/';
  ProductArray: any[] = [];
  NewP : any[] = [];
  HotP : any[] = [];
  itemss:any;


  constructor(private http: HttpClient, private router: Router ) 
  {
    this.getNewP();
    this.getHotP();
    this.getItems();
  }
  ngOnInit(): void {
    this.itemss= localStorage.getItem('items');
    this.items= JSON.parse(this.itemss);
  }
  getNewP()
  { 
    this.http.get(this.urlApi + "NewP")
    .subscribe((resultData: any)=>
    {
        this.NewP = resultData;
    });
  }
  getHotP()
  { 
    this.http.get(this.urlApi + "HotP")
    .subscribe((resultData: any)=>
    {
        this.HotP = resultData;
    });
  }
  productdetaill(id: string) {
    this.http
      .get(this.urlApi + "product/" + id)
      .subscribe((resultData: any) => {
        this.ProductArray = resultData;
        localStorage.setItem('productdt', resultData['data']['id']);
        this.router.navigate(['detail']);
      });
  }
  items: ICart[] = [];
  addToCart(id: string) {
    this.http
      .get(this.urlApi + "product/" + id)
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
            size: resultData['data']['name'],
            color: resultData['data']['name'],
            quantity: 1,
          };
          this.items.push(c);
        }
        localStorage.setItem('items', JSON.stringify(this.items));
      });
  }
  getItems() {
    return this.items;
  }
}
