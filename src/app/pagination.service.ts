import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://127.0.0.1:8000/api/product';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<any> {
    return this.http.get(endpoint);
  }
}
