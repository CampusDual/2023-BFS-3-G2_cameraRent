import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { MyproductsHomeComponent } from './myproducts-home/myproducts-home.component';
import { MyproductsDetailComponent } from './myproducts-detail/myproducts-detail.component';
import { MyproductsNewComponent } from './myproducts-new/myproducts-new.component';
import { MyRentalsHomeComponent } from './my-rentals-home/my-rentals-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyRentalsConflictDetailsComponent } from './my-rentals-conflict-details/my-rentals-conflict-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { MyproductsDetailsImageComponent } from './myproducts-details-image/myproducts-details-image.component';
import { ImageDetailZoomComponent } from './myproducts-detail/image-detail-zoom/image-detail-zoom.component';



@NgModule({
  declarations: [ProfileHomeComponent,StatisticsComponent,MyproductsHomeComponent, MyproductsDetailComponent, MyproductsNewComponent, MyRentalsHomeComponent, MyRentalsConflictDetailsComponent, MyproductsDetailsImageComponent, ImageDetailZoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    ProfileRoutingModule,
    OChartModule
  ]
})
export class ProfileModule { }
