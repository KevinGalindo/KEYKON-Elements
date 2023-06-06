import { Component, OnInit, NO_ERRORS_SCHEMA, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AlertComponent implements OnInit {

  constructor(
    private _matDialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMatContent | undefined
    ) { }

  ngOnInit(): void {
  }

  response(boolean: boolean){
    this._matDialogRef.close(boolean);
  }

}

export interface IMatContent{
  icon: string,
  titulo: string,
  content: string,
  tools: boolean
}
