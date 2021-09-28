import { Injectable } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class TimerConfigService {

  constructor(
    private dataService:DataService
  ) { }

  getTimerConfig()
  {
    return this.dataService.genericCaller("get","Admin/GetTimerConfig","");
  }
 
  setTimerConfig(config:any)
  {
    debugger
    return this.dataService.genericCaller("post","Admin/SetTimerConfig",config);
  }
}
