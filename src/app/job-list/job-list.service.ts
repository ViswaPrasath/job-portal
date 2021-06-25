import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LOCAL_STORAGE,StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorComponent } from 'app/Error/error.component';
import { SuccessComponent } from 'app/success/success.component';
import { CssSelector } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class JobListService {

  constructor(private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private modalService: NgbModal) { }

  getJob() : Observable<any>{
    const employerId = this.storage.get('employerId');
    const empId = `?employerId=${employerId}`;
    return this.http.get("http://localhost:8000/employer/fetchJob" + empId);
  }

  updateJobDetails(id,empId,data) {
    const details = { id, empId, ...data };
    this.http.post<{message: string}>("http://localhost:8000/employer/updateJob", details).subscribe(response => {
      const modalRef = this.modalService.open(SuccessComponent);
      modalRef.componentInstance.message = response.message;
    });
  }

  deleteJobDetails(id, empId) {
    const details = { id, empId };
    this.http.post<{message: string}>("http://localhost:8000/employer/deleteJob", details).subscribe(response => {
      const modalRef = this.modalService.open(SuccessComponent);
      modalRef.componentInstance.message = response.message;
    });
  }

  getSingleJob(jobId,candidateId) : Observable<any> {
    const data = `?jobId=${jobId}`;
    return this.http.get<any>("http://localhost:8000/user/getSingleJob/" + data);
  }

  apply4Job(empId,candidateId,jId) : Observable<any> {
    const employerId = empId;
    const userId = candidateId;
    const jobId = jId; 
    return this.http.post<any>("http://localhost:8000/user/apply4Job", { employerId , userId, jobId });
  }
}

