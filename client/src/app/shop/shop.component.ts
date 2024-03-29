import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  search = new FormControl('');
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
      next: (pag) => {
        this.products = pag.data;
        this.shopParams.pageIndex = pag.pageIndex;
        this.shopParams.pageSize = pag.pageSize;
        this.totalCount = pag.count;
      },
      error: (e) => console.error(e)
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (t) => this.types = [{id: 0, name: 'All'}, ...t],
      error: (e) => console.error(e)
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (b) => this.brands = [{id: 0, name: 'All'}, ...b],
      error: (e) => console.error(e)
    });
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageIndex != event) {
      this.shopParams.pageIndex = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.search.value;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onReset() {
    this.search.setValue('');
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
