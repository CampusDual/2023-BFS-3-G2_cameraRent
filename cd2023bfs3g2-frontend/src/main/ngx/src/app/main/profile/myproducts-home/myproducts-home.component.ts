import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-myproducts-home',
  templateUrl: './myproducts-home.component.html',
  styleUrls: ['./myproducts-home.component.css']
})
export class MyproductsHomeComponent implements OnInit {

@ViewChild('table',{static:true}) table:OTableComponent;
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.table.queryData({tuser_user_:this.auth.getSessionInfo().user});
  }
  ngOnChanges(){
    this.table.queryData({tuser_user_:this.auth.getSessionInfo().user});
  }
  

}
