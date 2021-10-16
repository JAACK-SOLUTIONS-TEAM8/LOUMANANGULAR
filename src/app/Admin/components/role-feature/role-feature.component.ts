import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-feature',
  templateUrl: './role-feature.component.html',
  styleUrls: ['./role-feature.component.css']
})
export class RoleFeatureComponent implements OnInit {

  roleFeatures:any[]=[]
  features:any[]=[]

  rolesFeaturesData:any[]=[]

  roleId:number;
  reason:string="";
  teamData:any={};

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private adminService:AdminService

  ) {
    this.route.params.subscribe(params=>{
      this.roleId=params["id"];
    })
   }

  ngOnInit(): void {
    this.getAllFeatures();
  }
  today:Date=new Date();

  getRoleFeatures() {
    this.userService.getAllRoleReatures(Number(this.roleId)).subscribe(response=>{
        this.roleFeatures=response.features;
        this.rolesFeaturesData=[];
          this.features.forEach(feature => {
            console.log(feature)

            var roleFeature=this.roleFeatures.find(f=>f.featureId==feature.featureId);
            if(( roleFeature!= undefined) && (roleFeature != null))
            {
              this.rolesFeaturesData.push({featureId:feature.featureId,featureName:feature.featureName,isRoleFeature:roleFeature.isActive})
            }
            else
            {
              this.rolesFeaturesData.push({featureId:feature.featureId,featureName:feature.featureName,isRoleFeature:false})
            }

          });

    });
  }

  getAllFeatures() {
    this.adminService.getAllFeatures().subscribe(response=>{
        this.features=response.features;
        this.getRoleFeatures();
    });
  }
  


  

  addFeature(feature:any)
  {
    debugger
    this.userService.AddRoleFeature({roleId:Number(this.roleId),featureId:Number(feature.featureId),isActive:!feature.isRoleFeature}).subscribe(response=>{
      if(response.statusCode==200 && !feature.isRoleFeature==true )
      {
        Swal.fire({
          title: 'Success!',
          text: 'Feature Added Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.getRoleFeatures();
        });
      }
      else
      {
        Swal.fire({
          title: 'Success!',
          text: 'Feature Removed Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.getRoleFeatures();
        });
      }
    })
  }


  saveRoles()
  {
    
  }



}
