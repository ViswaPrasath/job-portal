import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn:"root"})
export class LoginService {

    loginStatusSub = new Subject<boolean>();
    employerLoginSub = new Subject<boolean>();
    candidateLoginSub = new Subject<boolean>();

    constructor(private http: HttpClient,@Inject(LOCAL_STORAGE) private storeageService: StorageService,private router:Router) { }
    
    async candidateLogin(username: string,password: string): Promise<boolean> {
        const candidateData = {
            username: username,
            password: password
        };
    
        let status = false;
        await this.http.post<{"message":string,"userId":string}>("http://localhost:8000/user/login", candidateData).subscribe(response => {
            if (response.userId) {
                this.storeageService.set('candidateId', response.userId); 
                this.candidateLoginSub.next(true);
                this.loginStatusSub.next(true);
            }
            status = true;
        });

        return status;
    }

    async employerLogin(username: string, password: string): Promise<boolean> {
        const employerData = {
            username: username,
            password: password
        };
        let status = false;
       await this.http.post<{"message":string,"userId":string}>("http://localhost:8000/employer/login", employerData).subscribe(response => {
            if (response.userId) {
                this.storeageService.set('employerId', response.userId);
                this.employerLoginSub.next(true);
                this.loginStatusSub.next(true);
            }
            status = true;
        });
        return status;
    }

    loginStatus() {
        return this.loginStatusSub.asObservable();
    }

    employerLoginStatus() {
        return this.employerLoginSub.asObservable();
    }

    candidateLoginStatus() {
        return this.candidateLoginSub.asObservable();
    }
}