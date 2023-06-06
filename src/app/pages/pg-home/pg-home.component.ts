import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsService } from 'src/app/services/elements.service';
import { IElement } from 'src/app/api/elements';
import { CardElementsComponent } from "./card-elements/card-elements.component";
import { ApiCategoriesService, ICategorie } from 'src/app/api/categories';

@Component({
    selector: 'app-pg-home',
    standalone: true,
    templateUrl: './pg-home.component.html',
    styleUrls: ['./pg-home.component.scss'],
    imports: [CommonModule, CardElementsComponent]
})
export class PgHomeComponent implements OnInit {

  elementsDateDesc:IElement[] = [];
  elementsForCategory:IElement[] = [];

  CategoriesOrderRandom: ICategorie[] = [];
  elementsForCategoryRamdon:IElement[] = [];
  elementsForCategoryRamdonTwo:IElement[] = [];
  titleCategoryRamdom:string = '';
  titleCategoryRamdomTwo:string = '';

  constructor(
    public _elements: ElementsService,
    public _apiCategoryService: ApiCategoriesService,
  ) {

    this._apiCategoryService.getAll().subscribe({
      next: resp => {
        this.CategoriesOrderRandom = resp.filter(X => X.id !== 1).sort(this.randomComparision);
        
        this.titleCategoryRamdom = this.CategoriesOrderRandom[0].name;
        this.titleCategoryRamdomTwo = this.CategoriesOrderRandom[1].name;
    
      }
    })

  }

  ngOnInit(): void {
    this._elements.loadData().then( resp => {
      this._elements.list = this._elements.list.sort((a,b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      })
      this.elementsDateDesc = this._elements.list;
      this.elementsForCategory = this.elementsParseCategory('websites');
      this.elementsForCategoryRamdon = this.elementsParseCategory(this.CategoriesOrderRandom[0].name);
      this.elementsForCategoryRamdonTwo = this.elementsParseCategory(this.CategoriesOrderRandom[1].name);
    });
  }

  elementsParseCategory(cate:string,):IElement[]{

    return this._elements.list.filter(x => x.categories?.includes(cate));

  }

  randomComparision(a:ICategorie, b:ICategorie){
    return 0.5 - Math.random();
  }

}
