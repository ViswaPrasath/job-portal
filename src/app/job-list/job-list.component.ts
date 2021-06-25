import { Component, OnInit, ViewChild, QueryList, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder,Validators, FormGroup, FormControl } from '@angular/forms';
import { JobListService } from './job-list.service';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit,AfterViewInit {

  jobForm : FormGroup;
  jobListSub: Subscription = new Subscription();
  jobs = [];
  selectedCategory;

  @ViewChild('jobRef') private jobsRef: QueryList<ElementRef>;
  @ViewChild('updateBtn') private updateBtn: any;
  @ViewChild('deleteBtn') private deleteBtn: any;
  @ViewChild('fullTime') private fullTime: any;
  @ViewChild('partTime') private partTime: any;

  constructor(private fb: FormBuilder,
              private jobListService: JobListService,
              @Inject(LOCAL_STORAGE) private storageService: StorageService) { 
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

    this.jobListSub = this.jobListService.getJob().subscribe(data => {
      this.jobs = data.data;
    });
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateBtn._disabled = true;
      this.deleteBtn._disabled = true;
    }, 0);
  }

  updateJob(btn) {
    const id = btn._elementRef.nativeElement.getAttribute("data-id");
    const value = this.jobForm.value;
    console.log(value);
    const empId = this.storageService.get('employerId');
    this.jobListService.updateJobDetails(id, empId, value);
  }

  deleteJob(btnRef) {
    const id = btnRef._elementRef.nativeElement.getAttribute("data-id");
    const empId = this.storageService.get('employerId');
    this.jobListService.deleteJobDetails(id, empId);
    this.jobForm.reset();
  }

  loadData(job,index) {
    console.log(index);
    this.jobs.map((ele,i) => {
      if (ele._id == index._id)
      {
        this.updateBtn._elementRef.nativeElement.setAttribute("data-id", ele._id);
        this.deleteBtn._elementRef.nativeElement.setAttribute("data-id", ele._id);
        this.selectedCategory = ele.jobType;

        this.jobForm.setValue({
          companyName: this.jobs[i].companyName,
          jobCategory: this.jobs[i].jobCategory,
          jobDescription: this.jobs[i].jobDescription,
          jobTitle: this.jobs[i].jobTitle,
          jobType: this.jobs[i].jobType,
          location: this.jobs[i].location,
          salary: this.jobs[i].salary,
          vacancies: this.jobs[i].vacancies
        });
        const jobType = this.jobs[i].jobType;
        if (jobType == "Full-Time")
        {
          this.fullTime._checked = true;
          this.partTime._checked = false;
        } else if (jobType == "Part-Time") {
          this.fullTime._checked = false;
          this.partTime._checked = true;
        } 
        this.updateBtn._disabled = false;
        this.deleteBtn._disabled = false;
      }
    });
    
  }

}
