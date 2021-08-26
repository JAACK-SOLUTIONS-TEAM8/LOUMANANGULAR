import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { TeamService } from 'src/app/services/team/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  addTeamForm: FormGroup;;
  teamId: number
  locationData:any[]=[];
  daysData:any[]=[]
  team:any;

  teamDays:any[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private teamService:TeamService,
    private locationService:LocationService,
    private router:Router,
    private datePipe:DatePipe
  ) {
    this.route.params.subscribe(params=>{
      this.teamId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    this.getLocations();
    if(this.teamId!=0)
    this.getTeamById();

    this.getWeekDays();
    this.addTeamForm.controls["day"].patchValue("none")
  }

  getLocations()
  {
    this.locationService.getAllLocations().subscribe(response=>{
      this.locationData=response.locations
    });
  }

  getTeamById() {
    this.teamService.getTeamById(this.teamId).subscribe(response=>{
        this.team=response.team;
        this.teamDays=response.team.teamDays;
        this.teamDays.forEach(day=>{
          let index=this.daysData.findIndex(d=>d.dayId==day.dayId);
          if(index!=-1)
          {
            this.daysData.splice(index,1);
          }
        });

        console.log(this.team)

        this.addTeamForm.controls["teamName"].patchValue(this.team.teamName);
        this.addTeamForm.controls["teamDescription"].patchValue(this.team.teamDescription);
        this.addTeamForm.controls["locationId"].patchValue(this.team.locationId);
        this.addTeamForm.controls["maxEmployee"].patchValue(this.team.maxEmployees);
        this.addTeamForm.controls["startTime"].patchValue(this.datePipe.transform(this.team.startTime,"HH:mm:ss"));
        this.addTeamForm.controls["endTime"].patchValue(this.datePipe.transform(this.team.endTime,"HH:mm:ss"));
    
    });
  }

  initilizeForm() {
    this.addTeamForm = this.formBuilder.group({
      teamName: [null,Validators.required],
      teamDescription: [null,Validators.required],
      locationId: [null,Validators.required],
      maxEmployee: [null,Validators.required],
      startTime: [null,Validators.required],
      endTime: [null,Validators.required],
      day:[null,Validators.required]
    });
  }

  getWeekDays()
  {
    this.teamService.getWeekDays().subscribe(response=>{
      this.daysData=response.days;
      console.log(this.daysData)

    })
  }

  submitAddTeamForm() {

    if(this.addTeamForm.invalid)
    {
      Swal.fire({
        title: 'Info!',
        text: 'Provide all fields!',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    else if(this.teamDays.length==0)
    {
      Swal.fire({
        title: 'Info!',
        text: 'Select Working days for Team!',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }

    let teamDetail={
      "teamId":Number(this.teamId??0),
       "teamName":String(this.addTeamForm.controls["teamName"].value),
       "locationId":String(this.addTeamForm.controls["locationId"].value),
      "teamDescription": String(this.addTeamForm.controls["teamDescription"].value),
       "maxEmployees": Number(this.addTeamForm.controls["maxEmployee"].value),
        "startTime":String(this.addTeamForm.controls["startTime"].value),
        "endTime":String(this.addTeamForm.controls["endTime"].value),
        "locationArea":String(""),
        "teamDays":this.teamDays
    };

    console.log(teamDetail)

    this.teamService.addTeam(teamDetail).subscribe(response=>{
      if(response.statusCode==200)
      {
        this.addTeamForm.controls["day"].patchValue("none")

        Swal.fire({
          title: 'Success!',
          text: this.teamId!=0?'Team updated successfully!':'Team Added Successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/admin/team/detail")
        })
      }
    });

  }

  selectDay()
  {
    let selectedDay=this.addTeamForm.controls["day"].value;

    console.log(selectedDay)
    console.log()
    this.teamDays.push(selectedDay);
    this.daysData.splice(this.daysData.indexOf(selectedDay),1)   
    this.addTeamForm.controls["day"].patchValue("none")
 
  }

  removeDay(day:any)
  {
    this.teamDays.splice(this.teamDays.indexOf(day),1);
    console.log(day)
    this.daysData.push(day);
  }
}
