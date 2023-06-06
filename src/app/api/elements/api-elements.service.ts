import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IElement } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiElementsService {

  constructor(private _http: HttpClient) { }

  getAll(cate:string = ''): Observable<IElement[]>{

    let cateObj= {
      cate: cate
    }

    return this._http.get<IElement[]>('elements', {params: cateObj}).pipe(
      map( resp => {
        resp.map(element => {
          if(typeof element.categories === "string"){
            element.categories = element.categories.split(",");
          }
        })
        return resp;
      })
    );
  }

  create(data: IDataForm, files: File[]): Observable<IElement>{
    let formData = new FormData();

    formData.append('data', JSON.stringify(data));
    files.forEach((f,i) => {
      formData.append(`img-${i}`, f);
    });
    return this._http.post<IElement>('elements', formData);
  }

  get(id: number): Observable<IElement>{
    return this._http.get<IElement>(`elements/${id}`).pipe(
      map( resp => {
        if(typeof resp.categories === "string"){
          resp.categories = resp.categories.split(",");
        }
        return resp;
      })
    );
  }

  update(id: number,data:IDataForm, files:File[]): Observable<boolean>{
    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    files.forEach((f,i) => {
      formData.append(`img-${i}`, f);
    });

    return this._http.put<boolean>(`elements/${id}`, formData);
  }

  delete(id: number): Observable<boolean>{
    return this._http.delete<boolean>(`elements/${id}`);
  }

  addElementCategories(id:number, categoriesId:number[] = []): Observable<boolean>{
    return this._http.post<boolean>(`elements/${id}/categories`, {
      categories: categoriesId
    });
  }

}

interface IDataForm{
  name: string,
  desc: string | null,
  url: string
}