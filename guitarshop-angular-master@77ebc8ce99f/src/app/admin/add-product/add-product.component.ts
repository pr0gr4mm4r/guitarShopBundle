import {Component, OnInit} from '@angular/core';
import {ImageService} from '../../services/image/image.service';
import {Product} from '../../model/product';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  message: string;
  id: any;
  product = new Product;
  myControl = new FormControl();
  options: string[] = ['body', 'strings', 'guitar_neck'];
  filteredOptions: Observable<string[]>;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);
    let imageAndProductData: FormData;
    imageAndProductData = new FormData();
    const productBlob = new Blob([JSON.stringify(this.product)],{ type: 'application/json'});

    imageAndProductData.append('currentImage', this.selectedFile, this.selectedFile.name);
    imageAndProductData.append('productParams', productBlob);
    // @ts-ignore
    console.log(Array.from(imageAndProductData));

    this.imageService.addImage(imageAndProductData).subscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
