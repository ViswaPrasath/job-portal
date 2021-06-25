import { Component, OnInit, Inject,OnDestroy, ChangeDetectorRef } from '@angular/core';
import { StorageService,LOCAL_STORAGE} from 'ngx-webstorage-service';
import { Router, NavigationStart } from '@angular/router';
import { JobService } from '../job.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDetailComponent } from 'app/job-detail/job-detail.component';

@Component({
    selector: 'app-components',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy{  

    isCandidate = false;
    pageSizeOptions = [2,5,10,20];
    totalJob = 0;
    jobPerPage = 2;
    currentPage = 1;
    pageSub: Subscription = new Subscription();
    
    ngOnInit() {
         
        this.pageSub = this.jobService.getJob(this.jobPerPage, this.currentPage).subscribe(res => {
            this.recentJobs = res.jobs;
            this.totalJob = res.maxPost;
        });

        

    }


    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
        private router: Router,
        private jobService: JobService,
        private modalService: NgbModal,
        private cdRef: ChangeDetectorRef) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    if (this.storage.get('candidateId') != undefined)
                    {
                        console.log("check");
                        this.cdRef.detach();
                        this.isCandidate = true;
                        this.cdRef.detectChanges();
                    }   
                }
            });    
    
            if (this.storage.get('candidateId') != undefined)
            {
                console.log("check");
                this.isCandidate = true;
            }   
     }
    
    recentJobs:[] = [];

    apply4job(event) {
        const userId = this.storage.get('candidateId');
        // console.log(event.getAttribute('id'), userId);
        const modalRef = this.modalService.open(JobDetailComponent);
        modalRef.componentInstance.userId = userId;
        modalRef.componentInstance.jobId = event.getAttribute('id');
    }

    changePage(event: PageEvent) {
        this.jobPerPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.pageSub = this.jobService.getJob(this.jobPerPage, this.currentPage).subscribe(res => {
            this.recentJobs = res.jobs;
            this.totalJob = res.maxPost;
        })  
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.pageSub.unsubscribe();
    }
}
