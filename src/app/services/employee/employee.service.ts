import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 
  constructor(
    private dataService:DataService
  ) { }

  getAllEmployees() {
    debugger
    return this.dataService.genericCaller("get", "Employee/All", "");
  }

  addEmployee(employeeDate: any) {
    debugger
    return this.dataService.genericCaller("post", "Employee/Upsert", employeeDate);
  }

  getEmployeeById(employeeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Employee/${employeeId}`, "");
  }

  getEmployeeByUserId(userId: number) {
    debugger
    return this.dataService.genericCaller("get", `Employee/User/${userId}`, "");
  }

  deleteEmployee(employeeUserId: number) {
    debugger
    return this.dataService.genericCaller("get", `Employee/Delete/${employeeUserId}`, "");
  }

  searchEmployeeByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Employee/Search?name="+searchTerm,"");
  }

  employeeAttendanceHistory(dateInfo:string)
  {
    return this.dataService.genericCaller("get","Employee/EmployeeMonthlyAttendanceHistory?dateInfo="+dateInfo,"");
  }

  sixMonthRegistrationHistory()
  {
    return this.dataService.genericCaller("get","Employee/EmployeeSixMonthRegistrationHistory","");
  }

  updateEmployee(employeeDate: any) {
    debugger
    return this.dataService.genericCaller("post", "Employee/Update", employeeDate);
  }
}
