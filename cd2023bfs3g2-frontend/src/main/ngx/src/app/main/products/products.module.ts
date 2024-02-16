import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OGalleryModule } from 'ontimize-web-ngx-gallery';
import { ProductsRoutingModule } from './products-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsNewRentalComponent } from './products-new-rental/products-new-rental.component';


@NgModule({
  declarations: [ProductsHomeComponent, ProductsDetailComponent, ProductsNewRentalComponent],
  imports: [
    OGalleryModule,
    CommonModule,
    OntimizeWebModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
