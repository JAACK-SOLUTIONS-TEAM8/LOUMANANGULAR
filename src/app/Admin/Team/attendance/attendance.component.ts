import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TeamService } from 'src/app/services/team/team.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

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


  exportToExcel()
  {


   let attendanceData=[]

   this.teamAttendanceData.forEach(att=>{
     attendanceData.push({"Date":att.date,"TeamId":att.teamId,"attendanceHistoryId":att.attendanceHistoryId,"employeeId":att.employeeId,"Initials":att.initials,"Surname":att.surname,"Present":att.present,"Absent":att.absent,"Reason":att.reason})
   });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.teamAttendanceData);
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

		XLSX.writeFile(wb, `${this.teamData.teamName}.xlsx`);
  }

  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
        
        this.teamService.markTeamAttendance(data).subscribe(response=>{
          console.log(response)
          if(response.statusCode ==200)
          {
            Swal.fire({
              title: 'Success!',
              text: 'Attendance Imported and Marked in the system',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(()=>{
              this.getTeamAttendanceData()
            })  
          }
        })

      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }
}
