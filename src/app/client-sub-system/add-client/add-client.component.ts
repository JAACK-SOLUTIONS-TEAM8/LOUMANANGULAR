import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientId: number;
  clientData:any;
  addressDetailForm: FormGroup;
  profileDetailForm: FormGroup;
  clientDetailForm: FormGroup;
  userTypes: any[]=[];

  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  
  config:CountdownConfig={
    demand:false,
    leftTime:10*60,
    notify:0,
    stopTime:0
  }


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private clientService:ClientService,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.clientId=Number(params["id"]);
    });
  }

  ngOnInit(): void {
    this.getUserTypes();
    this.initilizeForm();
    if(this.clientId!=0)
    this.getClientById();

    setTimeout(()=>{
      this.countdown.begin();
    },1000)
  }

  

  initilizeForm() {
    this.profileDetailForm = this.formBuilder.group({
      userName: [null,[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      password: [null,[Validators.required,Validators.maxLength(8),Validators.minLength(6)]],
      confirmPassword: [null,Validators.required]
    });

    this.clientDetailForm = this.formBuilder.group({
      initials: [null,[Validators.required,Validators.maxLength(5),Validators.minLength(2)]],
      surname: [null,[Validators.required,Validators.maxLength(50)]],
      userTypeId: [null,Validators.required],
      idNumber: [null,[Validators.required,Validators.maxLength(13)]],
      email: [null,[Validators.required,Validators.maxLength(50)]]
    });

    this.addressDetailForm = this.formBuilder.group({
      streetName: [null,[Validators.required,Validators.maxLength(10)]],
      streetNumber: [null,[Validators.required,Validators.maxLength(3)]],
      cityName: [null,[Validators.required,Validators.maxLength(50)]],
      cityCode: [null,[Validators.required,Validators.maxLength(4)]]
    });
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(types => {
      this.userTypes = types.userTypes;
    });
  }

  getClientById() {
    this.clientService.getClientById( this.clientId).subscribe(response=>{
  

      this.clientData=response.client;
      console.log(response)

      this.profileDetailForm.controls["userName"].patchValue(response.client.userName);
      this.profileDetailForm.controls["password"].patchValue(response.client.password);
      this.profileDetailForm.controls["confirmPassword"].patchValue(response.client.password);

      this.clientDetailForm.controls["initials"].patchValue(response.client.initials);
      this.clientDetailForm.controls["surname"].patchValue(response.client.surname);
      this.clientDetailForm.controls["userTypeId"].patchValue(response.client.userTypeId);
      this.clientDetailForm.controls["idNumber"].patchValue(response.client.idNumber);
      this.clientDetailForm.controls["email"].patchValue(response.client.email);
      
      this.addressDetailForm.controls["streetName"].patchValue(response.client.surname);
      this.addressDetailForm.controls["streetNumber"].patchValue(response.client.userTypeId);
      this.addressDetailForm.controls["cityName"].patchValue(response.client.idNumber);
      this.addressDetailForm.controls["cityCode"].patchValue(response.client.email);


    });
  }

  submitAddClientForm() {
    debugger
    if (this.profileDetailForm.controls["password"].value != this.profileDetailForm.controls["confirmPassword"].value) {
      Swal.fire({
        title: 'Warning!',
        text: "password does not matched!",
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    else if(this.profileDetailForm.invalid || this.clientDetailForm.invalid || this.addressDetailForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all the required fields values!",
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    let clientDetail =
    {
      "userId":  Number(this.clientData!=null?this.clientData.userId:0),
      "clientId": Number(this.clientId ?? 0),
      "userName": String(this.profileDetailForm.controls["userName"].value),
      "password":  String(this.profileDetailForm.controls["password"].value),
      "userTypeId": Number(this.clientDetailForm.controls["userTypeId"].value ?? 0),
      "initials":  String(this.clientDetailForm.controls["initials"].value),
      "surname":  String(this.clientDetailForm.controls["surname"].value),
      "email":  String(this.clientDetailForm.controls["email"].value),
      "idNumber":  String(this.clientDetailForm.controls["idNumber"].value),
      "cellNumber": String(""),
      "addressId":Number(this.clientData!=null?this.clientData.addressId:0),
     "streetName": String(this.addressDetailForm.controls["streetName"].value),
     "streetNumber":Number(this.addressDetailForm.controls["streetNumber"].value),
     "cityName":String(this.addressDetailForm.controls["cityName"].value),
     "cityCode":String(this.addressDetailForm.controls["cityCode"].value),

    };
    debugger
    console.log(clientDetail)

    this.clientService.addClient(clientDetail).subscribe(response => {
      if (response.statusCode == 200) {

        Swal.fire({
          title: 'Success!',
          text: this.clientId==0?"client added successfully!":"client updated successfully!",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/client/list");
        })
        
      }
    });


  }

  handleEvent(event:any)
  {
    if(event.action=="done")
    {
      this.router.navigateByUrl("/client/list");
    }
    console.log(event);
  }
}
