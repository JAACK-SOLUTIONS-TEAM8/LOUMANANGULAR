import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-sign-up',
  templateUrl: './client-sign-up.component.html',
  styleUrls: ['./client-sign-up.component.css']
})
export class ClientSignUpComponent implements OnInit {

  clientId: number;
  clientData:any;
  addressDetailForm: FormGroup;
  profileDetailForm: FormGroup;
  clientDetailForm: FormGroup;
  userTypes: any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private clientService:ClientService,
    private router:Router
  ) {
    
  }

  ngOnInit(): void {
    this.getUserTypes();
    this.initilizeForm();

    this.clientDetailForm.controls["userTypeId"].patchValue(3)
    
  }

  

  initilizeForm() {
    this.profileDetailForm = this.formBuilder.group({
      userName: [null,Validators.required],
      password: [null,Validators.required],
      confirmPassword: [null,Validators.required]
    });

    this.clientDetailForm = this.formBuilder.group({
      initials: [null,Validators.required],
      surname: [null,Validators.required],
      userTypeId: [null,Validators.required],
      idNumber: [null,Validators.required],
      email: [null,Validators.required]
    });

    this.addressDetailForm = this.formBuilder.group({
      streetName: [null,Validators.required],
      streetNumber: [null,Validators.required],
      cityName: [null,Validators.required],
      cityCode: [null,Validators.required]
    });
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(types => {
      this.userTypes = types.userTypes;
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
      "userId":  Number(0),
      "clientId": Number(0),
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
          text: this.clientId==0?"Success!":"Success",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/login");
        })
        
      }
    });


  }

}
