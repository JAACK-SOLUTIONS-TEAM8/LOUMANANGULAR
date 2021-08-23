import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import html2PDF from 'jspdf-html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teams-attendance-history',
  templateUrl: './teams-attendance-history.component.html',
  styleUrls: ['./teams-attendance-history.component.css']
})
export class TeamsAttendanceHistoryComponent implements OnInit {

  allTeamsData:any[]=[];
  selectedTeam: any={};
  teamAttendanceData:any[]=[]
  teamId!:number;
  reason:string="";
 teamData:any={};

  dateData:any

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private teamService:TeamService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getAllTeams();
  }
  today:any=this.datePipe.transform(new Date(),"yyyy-MM-dd");


  

  getAllTeams()
  {
    this.teamService.getAllTeams().subscribe(response=>{
      console.log(response)
        this.allTeamsData=response.teams;
    });
  }

  getAttendance(team:any)
  {
    this.teamData={}
    if(this.dateData==null || this.dateData=="")
    {
      Swal.fire({
        title: 'Info!',
        text: 'Please Select Date',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }

    this.teamService.getTeamAtendanceDetailForReport(Number(team.teamId),String(this.dateData)).subscribe(response=>{
      this.teamAttendanceData=response.attendance;
      if(this.teamAttendanceData==null || this.teamAttendanceData.length==0)
      {
        Swal.fire({
          title: 'Info!',
          text: 'No Attendance for This team on selected date',
          icon: 'info',
          confirmButtonText: 'Ok'
        })

        return
      }
      else
      {
        this.teamService.getTeamById(team.teamId).subscribe(response=>{
          this.teamData=response.team;
        });
      }

      console.log(this.teamAttendanceData)
    })

    
  }

}


