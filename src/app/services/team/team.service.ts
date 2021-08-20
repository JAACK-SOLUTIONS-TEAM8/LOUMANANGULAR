import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private dataService:DataService
  ) { }

  getAllTeams() {
    debugger
    return this.dataService.genericCaller("get", "Team/All", "");
  }

  addTeam(teamData: any) {
    debugger
    return this.dataService.genericCaller("post", "Team/Add", teamData);
  }

  getTeamById(teamId: number) {
    debugger
    return this.dataService.genericCaller("get", `Team/${teamId}`, "");
  }

  deleteTeam(teamId: number) {
    debugger
    return this.dataService.genericCaller("get", `Team/Delete/${teamId}`, "");
  }

  searchTeamByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Team/Search?team="+searchTerm,"");
  }

  getTeamEmployee(teamId:number)
  {
    return this.dataService.genericCaller("get","Team/Employee/"+teamId,"");
  }

  addEmployeeToTeam(employeeData:any)
  {
    return this.dataService.genericCaller("post","Team/Employee/Add",employeeData);
  }
  RemoveEmployeeFromTeam(teamId:number,employeeId:number)
  {
    return this.dataService.genericCaller("get","Team/Employee/Remove?teamId="+teamId+"&employeeId="+employeeId,"");
  }

  getWeekDays()
  {
    return this.dataService.genericCaller("get","Team/WeekDays","");
  }
  

  getTeamAtendanceDetail(teamId:number)
  {
    return this.dataService.genericCaller("get","Team/AttendanceData/"+teamId,"");
  }

  getTeamAtendanceDetailForReport(teamId:number,date:string)
  {
    return this.dataService.genericCaller("get","Team/AttendanceReportData?teamId="+teamId+"&date="+date,"");

  }


  markTeamAttendance(attendanceDetail:any)
  {
    return this.dataService.genericCaller("post","Team/MarkAttendance",attendanceDetail);
  }


}
