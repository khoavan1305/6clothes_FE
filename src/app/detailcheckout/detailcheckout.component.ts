import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailcheckout',
  templateUrl: './detailcheckout.component.html',
  styleUrls: ['./detailcheckout.component.css']
})
export class DetailcheckoutComponent implements OnInit {
  urlApi: any = 'http://127.0.0.1:8000/api/';
  orderID :any;
  orderdetaillArray :any[]=[];
  orderArray :any[]=[];
  ship:any = 10;
  product :any[]=[];
  constructor(    
    private http: HttpClient,
    private router: Router,)
    {
    }
  ngOnInit(): void {
    this.orderID = localStorage.getItem("orderID");
    this.getOrderDetaill();
    this.getOrder();
  }
  getOrderDetaill(){
    this.http.get(this.urlApi + "order_detaill/" + this.orderID).subscribe((resultData :any)=>{
      this.orderdetaillArray = resultData['data']
    });
  }
  getOrder(){
    this.http.get(this.urlApi + "getOrderID/" + this.orderID).subscribe((resultData :any)=>{
      this.orderArray = resultData['data'];
      for (let i = 0; i < this.orderdetaillArray.length; i++) {
        const id = this.orderdetaillArray[i]['product_id'];
        this.http.get(this.urlApi + "product/" + id).subscribe((product :any)=>{
          this.product.push(product['data'])
        });
      }
    });
  }

}
