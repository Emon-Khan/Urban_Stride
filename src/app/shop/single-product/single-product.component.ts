import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { ProductDto } from '../../shared/model/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent implements OnInit {
  productId!: number;
  productDetails!: ProductDto;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log(idParam);
    if (idParam !== null) {
      this.productId = +idParam;
    }
    console.log(this.productId);
    this.shopService.getProductById(this.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.productDetails = response;
        console.log(this.productDetails);
      },
      error: (error) => console.log(error),
    });
  }
}
