import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup , Validators,FormBuilder} from '@angular/forms';
import { JobListService } from 'app/job-list/job-list.service';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SuccessComponent } from 'app/success/success.component';

@Component({
    templateUrl: './job-detail.component.html',
    styles: [`.form-container>p {
        margin: 10px;
    }`]
})
export class JobDetailComponent implements OnInit, OnDestroy{
    @Input() userId;
    @Input() jobId;
    jobForm : FormGroup;
    singleJobDataSub: Subscription = new Subscription();
    apply4JobSub: Subscription = new Subscription();

    constructor(private fb: FormBuilder,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private jobService: JobListService,
        @Inject(LOCAL_STORAGE) private storage: StorageService) { 
    }

    ngOnInit(): void {
        this.jobForm = this.fb.group({
            companyName: ['', Validators.required],
            jobTitle: ['', Validators.required],
            jobCategory: ['', Validators.required],
            jobType: ['', Validators.required],
            salary: ['', Validators.required],
            location: ['', Validators.required],
            vacancies: ['', Validators.required],
            jobDescription: ['', Validators.required]
        });
        this.getDetails();
    }
  
    getDetails() {
       this.singleJobDataSub =  this.jobService.getSingleJob(this.jobId, this.userId).subscribe(res => {
            const transData = {
              "companyName": res.result.companyName,
              "jobCategory": res.result.jobCategory,
              "jobDescription": res.result.jobDescription,
              "jobTitle": res.result.jobTitle,
              "jobType": res.result.jobType,
              "salary": res.result.salary,
              "location": res.result.location,
              "vacancies": res.result.vacancies,
            }
           this.jobForm.setValue(transData);
           this.storage.set('jP', res.result.employerId);
           this.storage.set('jID', res.result._id);
        });
    }

    apply4Job() {
        const employerId = this.storage.get('jP');
        const candidateId = this.storage.get('candidateId');
        const jobID = this.storage.get('jID');
        this.apply4JobSub =  this.jobService.apply4Job(employerId, candidateId, jobID).subscribe(res => {
            console.log(res);
            const ref = this.modalService.open(SuccessComponent);
            ref.componentInstance.message = "Applied Successfully!!!"
        });
    }
    
    ngOnDestroy() {
        this.singleJobDataSub.unsubscribe();
        this.apply4JobSub.unsubscribe();
        this.storage.remove('jP');
        this.storage.remove('jID');
    }

}