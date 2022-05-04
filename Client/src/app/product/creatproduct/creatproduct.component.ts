import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-creatproduct',
  templateUrl: './creatproduct.component.html',
  styleUrls: ['./creatproduct.component.css'],
})
export class CreatProductComponent implements OnInit {

  selectedFile!: File ;
  public product! : Product[];

  public formProduct! : FormGroup;


  constructor(
    public productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: HttpClient
  ) {}




  ngOnInit(): void {
    this.formProduct = new FormGroup({
      Name: new FormControl(''),
      Details:new FormControl(''),
      Image: new FormControl(''),
      UpLoadImage :new FormControl(''),
      Cost : new FormControl(''),
    });

  }
  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];

  }

  onSubmit() {

    let formData = new FormData();
    formData.append('Name', this.formProduct.value.Name);
    formData.append('Details', this.formProduct.value.Details);
    formData.append('Image', this.formProduct.value.Image);
    formData.append('Cost', this.formProduct.value.Cost);
    formData.append('UpLoadImage', this.selectedFile);


    this.http.post('https://localhost:5002/api/product/creatproduct', formData)
    .subscribe(res => {

      alert('Uploaded!!');
    });

    this.formProduct.reset();
    this.router.navigateByUrl('/home/listproduct');

  }
}
