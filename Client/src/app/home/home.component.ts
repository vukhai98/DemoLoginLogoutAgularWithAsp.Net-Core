import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  readonly BaseURI = 'https://localhost:5002/api';

  userDetails:any;


  constructor(private router:Router,private service:UserService,private http: HttpClient ) {

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
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }

}
