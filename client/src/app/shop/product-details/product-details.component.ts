import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  product: IProduct;
  quantity: number = 1

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService) {
      // empty breadcrumb while page is loading
      this.breadcrumbService.set('@productDetails',' ');
    }

  ngOnInit(): void {
    this.getProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
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
