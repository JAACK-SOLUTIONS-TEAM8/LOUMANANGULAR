import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  selectedAdmin: any;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  adminData: any[] = []
  searchTerm:string;
  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    debugger
    this.adminService.getAllAdmins().subscribe(data => {
      console.log(data);
      this.adminData = data.admins;
    });
  }

  editAdmin(admin: any) {
    this.router.navigateByUrl(`/admin/add/${admin.adminId}`);
  }

  adminDetail(admin: any) {

  }

  addAdmin() {
    this.router.navigateByUrl(`/admin/add/0`);

  }

  searchByName()
  {
    
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'Search field is empty!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
        return
    }
    this.adminService.searchAdminByName(this.searchTerm).subscribe(response=>{
      if(response.admin.length!=null&&response.admin.length!=0)
        this.adminData = response.admins;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: 'No search result found!',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
          return
      }
        console.log("No search result found!");
    });
  }

  confirmDeleteion() {
    console.log(this.selectedAdmin);
    this.adminService.deleteAdmin(this.selectedAdmin.userId).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'admin deleted successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.getAllAdmins();
        });
          return
        
      }
      console.log(response);
    });
  }

  deleteAdmin(admin: any)
  {
    this.selectedAdmin=admin;
  }
  
  viewAdminRole(admin:any)
  {
    this.router.navigateByUrl(`/admin/manage-roles/${admin.userId}`);
  }

}
