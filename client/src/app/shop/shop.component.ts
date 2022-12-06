import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
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
  shopParams: ShopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name'},
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (v) => {
        this.products = v.data;
        this.shopParams.pageIndex = v.pageIndex;
        this.shopParams.pageSize = v.pageSize;
        this.totalCount = v.count;
      },
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
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageIndex = event;
    this.getProducts(); 
  }

}
