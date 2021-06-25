import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  apply4job(employerId, userId ) {
    this.http.post("", { employerId, userId }).subscribe(res => {
      console.log(res);
    })
  }

  getJob(jobPerPage, currentPage): Observable<any> {
    const queryParams = `?jobPerPage=${jobPerPage}&currentPage=${currentPage}`;
    return this.http.get("http://localhost:8000/user/getJob/" + queryParams);
  }
}
