import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-listimages',
  templateUrl: './listimages.component.html',
  styleUrls: ['./listimages.component.css']
})
export class ListimagesComponent implements OnInit {

  public listImage : Product[] = [];
  constructor(public service:ProductService) { }

  ngOnInit(): void {
    this.service.getImages().subscribe(response => {
      this.listImage = response;
      console.log(response);
    })
  }
  }

