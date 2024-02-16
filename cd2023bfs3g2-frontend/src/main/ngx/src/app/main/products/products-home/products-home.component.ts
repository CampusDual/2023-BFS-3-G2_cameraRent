import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ProductsDetailComponent } from '../products-detail/products-detail.component';
import { MatDialog } from '@angular/material';
import { Expression, FilterExpressionUtils, OComboComponent, OGridComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss']
})
export class ProductsHomeComponent implements OnInit {
  @ViewChild('grid', { static: true }) grid: OGridComponent;
  @ViewChild('bindingInput', { static: true }) bindingInput: OComboComponent;

  public productTypeArray = [
    {
      typeText: 'ALL'
    }, {
      typeText: 'SOUND'
    }, {
      typeText: 'VIDEO'
    }, {
      typeText: 'PHOTO'
    },
  ];

  searchTerm: string = '';

  constructor(protected dialog: MatDialog) { }

  ngOnInit() { }

  public openDetail(data: any): void {
    this.dialog.open(ProductsDetailComponent, {
      height: '70%',
      data: data,
      panelClass: 'custom-dialog-container'
    });
  }

  performSearch(): void {
    let selected = this.bindingInput.getValue();
    let filters: Array<Expression> = [];
    if (this.searchTerm != '') {
      let expr1 = FilterExpressionUtils.buildExpressionLike('product_name', this.searchTerm);
      let expr2 = FilterExpressionUtils.buildExpressionLike('plocation', this.searchTerm);
      filters.push(FilterExpressionUtils.buildComplexExpression(expr1, expr2, FilterExpressionUtils.OP_OR));
    }

    if (selected !== 'ALL' && selected !== "") {
      filters.push(FilterExpressionUtils.buildExpressionLike('product_type', selected));

    }
    if (filters.length) {
      let kv = { '@basic_expression': filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)) };
      this.grid.queryData(kv);
    } else this.grid.queryData();
  }
}
