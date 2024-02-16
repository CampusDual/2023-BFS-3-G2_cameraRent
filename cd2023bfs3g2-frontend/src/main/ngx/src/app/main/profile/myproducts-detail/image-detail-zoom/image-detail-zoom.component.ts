import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-detail-zoom',
  templateUrl: './image-detail-zoom.component.html',
  styleUrls: ['./image-detail-zoom.component.css']
})
export class ImageDetailZoomComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = { statusname: "" },
    public dialogRef: MatDialogRef<ImageDetailZoomComponent>,
    protected injector: Injector,
    protected dialog: MatDialog
    ) { }

  ngOnInit() {
  }
  public loadData(ev) {
    this.data = ev;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
