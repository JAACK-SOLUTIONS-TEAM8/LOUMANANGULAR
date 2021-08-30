import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {
  searchDate:string;
  slotsData:any[]=[];

  constructor(
    private meetingService:MeetingService
  ) { }

  ngOnInit(): void {
    this.getBookedSlots();
  }

  getBookedSlots()
  {
    var userDetail=JSON.parse(localStorage.getItem("User"));
     this.meetingService.getBookedSlotsByAdmin(Number(userDetail.userId)).subscribe(response=>{
   this.slotsData=response.slots;
     });
  }


  searchByDate()
  {
    debugger
    if(this.searchDate!=null || this.searchDate!=undefined)
    {
      var userDetail=JSON.parse(localStorage.getItem("User"));
      debugger
      this.meetingService.searchBookedSlotsByAdmin(Number(userDetail.userId),this.searchDate).subscribe(response=>{
        this.slotsData=response.slots;
      });
  
    }
    else
    {
      Swal.fire({
        title: 'Error!',
        text: 'No search result found!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

}
