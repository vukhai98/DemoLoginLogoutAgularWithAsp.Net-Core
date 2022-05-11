import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit,OnDestroy {

   id!: number;

   subscription? : Subscription;
   product! : Product;

  constructor(private router: Router,private activatedRout: ActivatedRoute,public productService:ProductService) { }

  ngOnInit(): void {
    this.subscription = this.activatedRout.params.subscribe(params =>
      {this.id = params['id'];
    });
    this.productService.getProductDetail(this.id).subscribe(
      (response)=>{
        this.product = response;
    },
    error => {
      console.log(error);
    })
    }

  GotoListProduct(){
    this.router.navigateByUrl('/home/listproduct')
  }

  ngOnDestroy(){
      this.subscription?.unsubscribe();
  }

}
