import { Injectable, Inject } from '@angular/core';
import { jobPostModel } from './job-post.model';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class JobPostService {

    constructor(private http:HttpClient,@Inject(LOCAL_STORAGE) private storageService: StorageService){}
    addPost(postDetails: jobPostModel) : Observable<any> {
        let data = {};
        if (this.storageService.has('userId'))
        {
            data = {
                ...postDetails,
                userId: this.storageService.get('userId')
            }           
        }
        if (this.storageService.has('employerId'))
        {
            data = {
                ...postDetails,
                employerId: this.storageService.get('employerId')
            }   
            }
        return this.http.post('http://localhost:8000/employer/addJobPost', data);
    }
} 