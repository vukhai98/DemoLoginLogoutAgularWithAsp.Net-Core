import { Injectable } from '@angular/core';
import { FormBuilder, Validators,FormControl,FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fb:FormBuilder,private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:5002/api';

  formProduct = this.fb.group({
    Name: ['',Validators.required],
    Details:['',[Validators.required,Validators.maxLength(200)]],
    Image: ['',Validators.required],
    Cost : ['',Validators.required],
    IsDeleted : ['']
  });

  creatProduct(){
    var body = {
      Name: this.formProduct.value.Name,
      Details: this.formProduct.value.Details,
      Image: this.formProduct.value.Image,
      Cost: this.formProduct.value.Cost
    };
    return this.http.post(this.BaseURI +'/product/creatproduct',body);
  }
}
