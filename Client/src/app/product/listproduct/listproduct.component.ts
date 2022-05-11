import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/shared/product.service';
import { CreatProductComponent } from '../creatproduct/creatproduct.component';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  listProducts: Product[] =[];
  constructor(public service:ProductService, public dialog : MatDialog) { }


  ngOnInit(): void {
    this.service.getListProduct().subscribe(
      (response : any) => {
        this.listProducts = response;
        console.log(this.listProducts);
    },
    error => {
      console.log(error);
    })
  }
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(ProductdetailsComponent,dialogConfig)
  }

}
