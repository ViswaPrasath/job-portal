import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from '../Error/error.component';

@Injectable({
    providedIn: "root"
})
export class LoginService 
{
    constructor(private http: HttpClient, private router: Router,private modalService:NgbModal) { }
    
    login(data) {
        this.http.post('http://localhost:8000/admin/login', data).subscribe(res => {
            this.router.navigate(['/', 'dashboard']);
        }, err => {
                const modalRef = this.modalService.open(ErrorComponent);
                modalRef.componentInstance.name = "Oops..something went wrong";
        })     
  }
}