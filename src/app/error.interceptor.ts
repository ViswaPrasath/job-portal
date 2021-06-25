import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpHandler,HttpEvent,HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './Error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public modalService: NgbModal) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log('error caugth in interceptor' + err.error);
                if (err.status === 0) {
                    console.log(0);
                    const modalRef = this.modalService.open(ErrorComponent);
                    modalRef.componentInstance.name = "Oops...Something went wrong.Try again.";
                return throwError(err);
                }
                
                if (err.status === 500) {
                    console.log(500);
                    const modalRef = this.modalService.open(ErrorComponent);
                    modalRef.componentInstance.name = "Oops...Something went wrong.Try again.";
                    return throwError(err);
                }

                const modalRef = this.modalService.open(ErrorComponent);
                modalRef.componentInstance.name = "Warning: " +err.error.message;
                return throwError(err);
            })
        )
    }


}