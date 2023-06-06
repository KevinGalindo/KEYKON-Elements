import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { IElement } from 'src/app/api/elements';

@Component({
  selector: 'app-card-elements',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './card-elements.component.html',
  styleUrls: ['./card-elements.component.scss']
})
export class CardElementsComponent implements OnInit {

  @Input('elements') elements:IElement[] = [];
  @Input('title') title:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  isArray(data: string | string[]): string[]{
    if(Array.isArray(data)){
      return data;
    }
    return [];
  }

}
