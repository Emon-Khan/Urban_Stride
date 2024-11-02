import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/model/pagination';
import { Brand, Category, ProductDto } from '../shared/model/product';
import { environment } from '../../environment/environment';
import { ShopParams } from '../shared/model/shopparams';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shopParams = new ShopParams();
  pagination?: Pagination<ProductDto[]>;
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Pagination<ProductDto[]>> {
    let params = new HttpParams();
    if (this.shopParams.brandId > 0)
      params = params.append('brandId', this.shopParams.brandId.toString());
    if (this.shopParams.categoryId > 0)
      params = params.append(
        'categoryId',
        this.shopParams.categoryId.toString()
      );
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageIndex.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }
    console.log('Params');
    console.log(params);
    return this.http
      .get<Pagination<ProductDto[]>>(environment.apiUrl + '/shop/products', {
        params,
      })
      .pipe(
        map((response) => {
          this.pagination = response;
          console.log(response);
          return response;
        })
      );
  }
  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/shop/categories');
  }
  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/shop/brands');
  }
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  getShopParams() {
    return this.shopParams;
  }
}
