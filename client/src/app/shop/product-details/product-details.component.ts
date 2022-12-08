import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService) {
      // empty breadcrumb while page is loading
      this.breadcrumbService.set('@productDetails',' ');
    }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    let productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.shopService.getProduct(productId).subscribe({
      next: (p) => {
        this.product = p;
        // productDetail alias set in shop-routing.module
        this.breadcrumbService.set('@productDetails', p.name)
      },
      error: (e) => console.error(e)
    });
  }

}
