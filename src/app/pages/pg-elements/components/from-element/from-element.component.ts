import { Component, OnInit, NO_ERRORS_SCHEMA, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ApiElementsService, IElement } from 'src/app/api/elements';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-from-element',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './from-element.component.html',
  styleUrls: ['./from-element.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FromElementComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    desc: new FormControl<string>('', {nonNullable: false, validators: null}),
    url: new FormControl<string>('', {nonNullable: true, validators: Validators.required})
  })

  images: {file?:File, src:string}[] = [];
  imgSRC:string = '';

  constructor(
    private _apiELement: ApiElementsService,
    private _domSanitizer:DomSanitizer,
    private _matDialogRef: MatDialogRef<FromElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IElement | undefined
  ) {
    if (this.data) {
      this.form.controls.name.setValue(this.data.name);
      this.form.controls.desc.setValue(this.data.desc);
      this.form.controls.url.setValue(this.data.url);
    }
  }

  ngOnInit(): void {
  }

  tryFile(e: Event){
    let imgs:File[] = Array.from((e.target as HTMLInputElement).files || []);

    imgs.forEach(file => {
      this.imgSRC = (this.data?.id.toString().padStart(5, '0')) + "." + file.name.split('.').pop();
      this.extracBase64(file).then(src => {
        this.images.push({file, src});
      }
      );
    });
  }

  extracBase64(file: File):Promise<string>{
    return new Promise((resolve, reject) => {
      try{
        const usafeImg = URL.createObjectURL(file);
        this._domSanitizer.bypassSecurityTrustUrl(usafeImg);
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () =>{
          resolve((reader.result as string));
        }

        reader.onerror = error => {
          reject(error);
        }
        
        return undefined;
      } catch (error) {
        return error;
      }
    });
  }

  send(){
    if (this.form.controls.name.invalid || this.form.controls.url.invalid) {
      console.log("Es invalido");
      this.form.markAllAsTouched();
      return;
    }
    
    let data = this.form.getRawValue();
    let imgData = (this.images.filter(x => x.file ? true : false) as unknown as {file:File, src: string}[]);
    let imgFile = imgData.map(x => x.file);

    if(this.data){
      let element = this.data;
      this._apiELement.update(this.data.id, data, imgFile).subscribe({
        next: res => {
          console.log(res);
          if(res){
            element.name = data.name;
            element.desc = data.desc ? data.desc : '';
            element.url = data.url;
            element.img = this.imgSRC; console.log(this.imgSRC);
          }
          this._matDialogRef.close(res);
        },
        error: err => {
          console.log(err);
        }
      });
      return;
    }

    this._apiELement.create(data, imgFile).subscribe({
      next: res => {
        this._matDialogRef.close(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
