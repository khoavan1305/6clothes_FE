import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  NewP : any[] = [];
  HotP : any[] = [];

  constructor(private http: HttpClient ) 
  {
    this.getNewP();
    this.getHotP();
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
}
