import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myproducts-new',
  templateUrl: './myproducts-new.component.html',
  styleUrls: ['./myproducts-new.component.css']
})
export class MyproductsNewComponent implements OnInit {

  public productTypeArray = [{
    typeText: 'SOUND'
  },{
    typeText: 'VIDEO'
  },{
    typeText: 'PHOTO'
  },];


  constructor() { }

  ngOnInit() {
  }

}
