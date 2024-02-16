import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Expression, FilterExpressionUtils, OFormComponent, OTableComponent, OTextInputComponent, OTranslateService, OntimizeService } from 'ontimize-web-ngx';
import { ChartService, MultiBarChartConfiguration, OChartComponent, } from 'ontimize-web-ngx-charts';
import { D3LocaleService } from '../../../shared/d3-locale/d3-locale.service';
import { Router } from '@angular/router';

declare var d3: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent {
  public chartParams: MultiBarChartConfiguration;
  public selected: {};
  @ViewChild('pie', { static: true }) pie: OChartComponent;
  @ViewChild('formFilter', { static: false }) private formFilter: OFormComponent;
  @ViewChild('multiBar', { static: false }) protected multiBar: OChartComponent;
  @ViewChild("totalOutput", { static: false }) totalOutput: OTextInputComponent;
  public data3;
  public pieTotal = 0;
  public pieMonth;


  constructor(

    protected productRequestService: OntimizeService,
    private d3LocaleService: D3LocaleService,
    private translateService: OTranslateService,
    private router: Router

  ) {
    this.translateService.onLanguageChanged.subscribe(() => this.reloadComponent());
    this.pieMonth = { firstNum: "", first: "", separator: "to", secondNum: "", second: "" }

  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  ngOnInit() {
  }
  queryAll() {
    this.queryMultiBar();
    this.queryPie()
  }
  queryMultiBar() {
    let dates = this.formFilter.getFieldValue("date")
    let kv = {};
    if (dates) {
      const startDate = dates.startDate.format('YYYY-MM-DD')
      const endDate = dates.endDate.format('YYYY-MM-DD')
      let filters: Array<Expression> = [];
      filters.push(FilterExpressionUtils.buildExpressionLessEqual("start_month", endDate));
      filters.push(FilterExpressionUtils.buildExpressionMoreEqual("start_month", startDate));
      kv = {
        '@basic_expression': filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND))
      }
    }
    this.productRequestService.query(kv, ['start_month', 'p_user', 'num_filas', 'total', 'product_name', 'id_product'], 'rentBalance', { start_month: 91 }).subscribe(
      result => {
        if (result.data && result.data.length) {
          this.adaptData(result.data);
        }
      }
    );
  }

  queryPie() {
    let kv = this.filterBuilder();
    this.pie.queryData(kv, { sqltypes: { start_date: 91 } });
    this.calculatePieTotal(kv)
  }
  calculatePieTotal(kv) {
    this.pieTotal = 0;
    this.configureService();
    this.productRequestService.query(kv, ["product_name", "rprofit"], "myProductRequestEntry", { start_date: 91 }).subscribe(
      result => {
        if (result.data && result.data.length) {
          for (let element of result.data) {
            this.pieTotal += element.rprofit;
          }
        }
      }
    );
  }

  adaptData(values) {
    let adaptedValues = [];
    let finalValues = [];
    let nameSet = new Set<string>();
    let monthSet = new Set<number>();
    values.forEach(element => {
      nameSet.add(element.product_name);
      monthSet.add(element.start_month);
      if (!adaptedValues[element.product_name]) {
        adaptedValues[element.product_name] = {};
      }
      if (adaptedValues[element.product_name]) {
        adaptedValues[element.product_name][element.start_month] = element.total;
      }
    });
    nameSet.forEach(nameElement => {
      let product = adaptedValues[nameElement];
      monthSet.forEach(monthElement => {
        let value = 0;
        if (product[monthElement]) {
          value = product[monthElement];
        }
        if (!finalValues[nameElement]) {
          finalValues[nameElement] = [];
        }
        finalValues[nameElement].push({ "x": monthElement, "y": value });
      });

    });
    this.data3 = [];
    nameSet.forEach(element => {
      this.data3.push({ "key": element, "values": finalValues[element] });
    });
  }

  protected configureService() {
    const conf = this.productRequestService.getDefaultServiceConfiguration('productsRequest');
    this.productRequestService.configureService(conf);
  }

  ngAfterViewInit() {
    let kv = this.filterBuilder()
    this.queryPie();
    this.calculatePieTotal(kv);
    this.configureService();
    this.queryMultiBar();
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    console.log(d3Locale);
    console.log(d3);
    if (this.multiBar) {
      let chartService: ChartService = this.multiBar.getChartService();
      if (chartService) {
        let chartOps = chartService.getChartOptions();
        console.log(chartOps);

        // Configuring x axis...
        chartOps['xAxis']['tickFormat'] =
          function (d) {
            return d3Locale.timeFormat('%B')(new Date(d));
          };
        chartOps['yAxis']['tickFormat'] = function (d) {
          return d3.format(',f')(d) + '€';
        };

        // Configuring y axis...
        var yScale = d3.scale.linear();
        chartOps['yScale'] = yScale;
        console.log(chartOps);
      }
    }
  }


  filterBuilder() {
    let dates = this.formFilter.getFieldValue("date")
    if (dates) {
      const startDate = dates.startDate.format('YYYY-MM-DD')
      const endDate = dates.endDate.format('YYYY-MM-DD')
      let startDateNum = dates.startDate.format('D');
      let endDateNum = dates.endDate.format('D');
      let startDateString = dates.startDate.format('MMMM');
      let endDateString = dates.endDate.format('MMMM');
      this.pieMonth.firstNum = startDateNum;
      this.pieMonth.first = startDateString;
      this.pieMonth.secondNum = endDateNum;
      this.pieMonth.second = endDateString;
      this.pieMonth.separator = "to";

      let filters: Array<Expression> = [];
      filters.push(FilterExpressionUtils.buildExpressionLessEqual("start_date", endDate));
      filters.push(FilterExpressionUtils.buildExpressionMoreEqual("start_date", startDate));
      let kv = {
        '@basic_expression': filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND))
      }
      kv["state"] = "applied"
      return kv;
    }
    else {
      const actualDate: Date = new Date();
      this.pieMonth.first = actualDate.toLocaleString('en-EN', { month: 'long' });
      this.pieMonth.separator = "";
      this.pieMonth.firstNum = "";
      this.pieMonth.secondNum = "";
      this.pieMonth.second = "";
      const firstDay: Date = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);
      const lastDay: Date = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 0);
      let filters: Array<Expression> = [];
      filters.push(FilterExpressionUtils.buildExpressionLessEqual("start_date", lastDay));
      filters.push(FilterExpressionUtils.buildExpressionMoreEqual("start_date", firstDay));
      let kv = {
        '@basic_expression': filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND))
      }
      kv["state"] = "applied"
      return kv;
    }
  }
}
