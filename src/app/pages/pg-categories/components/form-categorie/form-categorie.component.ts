import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCategoriesService, ICategorie } from 'src/app/api/categories';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-categorie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-categorie.component.html',
  styleUrls: ['./form-categorie.component.scss']
})
export class FormCategorieComponent implements OnInit {

  status:string = "Crear";

  form = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    desc: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    color: new FormControl<string>('', {nonNullable: true, validators: Validators.required})
  });

  constructor(
    private _apiCategories: ApiCategoriesService,
    private _matDialogRef: MatDialogRef<FormCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategorie | undefined
  ) {
    if (this.data) {
      this.status = 'Editar';
      this.form.controls.name.setValue(this.data.name);
      this.form.controls.color.setValue(this.data.color);
      this.form.controls.desc.setValue(this.data.desc);
    }
  }

  ngOnInit(): void {
  }

  send(){
    if(this.form.invalid){
      console.log('El formulario esta mal');
      this.form.markAllAsTouched();
      return;
    }

    let data = this.form.getRawValue();

    if(this.data){
      let categorie = this.data;
      this._apiCategories.update(categorie.id, data).subscribe({
        next: resp => {
          if(resp){
            categorie.name = data.name;
            categorie.color = data.color;
            categorie.desc = data.desc;
          }
          this._matDialogRef.close(resp);
        },
        error: err => {
          console.log(err);
        }
      });
      return;
    }

    this._apiCategories.create(data).subscribe({
      next: resp => {
        this._matDialogRef.close(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
