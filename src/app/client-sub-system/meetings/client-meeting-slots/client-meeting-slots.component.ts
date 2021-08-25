import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ClientService } from 'src/app/services/client/client.service';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-meeting-slots',
  templateUrl: './client-meeting-slots.component.html',
  styleUrls: ['./client-meeting-slots.component.css']
})
export class ClientMeetingSlotsComponent implements OnInit {

  searchAdminSlotForm:FormGroup;
  adminData:any[]=[];

  slotData:any[]=[];

  constructor(
    private formBuilder:FormBuilder,
    private adminService:AdminService,
    private clientService:ClientService,
    private meetingService:MeetingService
  ) { }

  ngOnInit(): void {
    this.initilizeForm();
    this.getAllAdmins();
    this.getAllSlots()
    this.searchAdminSlotForm.controls["adminUserId"].patchValue("none")
  }

  initilizeForm()
  {
    this.searchAdminSlotForm=this.formBuilder.group({
      adminUserId:[null],
      searchDate:[null]
    });
  }

  getAllAdmins()
  {
    this.adminService.getAllAdmins().subscribe(response=>{
      this.adminData=response.admins
      console.log(this.adminData)
    })
  }

  searchSlots()
  {
    if(this.searchAdminSlotForm.controls["adminUserId"].value=="none")
    {
      Swal.fire({
        title: 'Error!',
        text: "Select an Admin",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    

    this.clientService.searchSlots(Number(this.searchAdminSlotForm.controls["adminUserId"].value),String(this.searchAdminSlotForm.controls["searchDate"].value)).subscribe(response=>{
        this.slotData=response.slots;
    })

  }

getAllSlots()
{
  this.meetingService.getAllSlots().subscribe(response=>{
    this.slotData=response.slots;
    console.log(this.slotData)
  });
}

bookSlot(slot:any)
{
  var clientData=JSON.parse(localStorage.getItem("User"));
  this.meetingService.bookSlot(slot.slotId,Number(clientData.userId)).subscribe(response=>{
    if(response.statusCode==200)
    {
      Swal.fire({
        title: 'Success!',
        text: "Slot is booked",
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.getAllSlots()
        this.searchAdminSlotForm.controls["adminUserId"].patchValue("none")
      })
      console.log("slot is booked");
    }
  })
}

}
