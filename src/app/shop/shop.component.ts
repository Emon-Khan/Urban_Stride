import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Brand, Category, ProductDto } from '../shared/model/product';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopParams } from '../shared/model/shopparams';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, PaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: ProductDto[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  shopParams: ShopParams;
  totalCount = 0;
  sortOptions = [
    { name: 'Alphabetical', value: 'title' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: Hight To Low ', value: 'priceDesc' },
  ];
  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        if (response != null) {
          this.products = response.productList;
          this.shopParams.pageIndex = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.totalCount;
        }
      },
      error: (error) => console.log(error),
    });
  }
  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = [{ categoryId: 0, categoryName: 'All' }, ...response];
      },
      error: (error) => console.log(error),
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brands = [{ brandId: 0, brandName: 'All' }, ...response];
      },
      error: (error) => console.log(error),
    });
  }
  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }
  onCategorySelected(categoryId: number) {
    const params = this.shopService.getShopParams();
    params.categoryId = categoryId;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }
  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }
  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageIndex !== event.page) {
      params.pageIndex = event.page;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }
  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    // params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
