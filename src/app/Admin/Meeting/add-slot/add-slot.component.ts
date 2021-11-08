import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  addSlotForm: FormGroup;
  slotId:number;
  slot:any;

  todayDate:string=this.datePipe.transform(new Date(),"yyyy-MM-dd");

  isSelectedStartTime:boolean=false;
  startTimeSelected:string[]=[];
  endTimeSelected:string[]=[];

  invalidStartTime:boolean=false;
  invalidEndTime:boolean=false;
  date:Date=new Date()

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private meetingService:MeetingService,
    private router:Router,
    private datePipe:DatePipe
  ) {
    this.route.params.subscribe(params=>{
      this.slotId=params["id"];
    });
  }

  ngOnInit(): void {
    this.initilizeForms();
    if(this.slotId!=0)
    this.getSlotById();
  }

  getSlotById() {
    this.meetingService.getSlotById(this.slotId).subscribe(response=>{
      this.slot=response.slot;
      this.addSlotForm.controls["date"].patchValue(this.datePipe.transform(this.slot.date,"yyyy-MM-dd"));
      this.addSlotForm.controls["startTime"].patchValue(this.datePipe.transform(this.slot.startTime,"HH:mm:ss"));
      this.addSlotForm.controls["endTime"].patchValue(this.datePipe.transform(this.slot.endTime,"HH:mm:ss"));  
    });

  }

  initilizeForms() {
    this.addSlotForm = this.formBuilder.group({
      date: [null,Validators.required],
      startTime: [null,[Validators.required]],
      endTime: [null,Validators.required]
    });
  }


  addSlot() {

    let data={...this.addSlotForm.value}

    debugger
    if(this.addSlotForm.invalid)
    {
      Swal.fire({
        title: 'Error!',
        text: 'Provide all fields!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }


    let slotDetail={
        "slotId":Number(this.slotId??0),
        "date": new Date(this.addSlotForm.controls["date"].value),
        "startTime": String(this.addSlotForm.controls["startTime"].value),
        "endTime": String(this.addSlotForm.controls["endTime"].value),
        "adminUserId":Number(JSON.parse(localStorage.getItem("User")).userId)
    };

    this.meetingService.addSlot(slotDetail).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: this.slotId==0?'Slot added successfully!!':'slot Updated successfully!!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/admin/meeting/slot-detail");
        })
      }
      else if(response.statusCode==404)
      {
        Swal.fire({
          title: 'Warning!',
          text: 'Slot time overlapping with existing slot',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }
      else 
      {
        Swal.fire({
          title: 'Error!',
          text: 'slot added failed!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        return;
      }
    });
  }


  startTimeChanges(timeEvent:any)
  {
     this.startTimeSelected=timeEvent.target.value.split(':');


    console.log(this.startTimeSelected);

    if((Number(this.startTimeSelected[0]) < this.date.getHours())&& (new Date(this.addSlotForm.controls['date'].value).getDate()===this.date.getDate()))
    {
      this.invalidStartTime=true;
      console.log("start time already passed!");
    }
    else
    {
      this.isSelectedStartTime=true;
      this.invalidStartTime=false
    }
  }


  endTimeChanges(timeEvent:any)
  {
    this.endTimeSelected=timeEvent.target.value.split(':');

    console.log(this.endTimeSelected);

  if(Number(this.endTimeSelected[0]) <= Number(this.startTimeSelected[0]))
  {
    this.invalidEndTime=true;
    console.log("end time should be more than the starting time");
  }
  else
  {
    this.invalidEndTime=false;
  }
}

}

