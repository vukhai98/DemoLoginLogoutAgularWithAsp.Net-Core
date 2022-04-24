import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  listProducts: any;
  constructor(public service:ProductService) { }


  ngOnInit(): void {
    this.service.getListProduct().subscribe(
      (response : any)=>{
        this.listProducts = response;
        console.log(this.listProducts);
    },
    error => {
      console.log("System error API")
    })
  }

}
