import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsNewRentalComponent } from './products-new-rental/products-new-rental.component';


const routes: Routes = [{
  path : '',
  component: ProductsHomeComponent
 },
 {
  path : 'rent/:id_product',
  component: ProductsNewRentalComponent
},
{
  path : ':id_product',
  component: ProductsDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
