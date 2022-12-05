import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  types: IType[];
  brands: IBrand[];
  typeIdSelected: number = 0;
  brandIdSelected: number = 0;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }

  getProducts(): void {
    this.shopService.getProducts(this.typeIdSelected, this.brandIdSelected).subscribe({
      next: (v) => this.products = v.data,
      error: (e) => console.error(e)
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (v) => this.types = [{id: 0, name: 'All'}, ...v],
      error: (e) => console.error(e)
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (v) => this.brands = [{id: 0, name: 'All'}, ...v],
      error: (e) => console.error(e)
    });
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }


}
