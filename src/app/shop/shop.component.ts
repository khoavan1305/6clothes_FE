import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';
import { ToastrService } from 'ngx-toastr';

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

  itemss: any;
  urlApi: any = 'http://127.0.0.1:8000/api/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private pagination: PaginationService
  ) {
    this.getAllProduct();
    this.productAddId();
    this.getItems();
    this.mouseover();
    this.itemss = localStorage.getItem('items');
    this.items = JSON.parse(this.itemss);
    this.token = localStorage.getItem('token');
    this.getOneUser();
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
    this.http.get(this.urlApi + 'product/').subscribe((resultData: any) => {
      this.ProductArray = resultData;
    });
  }
  search() {
    this.http
      .get(this.urlApi + 'product?key=' + this.key)
      .subscribe((resultData: any) => {
        this.POSTS = resultData;
      });
  }
  nam: boolean = false;
  nu: boolean = false;
  searchnam() {
    if (this.nam === false) {
      this.http
        .get(this.urlApi + 'product?key=nam')
        .subscribe((resultData: any) => {
          this.POSTS = resultData;
        });
    } else {
      this.http
        .get(this.urlApi + 'product?key=' + this.key)
        .subscribe((resultData: any) => {
          this.POSTS = resultData;
        });
    }
  }
  searchP(featured: string) {
    if (featured == '0') {
      this.http
        .get(this.urlApi + 'product?featured=0')
        .subscribe((resultData: any) => {
          this.POSTS = resultData;
        });
    }
    if (featured == '1') {
      this.http
        .get(this.urlApi + 'product?featured=1')
        .subscribe((resultData: any) => {
          this.POSTS = resultData;
        });
    }
    if (featured == '2') {
      this.http
        .get(this.urlApi + 'product?featured=2')
        .subscribe((resultData: any) => {
          this.POSTS = resultData;
        });
    }
  }
  productdetaill(id: string) {
    this.http
      .get(this.urlApi + 'product/' + id)
      .subscribe((resultData: any) => {
        this.ProductArray = resultData;
        localStorage.setItem('productdt', resultData['data']['id']);
        this.router.navigate(['detail']);
      });
  }
  productID: any;
  ProductArrayId: any;
  productAdd(id: string) {
    this.http
      .get(this.urlApi + 'product/' + id)
      .subscribe((resultData: any) => {
        this.ProductArrayId = resultData['data'];
        localStorage.setItem('productid', resultData['data']['id']);
        this.productID = localStorage.getItem('productid');
      });
  }
  productAddId() {
    this.http
      .get(this.urlApi + 'product/' + this.productID)
      .subscribe((resultData: any) => {
        this.ProductArrayId = resultData['data'];
      });
  }
  items: ICart[] = [];
  size: any;
  color: any;
  quantity: any = 1;
  addToCart(id: string) {
    if (this.size == null || this.color == null) {
      this.toastr.error('Vui lòng chọn kích thước & màu', '', {
        timeOut: 2000,
        progressBar: true,
      });
    } else {
      this.http
        .get(this.urlApi + 'product/' + id)
        .subscribe((resultData: any) => {
          var index = this.items.findIndex(
            (item) => item.id == resultData['data']['id']
          );
          if (index >= 0 && this.items[index].size == this.size) {
            this.items[index].quantity++;
            this.toastr.success('Thêm sản phẩm thành công', '', {
              timeOut: 1000,
              progressBar: true,
            });
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            var c: ICart;
            c = {
              id: resultData['data']['id'],
              name: resultData['data']['name'],
              price: resultData['data']['price'],
              image: resultData['data']['image'],
              size: this.size,
              color: this.color,
              quantity: this.quantity,
            };
            this.items.push(c);
            this.toastr.success('Thêm sản phẩm thành công', '', {
              timeOut: 1000,
              progressBar: true,
            });
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
          localStorage.setItem('items', JSON.stringify(this.items));
        });
    }
  }
  plusQuantity() {
    this.quantity++;
  }
  minusQuantity() {
    if (this.quantity <= 1) {
      this.quantity;
    } else {
      this.quantity--;
    }
  }
  getItems() {
    return this.items;
  }
  token: any;
  idUser: any;
  getOneUser() {
    this.http
      .get(this.urlApi + 'user/' + this.token)
      .subscribe((resultData: any) => {
        this.idUser = resultData['data']['id'];
      });
  }
  product: any;
  getOneProduct(index: any) {
    this.http
      .get(this.urlApi + 'product/' + index)
      .subscribe((resultData: any) => {
        this.product = resultData['data'];
        this.clickLike();
      });
  }
  clickLike() {
    if (localStorage.getItem('token') != null) {
      let bodyData = {
        name: this.product['name'],
        image: this.product['image'],
        price: this.product['price'],
        product_id: this.product['id'],
        user_id: this.idUser,
      };
      this.http
        .post(this.urlApi + 'product_like', bodyData)
        .subscribe((resultData: any) => {
          if (resultData['code'] === 409) {
            this.toastr.error('Sản phẩm đã có trong mục yêu thích!', '', {
              timeOut: 1000,
              progressBar: true,
            });
          }
          if (resultData['code'] === 200) {
            this.toastr.success('Thêm sản phẩm yêu thích thành công!', '', {
              timeOut: 1000,
              progressBar: true,
            });
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
        });
    } else {
      this.toastr.error('Bạn cần đăng nhập!', '', {
        timeOut: 2000,
        progressBar: true,
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
      this.router.navigate(['signin']);
    }
  }
  mouseover() {
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star) => {
      star.addEventListener('mouseover', () => {
        star.classList.remove('fa-regular');
        star.classList.add('fa-beat');
      });
      star.addEventListener('mouseout', () => {
        star.classList.remove('fa-beat');
        star.classList.add('fa-regular');
      });
    });
  }
}
