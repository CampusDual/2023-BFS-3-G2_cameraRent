import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {

  @ViewChild('form',{static:true}) form:OFormComponent;
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.form.queryData({user_:this.auth.getSessionInfo().user});
  }

}
