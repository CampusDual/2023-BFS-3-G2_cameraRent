import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OBaseTableCellRenderer, OIconPipe } from 'ontimize-web-ngx';

@Component({
  selector: 'app-status-column-renderer',
  templateUrl: './status-column-renderer.component.html',
  styleUrls: ['./status-column-renderer.component.css']
})
export class StatusColumnRendererComponent extends OBaseTableCellRenderer implements OnInit {

  @ViewChild('templateref', { read: TemplateRef, static: false }) public templateref: TemplateRef<any>;

  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit() {
  }

}
