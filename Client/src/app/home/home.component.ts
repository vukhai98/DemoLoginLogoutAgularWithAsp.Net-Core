import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  readonly BaseURI = 'https://localhost:5002/api';

  userDetails:any;
  listProducts: any;


  constructor(private router:Router,private service:UserService,private http: HttpClient ,private productService: ProductService) {

   }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails = res;
      },
      err =>{
        console.log(err);
      }

    );
    this.productService.getListProduct().subscribe(
      res=>{
        this.listProducts = res;
      },
      err =>{
        console.log(err);
      }
    )
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }

}
