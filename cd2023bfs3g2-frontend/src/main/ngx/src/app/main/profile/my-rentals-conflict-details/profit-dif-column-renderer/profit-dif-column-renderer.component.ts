import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OBaseTableCellRenderer } from 'ontimize-web-ngx';

@Component({
  selector: 'app-profit-dif-column-renderer',
  templateUrl: './profit-dif-column-renderer.component.html',
  styleUrls: ['./profit-dif-column-renderer.component.css']
})
export class ProfitDifColumnRendererComponent extends OBaseTableCellRenderer implements OnInit {
  @ViewChild('templateref', { read: TemplateRef, static: false }) public templateref: TemplateRef<any>;
  

  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit() {
  }

}
