import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AlertComponent } from "../components/alert/alert.component";
import { SnackBarComponent } from "../components/snack-bar/snack-bar.component";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    
    constructor(
        private _matDialog: MatDialog,
        private _MatSnackBar: MatSnackBar,
    ){}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let url:string = req.url;
        
        if(!req.url.match(/^http(s)?:\/\/(.*)$/)){
          url = `${environment.urls.api}/${url}`;
        }

        return next.handle(req.clone({url})).pipe(
            map(event => {
                if (event instanceof HttpResponse && event.url?.startsWith(environment.urls.api)) {
                    if (event.body.message) {
                        console.log(event.body.message);
                    }

                    return event.clone({body: event.body.data});
                }

                return event;
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.url?.startsWith(environment.urls.api)) {
                    if(err.status == 401){
                        console.log("no autorizado");
                    }

                    if (err.status == 404) {
                        if (err.error.message && typeof err.error.message == 'string') {
                            this._matDialog.open(AlertComponent, {
                                data: {
                                  icon: "alert-sharp",
                                  titulo: "Advertencia",
                                  content: err.error.message,
                                  tools: false
                                },
                                width: '280px'
                              }).afterClosed().subscribe(
                                (res: boolean) => {
                                  if(res){
                                    console.log(res);
                                  }
                                }
                              )

                        }
                    }

                    if (err.status != 404) {
                        
                        if (typeof err.error == 'object') {
                            if (err.error.message && typeof err.error.message == 'string') {
                                console.log(err.error.message);
                                this._matDialog.open(AlertComponent, {
                                    data: {
                                      icon: "alert-sharp",
                                      titulo: "Advertencia",
                                      content: "Está seguro de borrar este elemento?"
                                    },
                                    width: '280px'
                                  }).afterClosed().subscribe(
                                    (res: boolean) => {
                                      if(res){
                                        console.log(res);
                                      }
                                    }
                                  )

                            } else if (err.message){
                                console.log(err.message);
                            }
                        } else {
                            if (err.headers.get('content-type') == "text-plain") {
                                console.log(err.error);
                                this._MatSnackBar.openFromComponent(SnackBarComponent, {
                                    duration: 5 * 1000,
                                    data: {
                                      icon: 'close-outline',
                                      theme: 'error',
                                      text: err.error
                                    },
                                    horizontalPosition: "end",
                                    verticalPosition: "top"
                                  });
                            } else {
                                console.log('Error inesperado');
                            }
                        }

                    } 
                }
                return throwError(() => err);
            })
        );
    }
}