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

  public id?: number;

  public subscription? : Subscription;
  public product : any;

  constructor(private router: Router,private activatedRout: ActivatedRoute,public service:ProductService) { }

  ngOnInit(): void {
    this.subscription = this.activatedRout.params.subscribe(params =>
      {this.id = params['id'];
    });
    this.service.getProductDetail(this.id).subscribe(
      (response : any)=>{
        this.product = response;
    },
    error => {
      console.log(error);
    })
    }

  ngOnDestroy(){
      this.subscription?.unsubscribe();
  }

}
