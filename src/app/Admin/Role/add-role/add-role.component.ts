import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  roleForm: FormGroup;


  roleId:number;
  productSizeData:any[]=[];
  role:any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService:AdminService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
        this. roleId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    if(this. roleId!=0)
      this.getRoleById();
  }

  getRoleById() {
    this.adminService.getRoleById(Number(this.roleId)).subscribe(response=>{
      this.role=response.role;
      console.log(response)
      this.roleForm.controls["roleName"].patchValue(this.role.roleName);
    });
  }

  initilizeForm() {
    this.roleForm = this.formBuilder.group({
      roleName: [null,]
    });
  }

  submitAddRoleForm() {
     if(this.roleForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all the required fields values!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    let roleDetail =
    {
      "roleId":Number(this.roleId??0),
      "roleName":String( this.roleForm.controls["roleName"].value)
    };
    debugger
    console.log(roleDetail)

    this.adminService.addRole(roleDetail).subscribe(response => {
      if (response.statusCode == 200) {

        
          Swal.fire({
            title: 'Success!',
            text: this.roleId==0?"Role added successfully!":"Role updated successfully!",
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/roles");
          })
        }
    });


  }

}
