
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creatproduct',
  templateUrl: './creatproduct.component.html',
  styleUrls: ['./creatproduct.component.css']
})
export class CreatProductComponent implements OnInit {

  // public fileToUpload = <File>files[0];

  // const formData = new FormData();
  // formData.append('file',fileToUpload,fileToUpload.name)

  constructor(public productService: ProductService,private toastr : ToastrService,private router :Router) { }



  ngOnInit(): void {
  }
  onSubmit(){
    this.productService.creatProduct().subscribe(
      (res: any) =>{
        if(res.succeded){
          this.productService.formProduct.reset();

          this.toastr.success('New product created!','Created product successfull.');

        }
        else{
          res.err('Please, You watched formProduct !');
        }
      },
      err=>{
        console.log(err);
      })
  }

}


