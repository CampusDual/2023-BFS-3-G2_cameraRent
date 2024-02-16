import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { FilterExpressionUtils, OFormComponent, OTranslateService, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new-rental',
  templateUrl: './products-new-rental.component.html',
  styleUrls: ['./products-new-rental.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ProductsNewRentalComponent implements OnInit {
  minDate = new Date();
  startDate: Date;
  endDate: Date;
  @ViewChild('form', { static: false }) form: OFormComponent;
  @ViewChild('picker', { static: false }) picker: MatDatepicker<Date>;
  @ViewChild('picker2', { static: false }) picker2: MatDatepicker<Date>;
  protected productRequestService: OntimizeService;

  public noDates: Date[] = [];
  myFilter = (d: Date | null): boolean => {
    let currentDate = d ? new Date(d) : new Date();
    return !this.noDates.some(date => date.getTime() === currentDate.getTime());
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = { statusname: "" }, protected injector: Injector,
    public dialogRef: MatDialogRef<ProductsNewRentalComponent>,
    private translateService: OTranslateService,
    private _adapter: DateAdapter<any>,

  ) {
    this.productRequestService = this.injector.get(OntimizeService);

  }
  ngOnInit() {
    this.configureService();
    this.queryDates();
    this.changeLang();
  }
  public loadData(ev) {
    this.data = ev;
  }
  calcMinDateTwo() {
    if (this.startDate) {
      const minDateTwo = new Date(this.startDate);
      minDateTwo.setDate(minDateTwo.getDate() + 1);
      return minDateTwo;
    }
    return new Date();
  }
  changeLang() {
    let currentLang = this.translateService.getCurrentLang();
    this._adapter.setLocale(currentLang);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  public update() {
    let clean: boolean = true;
    if (this.startDate && this.endDate) {
      let startDate = moment(this.startDate);
      while (startDate.isSameOrBefore(this.endDate)) {
        const isDateInArray = this.noDates.some(date => date.getTime() === startDate.toDate().getTime());
        if (isDateInArray) {
          clean = false;
          alert(this.translateService.get('CONFLICTED PERIOD MESSAGE'));
          break;
        }
        startDate.add(1, 'day');
      }
    } else {
      clean = false;
      alert(this.translateService.get('NO DATE ALERT'));
    }



    if (clean) {
      let requestText = this.form.getFieldValue("request_text");
      console.log(moment(this.startDate).format('YYYY-MM-DD'));
      const atribMap = {
        "tproducts_id_product": this.data.id_product,
        "state": "pending",
        "request_text": requestText,
        "start_date": moment(this.startDate).format('YYYY-MM-DD'),
        "end_date": moment(this.endDate).format('YYYY-MM-DD'),
        "rprice": this.data.price,
        "rprofit": this.calcProfit(this.startDate, this.endDate)
      };
      this.productRequestService.insert(atribMap, "productRequest").subscribe(
        response => {
          if (response) {
            alert(this.translateService.get('REQUEST SUCCESS'));
          } else {
            alert(this.translateService.get('SOMETHING WRONG'));
          }
        });
      this.dialogRef.close();
    }


  }
  calcProfit(startDate, endDate) {
    let daysDiff = endDate.diff(startDate, 'days') + 1;
    return daysDiff * this.data.price
  }

  protected configureService() {

    const conf = this.productRequestService.getDefaultServiceConfiguration('productsRequest');
    this.productRequestService.configureService(conf);
  }
  queryDates() {
    this.configureServiceRequests();
    let kv = this.configureFilter();
    this.productRequestService.query(kv, ['id_prequest', 'start_date', 'end_date', 'tproducts_id_product', 'state'], 'productRequest', { start_date: 91, end_date: 91 }).subscribe(
      result => {
        if (result.data && result.data.length) {
          for (let element of result.data) {
            let startDate = moment(element.start_date);
            let endDate = moment(element.end_date);
            this.noDates.push(startDate.clone().toDate());
            while (startDate.isSameOrBefore(endDate)) {
              this.noDates.push(startDate.clone().toDate()); // Clonamos la fecha para evitar problemas de referencia
              startDate.add(1, 'day');
            }
          }
        }
      }
    );
  }
  protected configureServiceRequests() {
    const conf = this.productRequestService.getDefaultServiceConfiguration('productsRequest');
    this.productRequestService.configureService(conf);
  }
  private configureFilter() {
    let actualDate: Date = new Date();
    const filterExpr = FilterExpressionUtils.buildExpressionMoreEqual("end_date", actualDate.getTime());
    const basicExpr = FilterExpressionUtils.buildBasicExpression(filterExpr);
    basicExpr['tproducts_id_product'] = this.data.id_product;
    basicExpr['state'] = "applied";
    return basicExpr;
  }

}
