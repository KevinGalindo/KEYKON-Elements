import { Injectable } from '@angular/core';
import { ApiCategoriesService, ICategorie } from '../api/categories';
import { MatDialog } from '@angular/material/dialog';
import { FormCategorieComponent } from '../pages/pg-categories/components/form-categorie/form-categorie.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _apiCategories: ApiCategoriesService,
    private _matDialog: MatDialog,
    private _MatSnackBar: MatSnackBar,
  ) {
  }

  create(): Promise<ICategorie | undefined>{
    return new Promise((resolve, reject) => {
      this._matDialog.open(FormCategorieComponent, {
        width: '100%',
        maxWidth: '400px'
      }).afterClosed().subscribe((resp: ICategorie | undefined) => {
        resolve(resp);
      })
    });
  }

  update(categorie: ICategorie): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this._matDialog.open(FormCategorieComponent, {
        width: '100%',
        maxWidth: '400px',
        data: categorie
      }).afterClosed().subscribe((resp: boolean) => {
        if(resp){
          this._MatSnackBar.openFromComponent(SnackBarComponent, {
            duration: 5 * 1000,
            data: {
              icon: 'checkmark-sharp',
              theme: 'success',
              text: 'La categoria se ha editado.'
            },
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        resolve(resp)
      })
    });
  }

  delete(id: number): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this._apiCategories.delete(id).subscribe({
        next: resp => {
          if(resp){
            this._MatSnackBar.openFromComponent(SnackBarComponent, {
              duration: 5 * 1000,
              data: {
                icon: 'checkmark-sharp',
                theme: 'success',
                text: 'La categoria se ha borrado.'
              },
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          resolve(resp)
        },
        error: err => {
          console.log(err);
        }
      });
    });
  }
}
