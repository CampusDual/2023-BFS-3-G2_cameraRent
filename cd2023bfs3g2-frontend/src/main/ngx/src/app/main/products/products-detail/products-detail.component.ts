import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Expression, FilterExpressionUtils, OFormComponent, OntimizeService } from 'ontimize-web-ngx';
import { ProductsNewRentalComponent } from '../products-new-rental/products-new-rental.component';
import { GalleryImageSize } from 'ontimize-web-ngx-gallery';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})

export class ProductsDetailComponent implements OnInit {
  @ViewChild('form', { static: false }) form: OFormComponent;


  public galleryImages = [
    {
      medium: "assets/images/no-image.png"
    }
  ];
  public galleryOptions = [
    {
      breakpoint: 1920,
      height: "100%",
      image: true,
      thumbnails: true,
      preview: true,
      imageArrows: true,
      imagePercent: 100,
      imageSize: GalleryImageSize.Cover,
      thumbnailSize: GalleryImageSize.Cover,
      thumbnailsColumns: 3,
      thumbnailsRows: 1,
      thumbnailsPercent: 25,
      thumbnailsMargin: 10,
      thumbnailMargin: 10,
      previewArrows: true,
      previewAutoPlay: false,
      previewCloseOnClick: true,
      previewCloseOnEsc: true,
      previewKeyboardNavigation: true,
      previewDownload: true,
      previewRotate: true,
      previewZoom: true,
      previewDescription: false,
      previewFullscreen: true
    }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = { statusname: "" },
    public dialogRef: MatDialogRef<ProductsDetailComponent>,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected imageRequestService: OntimizeService,
    protected rentRequestService: OntimizeService,
  ) {
  }
  ngOnInit() {
    this.configureService();

    this.queryImages(this.data.id_product)

  }
  public loadData(ev) {
    this.data = ev;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  public openRentDialog(): void {
    this.dialog.open(ProductsNewRentalComponent, {
      minWidth: '30%',
      data: this.data,
      panelClass: 'custom-dialog-container'
    });
  }
  createImageArray(dataImages) {
    this.galleryImages = []
    this.galleryImages.push(
      {
        medium: "data:image/png;base64," + this.data.main_photo
      });
    if (dataImages != null) {
      for (let element of dataImages) {
        this.galleryImages.push(
          {
            medium: "data:image/png;base64," + element.pimage
          });
      }
    }
  }
  queryImages(idProduct) {
    this.imageRequestService.query({ "tproducts_id_product": idProduct }, ['pimage'], 'productImage').subscribe(
      result => {
        if (result.data && result.data.length) {
          console.log(result.data);
          this.createImageArray(result.data);
        } else {
          this.createImageArray([]);
        }
      }
    );
  }


  protected configureService() {

    const conf = this.imageRequestService.getDefaultServiceConfiguration('products');
    this.imageRequestService.configureService(conf);
  }


}
