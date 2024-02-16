import { Component, EventEmitter, Injector, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { OBaseTableCellRenderer } from 'ontimize-web-ngx';

@Component({
  selector: 'app-button-column-renderer',
  templateUrl: './button-column-renderer.component.html',
  styleUrls: ['./button-column-renderer.component.css']
})
export class ButtonColumnRendererComponent extends OBaseTableCellRenderer implements OnInit {
  @ViewChild('templateref', { read: TemplateRef, static: false }) public templateref: TemplateRef<any>;
  @Output() messageEvent = new EventEmitter<any>();
  message: string = "Hello!"
  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit() {
  }
  showDialog(rowData){
    this.messageEvent.emit(rowData)
  }
}
