import { Injectable } from '@angular/core';
import { FormBuilder, Validators,FormControl,FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, of, tap } from 'rxjs';
import { Product } from '../product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public selectedFile!: File ;

  constructor(private fb:FormBuilder,private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:5002/api';

  formProduct = this.fb.group({

    Name: new FormControl(null),
    Details:new FormControl(null),
    Image: new FormControl(null),
    UpLoadImage :new FormControl(null),
    Cost : new FormControl(null),
  })

  creatProduct(){
    var body = {
      Name: this.formProduct.value.Name,
      Details: this.formProduct.value.Details,
      Image: this.formProduct.value.Image,
      UpLoadImage : this.formProduct.value.UpLoadImage,
      Cost: this.formProduct.value.Cost,
    };
    return this.http.post(this.BaseURI +'/product/creatproduct',body);
  }
  getListProduct() : Observable<Product[]>{
    return this.http.get<Product[]>(this.BaseURI + '/product/getallproducts');
  }
  getProductDetail(id: number) : Observable<Product>{
   return this.http.get<Product>(this.BaseURI + `/product/getproduct/${id}`);
  }

  getImages() : Observable<Product[]>{
    return this.http.get<Product[]>(this.BaseURI + '/product/getallimages');
  }

}
