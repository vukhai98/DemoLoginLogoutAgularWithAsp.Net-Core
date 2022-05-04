import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { CreatProductComponent } from './product/creatproduct/creatproduct.component';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { ProductdetailsComponent } from './product/productdetails/productdetails.component';
import { ListimagesComponent } from './product/listimages/listimages.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user',component: UserComponent,
    children: [
      {path: 'registration',component:RegistrationComponent},
      {path: 'login',component:LoginComponent}
    ]
   },

  {path:'home',component:HomeComponent,canActivate:[AuthGuard],
children :  [
  {path: 'listproduct', component: ListproductComponent,},
  {path: 'creatproduct',component:CreatProductComponent},
  {path: 'productdetails/:id',component:ProductdetailsComponent},
  {path: 'listimages',component: ListimagesComponent},

  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
