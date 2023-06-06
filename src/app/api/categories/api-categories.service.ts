import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategorie, ICategorieForm } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<ICategorie[]>{
    return this._http.get<ICategorie[]>('categories');
  }

  create(data: ICategorieForm): Observable<ICategorie>{
    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this._http.post<ICategorie>('categories', formData);
  }

  update(id: number, data: ICategorieForm): Observable<boolean>{
    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this._http.put<boolean>(`categories/${id}`, formData);
  }

  delete(id:number): Observable<boolean>{
    return this._http.delete<boolean>(`categories/${id}`);
  }
}
