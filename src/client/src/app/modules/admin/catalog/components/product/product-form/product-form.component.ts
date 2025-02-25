import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  formTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, private productService: ProductService, private toastr: ToastrService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      brandId: [this.data && this.data.brandId, Validators.required], // todo get brands and show dropdown to select brand instead of hidden input
      categoryId: [this.data && this.data.categoryId, Validators.required], // todo get categories and show dropdown list to select category
      localeName: [this.data && this.data.localeName, Validators.required],
      price: [this.data && this.data.price, Validators.required],
      cost: [this.data && this.data.cost, Validators.required],
      tax: [this.data && this.data.tax && this.data.tax === 'YES', Validators.required],
      taxMethod: [this.data && this.data.taxMethod, Validators.required],
      barcodeSymbology: [this.data && this.data.barcodeSymbology, Validators.required],
      isAlert: [!!(this.data && this.data.isAlert), Validators.required],
      alertQuantity: [this.data && this.data.alertQuantity, Validators.required],
      detail: [this.data && this.data.detail, Validators.required]
    });
    if (this.productForm.get('id').value === '' || this.productForm.get('id').value == null) {
      this.formTitle = 'Register Product';
    } else {
      this.formTitle = 'Edit Product';
    }
  }

  onSubmit() {
    // TODO after successful update/insert, refresh table view in component product.component.ts
    if (this.productForm.valid) {
      if (this.productForm.get('id').value === '' || this.productForm.get('id').value == null) {
        this.productService.createProduct(this.productForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        });
      } else {
        this.productForm.get('tax').setValue(this.productForm.get('tax').value ? 'YES' : 'NO');
        this.productService.updateProduct(this.productForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        });
      }
    }
  }

}
