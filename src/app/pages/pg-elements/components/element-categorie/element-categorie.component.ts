import { Component, Inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ApiCategoriesService, ICategorie } from 'src/app/api/categories';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiElementsService } from 'src/app/api/elements';

@Component({
  selector: 'app-element-categorie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-categorie.component.html',
  styleUrls: ['./element-categorie.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ElementCategorieComponent implements OnInit {
  categories:ICategorie[] = [];

  toppings = new FormControl<number[]>([],{ nonNullable: true});

  constructor(
    private _apiCategories: ApiCategoriesService,
    private _apiElements: ApiElementsService,
    private _matDialogRef: MatDialogRef<ElementCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number, categories: null|string[]} | undefined
  ) {
    this._apiCategories.getAll().subscribe({
      next: resp => {
        this.categories = resp;
        this.OnInit();
        console.log(resp);
      }
    })
  }

  ngOnInit(): void {
  }

  OnInit(): void{
    if(this.data){
      console.log(this.data);
      if(this.data.categories){
        this.toppings.setValue(this.getIdsByNames(this.data.categories));
      }
    }
  }

  itemClick(item: number){
    let i:number = this.toppings.getRawValue().findIndex(x => x == item);
    if(i > -1){
      this.toppings.getRawValue().splice(i, 1);
    } else {
      this.toppings.getRawValue().push(item);
    }
  }

  isChecked(item: number):string {
    return this.toppings.getRawValue().find(x => x == item) ? 'checked' : '';
  }

  getIdsByNames(names: string[]):number[]{
    const result:number[] = [];

    this.categories.filter(item => names.includes(item.name)).forEach(item => {
      result.push(item.id)
    });

    return result;
  }

  send(){
    console.log(this.toppings.value);
    if (this.data) {
      this._apiElements.addElementCategories(this.data.id, this.toppings.value).subscribe({
        next: resp => {
          this._matDialogRef.close(resp);
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

}
