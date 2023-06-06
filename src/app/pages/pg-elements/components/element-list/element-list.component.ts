import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsService } from 'src/app/services/elements.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiElementsService, IElement } from 'src/app/api/elements';
import { ApiCategoriesService, ICategorie } from 'src/app/api/categories';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ElementListComponent implements OnInit {

  search:string = '';
  searchValue:boolean = false;
  title:string = 'Todos los elementos';

  dropdown:boolean = false;
  inputDropText:string = 'Ordenar por';

  listCate: ICategorie[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public _elements: ElementsService,
    public _apiCategoryService: ApiCategoriesService,
    private _apiElements: ApiElementsService
    ) {
    }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params['cate']);
      this._elements.loadData(params['cate']).then(resp => {

        this.activeRoute.queryParams.subscribe( resp => {
          if(resp['text']){
            this.searchValue = true;
            this.search = resp['text'];
            this._elements.searchElement(this.search);
            this.title = `Buscando: "${this.search}"`;
          }
        });

      });
    });
  }

  create(){
    this._elements.create().then(element => {
      if (element) this._elements.list.push(element);
    })
  }

  get elements(): IElement[]{
    return this._elements.list;
  }

  closeSearch(){
    this._elements.clearSearch();
    this.searchValue = false;
    this.title = 'Todos los elementos';

    const queryParams = {...this.activeRoute.snapshot.queryParams};
    delete queryParams['text']; //Elimina el parametro text del objeto
    this.router.navigate([]);
  }

  isArray(data: string | string[]): string[]{
    if(Array.isArray(data)){
      return data;
    }
    return [];
  }

  dropdownToggle(elemt:HTMLDivElement){
    elemt.classList.toggle('active');
    this.loadCategories();
  }

  setDropdownText(inputElemt: HTMLInputElement, category:string){
    inputElemt.placeholder = category;
  }

  SortByName(descending:boolean){

    if (descending) {
      this._elements.list = this._elements.list.sort((a, b) => a.name.localeCompare(b.name));
      this.inputDropText = 'Nombre';
    } else {
      this._elements.list = this._elements.list.sort((a, b) => b.name.localeCompare(a.name));
      this.inputDropText = 'Nombre decendente';
    }

  }

  SortByDate(descending:boolean){

    if (descending) {
      this._elements.list = this._elements.list.sort((a,b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      });
      this.inputDropText = 'Fecha';
    } else {
      this._elements.list = this._elements.list.sort((a,b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      this.inputDropText = 'Fecha decendente';
    }

  }

  loadCategories(){
    this._apiCategoryService.getAll().subscribe({
      next: resp => {
        this.listCate = resp;
      }
    })
  }

}