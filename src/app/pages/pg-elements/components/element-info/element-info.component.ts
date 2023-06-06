import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementsService } from 'src/app/services/elements.service';
import { ApiElementsService, IElement } from 'src/app/api/elements';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ElementCategorieComponent } from '../element-categorie/element-categorie.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-element-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-info.component.html',
  styleUrls: ['./element-info.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ElementInfoComponent implements OnInit {

  data!: IElement;

  constructor(
    private _activateRoute: ActivatedRoute,
    public _elementService: ElementsService,
    public _apiElement: ApiElementsService,
    private _router: Router,
    private _matDialog: MatDialog,
    private _MatSnackBar: MatSnackBar
  ) { }

  onImageLoad(e: Event){
    console.log(e);
  }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(map => {
      let elementId: string | null = map.get('element');

      if (elementId && elementId.match(/[0-9]+/)) {
        this._elementService.get(Number.parseInt(elementId))
          .then(val => {
            this.data = val;
          })
          .catch(err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 403 || err.status == 404) {
                this._router.navigate(['/elementos']);
              }
            }
          });
      } else {
        this._router.navigate(['/elementos']);
      }
    });
  }

  addCategories(){
    this._matDialog.open(ElementCategorieComponent, {
      data: {
        id: this.data.id,
        categories: this.data.categories
      },
      width: 'auto'
    }).afterClosed().subscribe({
      next: (resp: boolean) =>{
        if (resp) {
          this._MatSnackBar.openFromComponent(SnackBarComponent, {
            duration: 5 * 1000,
            data: {
              icon: 'checkmark-sharp',
              theme: 'success',
              text: 'Solicitud válida.'
            },
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
      }
    })
  }

  deleteElement(element: IElement){
    this._matDialog.open(AlertComponent, {
      data: {
        icon: "alert-sharp",
        titulo: "Advertencia",
        content: "Está seguro de borrar este elemento?",
        tools: true
      },
      width: '280px'
    }).afterClosed().subscribe((res: boolean): void => {
        if(res) this._elementService.delete(element.id);
      }
    )
  }

}
