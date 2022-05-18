import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl,Validators,FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employees';
import { EmployeeService } from '../shared/employees.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  newEmployeee : Employee[] =  [];

  constructor(
    public service:EmployeeService,
    private notificationService :NotificationService,
    public dialogRef : MatDialogRef<EmployeesComponent>,

    ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(
      (response) => {
        console.log(response);
    },
    error => {
      console.log(error);
    })
  }
  departments =[
    {id: 1 , value:'Developer'},
    {id: 2 , value:'Football Manager'},
    {id: 3 , value:'Player'},
    {id: 4 , value:'Coach'},
    {id:5,value: 'Technical Director'}
  ];


  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully!');
  }
  onSubmit(){
      if(!this.service.form.get('id')?.value)
      {
        this.service.insertEmployee().subscribe(
          (response : any) => {
            this.newEmployeee = response;
            console.log(this.newEmployeee);
            this.notificationService.success(':: Submitted successfully!');
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.onClose();
            window.location.reload()
        },
        error => {
          console.log(error);
        })
      }
     this.service.updateEmployee().subscribe(
      (response : any) => {
        this.newEmployeee = response;
        console.log(this.newEmployeee);
        this.notificationService.success(':: Submitted successfully!');
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.onClose();
        window.location.reload()
    },
    error => {
      console.log(error);
    })


  }
  onClose(){
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
  }


}
