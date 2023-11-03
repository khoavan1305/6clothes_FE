import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-buy',
  templateUrl: './success-buy.component.html',
  styleUrls: ['./success-buy.component.css'],
})
export class SuccessBuyComponent implements OnInit {
  urlApi: any = 'https://admin.6clothes.click/api/';
  orderID :any;
  userID :any;
  order:any;
  constructor(    
    private http: HttpClient,
    private router: Router,)
    {
      this.getUser();
    }
  ngOnInit(): void {
  }
  getUser(){
    this.http.get(this.urlApi + "user/" + localStorage.getItem('token')).subscribe((resultData :any)=>{   
      this.userID = resultData['data']['id']
      if(this.userID !== null){
        this.http.get(this.urlApi + "getOderUser/" + this.userID).subscribe((resultData :any)=>{   
        this.order = resultData['data'];
        });
      }else{
        this.router.navigate(['shop']);
      }
    });
  }
  getOrderID(index:any){
    localStorage.setItem("orderID",index);
  }
}
