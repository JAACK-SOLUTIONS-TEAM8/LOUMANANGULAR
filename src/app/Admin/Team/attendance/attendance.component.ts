import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  teamAttendanceData:any[]=[]
  teamId:number;
  reason:string="";
  teamData:any={};

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private teamService:TeamService
  ) {
    this.route.params.subscribe(params=>{
      this.teamId=params["id"];
    })
   }

  ngOnInit(): void {
    this.getTeamAttendanceData();
    this.getTeamById();
  }
  today:Date=new Date();

  getTeamById() {
    this.teamService.getTeamById(Number(this.teamId)).subscribe(response=>{
        this.teamData=response.team;
    });
  }

  getTeamAttendanceData()
  {
    this.teamService.getTeamAtendanceDetail(this.teamId).subscribe(response=>{
      
      this.teamAttendanceData=response.attendance;
      console.log(this.teamAttendanceData)
    })
  }


  markAbsent(attendance:any)
  {
    console.log(attendance)
    this.teamAttendanceData.forEach(att=>{
      if((att.attendanceId == attendance.attendanceId) && (att.employeeId == attendance.employeeId))
      {
        att.present=false;
        att.absent=true;
      }
    })
  }

  markPresent(attendance:any)
  {
    console.log(attendance)
    this.teamAttendanceData.forEach(att=>{
      if((att.attendanceId == attendance.attendanceId) && (att.employeeId == attendance.employeeId))
      {
        att.present=true;
        att.absent=false;
      }
    })
  }


  markAttendance()
  {
    debugger
      this.teamService.markTeamAttendance(this.teamAttendanceData).subscribe(response=>{
        console.log(response)
        if(response.statusCode ==200)
        {
          Swal.fire({
            title: 'Success!',
            text: 'Attendance Marked',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/team/manage/"+this.teamId)
          })  
        }
      })
  }
}
