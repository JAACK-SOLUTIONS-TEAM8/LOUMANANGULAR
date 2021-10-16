import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-meeting',
  templateUrl: './client-meeting.component.html',
  styleUrls: ['./client-meeting.component.css']
})
export class ClientMeetingComponent implements OnInit {
  searchDate:string;

  slotsData:any[]=[];
  constructor(
    private meetingService:MeetingService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getBookedSlots();
  }

  getBookedSlots()
  {
    var userDetail=JSON.parse(localStorage.getItem("User"));
    this.meetingService.getBookedSlotsByClient(Number(userDetail.userId)).subscribe(response=>{
      this.slotsData=response.slots;
    });
  }

  cancelBooking(slot:any)
  {
    this.meetingService.cancelMeeting(Number(slot.slotId)).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: "slot booking is canceled",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/client/meeting/detail")
        })
        this.getBookedSlots();
      }
      else
      {
        Swal.fire({
          title: 'Info!',
          text: "can not cancel now",
          icon: 'info',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/client/meeting/detail")
        })
      }
    })
  }

  searchByDate()
  {
    debugger
    if(this.searchDate!=null || this.searchDate!=undefined)
    {
      var userDetail=JSON.parse(localStorage.getItem("User"));
      debugger
      this.meetingService.searchBookedSlotsByClient(Number(userDetail.userId),this.searchDate).subscribe(response=>{
        this.slotsData=response.slots;
      });
  
    }
    else
    {
      Swal.fire({
        title: 'Error!',
        text: 'No search result found!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
  }

}
