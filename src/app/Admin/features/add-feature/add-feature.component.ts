import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css']
})
export class AddFeatureComponent implements OnInit {

  featureForm: FormGroup;


  featureId:number;
  feature:any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService:AdminService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
        this. featureId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    if(this. featureId!=0)
      this.getFeatureById();
  }

  getFeatureById() {
    this.adminService.getFeatureeById(Number(this.featureId)).subscribe(response=>{
      this.feature=response.role;
      console.log(response)
      this.featureForm.controls["featureName"].patchValue(this.feature.featureName);
    });
  }

  initilizeForm() {
    this.featureForm = this.formBuilder.group({
      featureName: [null,]
    });
  }

  submitAddFeatureForm() {
     if(this.featureForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all the required fields values!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    let featureDetail =
    {
      "featureId":Number(this.featureId??0),
      "featureName":String( this.featureForm.controls["featureName"].value)
    };
    debugger
    console.log(featureDetail)

    this.adminService.addFeature(featureDetail).subscribe(response => {
      if (response.statusCode == 200) {

        
          Swal.fire({
            title: 'Success!',
            text: this.featureId==0?"feature added successfully!":"feature updated successfully!",
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/features");
          })
        }
    });


  }


}
