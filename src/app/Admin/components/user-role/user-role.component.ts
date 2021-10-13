import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TeamService } from 'src/app/services/team/team.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  userRoles:any[]=[]
  roles:any[]=[]

  userRolesData:any[]=[]

  userId:number;
  reason:string="";
  teamData:any={};

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private adminService:AdminService

  ) {
    this.route.params.subscribe(params=>{
      this.userId=params["id"];
    })
   }

  ngOnInit(): void {
    this.getAllRoles();
  }
  today:Date=new Date();

  getUserRoles() {
    this.userService.getAllUserRoles(Number(this.userId)).subscribe(response=>{
        this.userRoles=response.roles;
        this.userRolesData=[];
          this.roles.forEach(role => {
            console.log(role)

            var userRole=this.userRoles.find(r=>r.roleId==role.roleId);
            if(( userRole!= undefined) && (userRole != null))
            {
              this.userRolesData.push({roleId:role.roleId,roleName:role.roleName,isUserRole:userRole.isActive})
            }
            else
            {
              this.userRolesData.push({roleId:role.roleId,roleName:role.roleName,isUserRole:false})
            }

          });

    });
  }

  getAllRoles() {
    this.adminService.getAllRoles().subscribe(response=>{
        this.roles=response.roles;
        this.getUserRoles();
    });
  }
  


  

  addRole(role:any)
  {
    this.userService.AddUserRoles({userId:Number(this.userId),roleId:Number(role.roleId),isActive:!role.isUserRole}).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'Role Added Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.getUserRoles();
        });
      }
    })
  }


  saveRoles()
  {
    
  }



  


}
