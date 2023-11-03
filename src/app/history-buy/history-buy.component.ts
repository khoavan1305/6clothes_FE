import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history-buy',
  templateUrl: './history-buy.component.html',
  styleUrls: ['./history-buy.component.css']
})
export class HistoryBuyComponent  implements OnInit {
   urlApi: any = 'https://admin.6clothes.click/api/';
  orderArray: any[] = [];
  user_id:any;
  constructor(    
    private http: HttpClient,
    private router: Router,)
    {
    this.getuserID();
    }
  ngOnInit(): void {
  }
  getuserID(){
    this.http.get(this.urlApi + 'user/' + localStorage.getItem('token')).subscribe((resultData: any) => {
      this.user_id = resultData['data']["id"];
      this.orderList();
    });
  }
  orderList(){
    this.http.get(this.urlApi + 'order/' + this.user_id).subscribe((resultData: any) => {
      this.orderArray = resultData['data'];
    });
  }
  getOrderID(index:any){
    localStorage.setItem("orderID",index);
  }
}
