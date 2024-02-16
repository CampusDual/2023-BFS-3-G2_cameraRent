import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-myproducts-details-image',
  templateUrl: './myproducts-details-image.component.html',
  styleUrls: ['./myproducts-details-image.component.css']
})
export class MyproductsDetailsImageComponent implements OnInit {
public data;
  constructor(
  ) { }

  ngOnInit() {
    console.log(this.data);
  }
  public loadData(ev){
    this.data = ev.data;
  }

}
