import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../user.model';
import { Observable } from 'rxjs';
import { employerModel } from 'app/model/employer.model';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient,@Inject(LOCAL_STORAGE) private localStorage: WebStorageService) { }

  signUp(userData: UserModel): Observable<any> {
    return this.http.post("http://localhost:8000/user/signUp", userData);
  }

  getCompanyTypes() {
    let companyType = [];
    this.http.get<any>('http://localhost:8000/company_type').subscribe(data => {
      data.type.map(element => {
        companyType.push(element.type);
      });
    });
    return companyType;
  }

  employerSignUp(employerData: employerModel):Observable<any> {
    return this.http.post("http://localhost:8000/employer/signUp", employerData);
  }

  getSingleCandidate(candidateId: string): any {
    const id = candidateId;
    return this.http.get(`http://localhost:8000/user/singlecandidate/${id}`);
  }

  getSingleEmployer(employerId): any {
    const id = employerId;
    return this.http.get(`http://localhost:8000/employer/singleemployer/${id}`);
  }

  updateEmployerDetails(employerDetails): Observable<any> {
    const id = this.localStorage.get('employerId');
    return this.http.post(`http://localhost:8000/employer/updateProfile/${id}`,employerDetails);
  }

  
  updateCandidateDetails(candidateDetails): Observable<any> {
    const id = this.localStorage.get('candidateId');
    return this.http.post(`http://localhost:8000/user/updateProfile/${id}`,candidateDetails);
  }
}

