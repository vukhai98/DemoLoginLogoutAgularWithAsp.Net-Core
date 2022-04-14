import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,private toastr :ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.service.register().subscribe(
      (res: any) =>{
        if(res.succeded){
          this.service.formModel.reset();
          this.toastr.success('New user created!','Registeration successfull.');
        }
        else{
          res.errors.array.forEach((element:any) => {
            switch(element.code){
              case 'DupplicateUserName':
                this.toastr.error('Usernam is already taken','Registration failed.');
                break;
              default:
                this.toastr.error(element.description,'Registration failed.');
              break;
            }
          });
        }
      },
      err =>{
        console.log(err);
      }
    );
  }

}
