import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting/meeting.service';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {

  slotsData:any[]=[];

  constructor(
    private meetingService:MeetingService
  ) { }

  ngOnInit(): void {
    this.getBookedSlots();
  }

  getBookedSlots()
  {
    // var userDetail=JSON.parse(localStorage.getItem("User"));
    // this.meetingService.getBookedSlotsByAdmin(Number(userDetail.userId)).subscribe(response=>{
  //   //   this.slotsData=response.slots;
  //   });
  }

}
