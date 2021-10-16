import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.css']
})
export class FeatureDetailComponent implements OnInit {

  featuresData:any[]=[]
  selectedpRole:any;
  searchTerm:string;

  constructor(
    private adminService:AdminService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllFeatures();
  }

  getAllFeatures()
  {
    this.adminService.getAllFeatures().subscribe(response=>{
      console.log(response);
        this.featuresData=response.features;
    });
  }

  editFeature(feature:any)
  {
      this.router.navigateByUrl(`admin/add-feature/${feature.featureId}`)
  }

}
