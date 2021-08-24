import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  auditData:any[]=[]
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

}
