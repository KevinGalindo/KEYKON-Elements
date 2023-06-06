import { Injectable } from '@angular/core';
import { ApiElementsService, IElement } from '../api/elements';
import { MatDialog } from '@angular/material/dialog';
import { FromElementComponent } from '../pages/pg-elements/components/from-element/from-element.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private _list:IElement[] = [];
  list:IElement[] = [];

  constructor(
    private _apiElements: ApiElementsService,
    private _matDialog: MatDialog,
    private _MatSnackBar: MatSnackBar,
    private _router: Router
  ) {}

  loadData(cate?:string){
    return new Promise((resolve, reject) => {
      this._apiElements.getAll(cate).subscribe({
        next: resp => {
          this.list = resp;
          this._list = resp;
          console.log(resp);
          resolve(resp);
        },
        error: err => {
          console.log(err);
          this.list = [];
          reject(err);
        }
      });
    });
  }

  create(): Promise<IElement | undefined>{
    return new Promise((resolve, _reject) => {
      this._matDialog.open(FromElementComponent, {
        width: '100%',
        maxWidth: '400px'
      }).afterClosed().subscribe((res: undefined | IElement) =>{
        resolve(res);
      })
    });
  }

  update(element: IElement): void{
    this._matDialog.open(FromElementComponent, {
      data: element,
      width: '100%',
      maxWidth: '400px'
    }).beforeClosed().subscribe(
      (res: boolean) =>{
        if (res) {
          this.loadData();
          this._MatSnackBar.openFromComponent(SnackBarComponent, {
            duration: 5 * 1000,
            data: {
              icon: 'checkmark-sharp',
              theme: 'success',
              text: 'El elemento se ha actualizado.'
            },
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
      }
    );
  }

  get(id: number): Promise<IElement>{
    return new Promise((resolve, reject) => {
      let element: IElement | undefined = this.list.find(x => x.id == id);

      if (element) {
        // Si el elemento ya habia sido previamente cargado solo lo muestra
        resolve(element);
      } else {
        // Si el elemento no ha sido cargado.
        this._apiElements.get(id).subscribe({
          next: res => {
            resolve(res);
          },
          error: err => {
            reject(err);
          }
        });
      }
    });
  }

  delete(id: number){
    this._apiElements.delete(id).subscribe({
      next: (resp: boolean) => {
        console.log(resp);
        if (resp) {
          this.list = this.list.filter( elementData => {
            return elementData.id !== id;
          });
          this._MatSnackBar.openFromComponent(SnackBarComponent, {
            duration: 5 * 1000,
            data: {
              icon: 'checkmark-sharp',
              theme: 'success',
              text: 'El elemento se ha borrado.'
            },
            horizontalPosition: "end",
            verticalPosition: "top"
          });
          this._router.navigate(['/elementos']);
        }
        return this.list;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  searchElement(value:string){
    this.list = this._list.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
  }

  clearSearch(){
    this.list = this._list;
  }

  byCategory(category:string){
    this.list = this._list.filter(x => x.categories?.includes(category));
  }
}
