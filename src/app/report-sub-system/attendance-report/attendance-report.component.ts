import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';
import html2PDF from 'jspdf-html2canvas';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  allTeamsData:any[]=[];
  selectedTeam: any={};
  teamAttendanceData:any[]=[]
  teamId:number;
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

  generateReport(team:any)
  {
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
          setTimeout(() => {
            var element=document.getElementById("teamAttendance");
            html2PDF(element, {
              jsPDF: {
                format: 'a4',
                    },
              imageType: 'image/jpeg',
               output: `${this.teamData.teamName}_Attendance_Report.pdf`
            });
  
          }, 1000);
        });
      }

      console.log(this.teamAttendanceData)
    })

    
  }

}
