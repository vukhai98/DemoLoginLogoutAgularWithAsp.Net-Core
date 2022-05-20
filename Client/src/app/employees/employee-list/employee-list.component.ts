import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/employees';
import { EmployeeService } from 'src/app/shared/employees.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { EmployeesComponent } from '../employees.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  subscription? : Subscription;
  id!: number;
  employee!: Employee;
  searchKey!: string;
  listData! : MatTableDataSource<any>;
  displayColumns = ['fullName','email', 'mobile','city', 'department','actions']
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(
    public service:EmployeeService,
    private dialog : MatDialog,
    private notificationService :NotificationService,
    private activatedRout: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(
      res => {

        this.listData = new MatTableDataSource(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      },
      error =>{
        console.log(error);
      }
    )
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    this.dialog.open(EmployeesComponent,dialogConfig);
  }
  onEdit(row:Employee){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    this.dialog.open(EmployeesComponent,dialogConfig);
  }
  onDelete(id:number){

    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteEmployee(id);
      this.notificationService.warn('! Deleted successfully');
    }

  }
}
