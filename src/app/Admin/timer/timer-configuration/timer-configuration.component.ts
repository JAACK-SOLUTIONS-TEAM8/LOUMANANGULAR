import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import { TimerConfigService } from 'src/app/services/timer/timer-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timer-configuration',
  templateUrl: './timer-configuration.component.html',
  styleUrls: ['./timer-configuration.component.css']
})
export class TimerConfigurationComponent implements OnInit {
  configForm: FormGroup;
  enquiryTypeId:number;
  enquiryTypeData:any[]=[];
  enqueryType:any;

  constructor(
    private formBuilder: FormBuilder,
    private timerService:TimerConfigService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initilizeForm();
    this.getTimerConfig();
  }

  initilizeForm() {
    this.configForm = this.formBuilder.group({
      stopTime:[null,Validators.required],
      leftTime:[null,Validators.required]
    });
  }



  getTimerConfig() {
    this.timerService.getTimerConfig().subscribe(response => {
      this.enqueryType = response.config;
      console.log(response)
      this.configForm.controls["stopTime"].patchValue(response.config.stopTime);
      this.configForm.controls["leftTime"].patchValue(response.config.leftTime);

    });
  }



  updateTimerConfig() {
     if(this.configForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'provide all the required fields values!',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }
    let timerConfig =
    {
      "Id":0,
      "leftTime":Number(this.configForm.controls["leftTime"].value),
      "stopTime":Number(this.configForm.controls["stopTime"].value),
      "demand":true,
      "notify":0
    };
    debugger

    this.timerService.setTimerConfig(timerConfig).subscribe(response => {
      if (response.statusCode == 200) {

        
          Swal.fire({
            title: 'Success!',
            text: 'Timer Configuration updated successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/home");
          })
      }
    });


  }

}
