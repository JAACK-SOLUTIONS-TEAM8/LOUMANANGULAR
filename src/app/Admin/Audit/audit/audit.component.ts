import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  auditData:any[]=[]
  searchTerm:string=""
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getAuditDetail();
  }

  getAuditDetail()
    {
      this.userService.getAudit().subscribe(response=>{
        this.auditData=response.audits;
      })
    }
    searchByName()
    {
      if(this.searchTerm=="" || this.searchTerm==null)
      {
        Swal.fire({
          title: 'Warning!',
          text: "search bar field is empty",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        return
      }
      this.userService.searchAuditByUserName(this.searchTerm).subscribe(response=>{
  
        if(response.statusCode==200)
        this.auditData=response.audits;
        else
        {
          Swal.fire({
            title: 'Warning!',
            text: "search bar field is empty",
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        }
      });
    }
  

}
