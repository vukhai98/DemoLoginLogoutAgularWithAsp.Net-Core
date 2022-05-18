import { Injectable } from '@angular/core';
import { FormGroup ,FormControl,ReactiveFormsModule, FormBuilder,Validators} from '@angular/forms';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, of, tap } from 'rxjs';
import { Employee } from '../employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly BaseURI = 'https://localhost:5002';
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application'
  //   })
  // }

  constructor(public http: HttpClient) { }

  form : FormGroup = new FormGroup({
    id : new FormControl(''),
    fullName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    mobile: new FormControl('',[Validators.required,Validators.minLength(8)]),
    city: new FormControl(''),
    gender : new FormControl('1'),
    department: new FormControl(0),
    hireDate : new FormControl(''),
    isPermanent: new FormControl(false)
  });
  initializeFormGroup(){
    this.form.setValue({
      id : '',
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender :'1',
      department: 0,
      hireDate :'',
      isPermanent:false
    });
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.BaseURI + '/api/employees/getallemployees');
  }

  insertEmployee(){
    var newForm = ({
      fullName: this.form.value.fullName,
      email : this.form.value.email,
      mobile : this.form.value.mobile,
      city: this.form.value.city,
      gender : this.form.value.gender,
      department: this.form.value.department,
      hireDate: this.form.value.hireDate,
      isPermanent: this.form.value.isPermanent
    });
    return this.http.post(this.BaseURI +'/api/employees/createmployee' , newForm);
  }

  updateEmployee(){
    var updateForm = ({
      id : this.form.value.id,
      fullName: this.form.value.fullName,
      email : this.form.value.email,
      mobile : this.form.value.mobile,
      city: this.form.value.city,
      gender : this.form.value.gender,
      department: this.form.value.department,
      hireDate: this.form.value.hireDate,
      isPermanent: this.form.value.isPermanent
    });
    return this.http.put(this.BaseURI + '/api/employees/updateemployee', updateForm);
  }

  deleteEmployee(id:number): Observable<Employee[]>{
    return this.http.delete<Employee[]>(this.BaseURI +`/api/employees/deleteemployee/${id}`);
  }

  populateForm(employee: Employee){
    this.form.setValue(employee);
  }
}
