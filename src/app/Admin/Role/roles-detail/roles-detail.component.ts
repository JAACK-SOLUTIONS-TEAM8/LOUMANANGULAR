import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-roles-detail',
  templateUrl: './roles-detail.component.html',
  styleUrls: ['./roles-detail.component.css']
})
export class RolesDetailComponent implements OnInit {

  rolesData:any[]=[]
  selectedpRole:any;
  searchTerm:string;

  constructor(
    private adminService:AdminService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles()
  {
    this.adminService.getAllRoles().subscribe(response=>{
      console.log(response);
        this.rolesData=response.roles;
    });
  }

  editRole(role:any)
  {
      this.router.navigateByUrl(`admin/add-role/${role.roleId}`)
  }

}
