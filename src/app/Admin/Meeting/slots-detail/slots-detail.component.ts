import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slots-detail',
  templateUrl: './slots-detail.component.html',
  styleUrls: ['./slots-detail.component.css']
})
export class SlotsDetailComponent implements OnInit {

  searchDate!:Date;
  slotData:any[]=[];

  selectedSlot:any;

  constructor(
    private router:Router,
    private meetingService:MeetingService
  ) { }

  ngOnInit(): void {
    this.getAllSlots();
  }
  getAllSlots()
  {
      this.meetingService.getAllSlots().subscribe(response=>{
        this.slotData=response.slots;
      });
  }

  deleteSlot(slot:any){
    this.selectedSlot=slot;
  }

  confirmDeleteion()
  {
    debugger
      this.meetingService.deleteSlot(this.selectedSlot.slotId).subscribe(response=>{
        
          this.getAllSlots();
      });
  }

  searchByDate()
  {
    debugger
    if(this.searchDate!=null || this.searchDate!=undefined)
    {
      this.meetingService.searchSlotByDate(this.searchDate.toString()).subscribe(response=>{
        this.slotData=response.slots;
      })
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

  editSlot(slot:any)
  {
    this.router.navigateByUrl(`/admin/meeting/add-slot/${slot.slotId}`);
  }

}


