import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Brand } from '../../models/brand';
import { BrandParams } from '../../models/brandParams';
import { Product } from '../../models/product';
import { ProductParams } from '../../models/productParams';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  brands: PaginatedResult<Brand>;
  brandParams = new BrandParams();
  products: PaginatedResult<Product>;
  productParams = new ProductParams();
  searchString: string;
  brandAutoComplete = new FormControl();
  constructor(private posService: PosService) { }

  ngOnInit(): void {
    this.productParams.pageSize = 5;
    this.brandParams.pageSize = 5;
    this.getProducts();
    this.getBrands();
    this.brandAutoComplete.valueChanges.subscribe((value) => this._filterBrand(value));
  }
  getProducts() {
    this.posService.getProducts(this.productParams).subscribe((res) => { this.products = res });
  }
  getBrands() {
    this.posService.getBrands(this.brandParams).subscribe((res) => { this.brands = res; });
  }

  private _filterBrand(value: string) {
    const filterValue = value.toLowerCase();
    this.brandParams.searchString = filterValue;
    this.getBrands();
  }
  public doFilter(): void {
    this.productParams.searchString = this.searchString.trim().toLocaleLowerCase();
    this.getProducts();
  }
  getBrandName(brandId: string) {
    if (this.brands && this.brands.data && this.brands.data.find(book => book.id === brandId)) {
      return this.brands.data.find(brand => brand.id === brandId).name;
    }
  }
}
