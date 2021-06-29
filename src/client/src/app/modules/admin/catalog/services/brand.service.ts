import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { BrandApiService } from '../api/brand-api.service';
import { Brand } from '../models/brand';
import { BrandParams } from '../models/brandParams';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private api: BrandApiService) {
  }

  getBrands(brandParams: BrandParams){
    let params = new HttpParams();
    if (brandParams.searchString) params = params.append('searchString', brandParams.searchString)
    if (brandParams.pageNumber) params = params.append('pageNumber', brandParams.pageNumber.toString())
    if (brandParams.pageSize) params = params.append('pageSize', brandParams.pageSize.toString());
    return this.api.getAlls(params).pipe(
      map((response: PaginatedResult<Brand>) => response)
    );
  }

  getBrandById(id: string){
    return this.api.getById(id).pipe(
      map((response: Brand) => response)
    );
  }
}