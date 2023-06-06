import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CategoriesService } from 'src/app/services/categories.service';
import { ApiCategoriesService, ICategorie } from 'src/app/api/categories';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'app-pg-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pg-categories.component.html',
  styleUrls: ['./pg-categories.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PgCategoriesComponent implements OnInit {

  constructor(
    private _apiCategories: ApiCategoriesService,
    private _CategoriesService: CategoriesService,
    private _raouter: Router,
    private _matDialog: MatDialog
  ) {
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  getAllCategories(){
    this._apiCategories.getAll().subscribe({
      next: res => {
        data.list = res;
        console.log(res);
      }
    });
  }

  navigateToElements(cate: string): void{
    this._raouter.navigate(['/elementos'], { queryParams: { cate } });
  }

  get categories(): ICategorie[]{
    return data.list || [];
  }

  create(){
    this._CategoriesService.create().then(categorie => {
      if(categorie) data.list.push(categorie);
    })
  }

  update(categorie: ICategorie){
    this._CategoriesService.update(categorie).then(resp =>{
      if(resp) this.getAllCategories();
    });
  }

  delete(categorie: ICategorie){
    this._matDialog.open(AlertComponent, {
      data: {
        icon: "alert-sharp",
        titulo: "Advertencia",
        content: "Está seguro de borrar esta categoria?",
        tools: true
      },
      width: '280px'
    }).afterClosed().subscribe((resp: boolean) => {
      if(resp) {
        this._CategoriesService.delete(categorie.id).then( resp =>{
          if(resp) data.list = data.list.filter(categorieData => categorieData.id !== categorie.id);
        })
      };
    });
  }

}

const data: {
  list: ICategorie[]
} = {
  list: []
}