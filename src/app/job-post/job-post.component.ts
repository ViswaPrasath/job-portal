import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JobPostService  } from './job-post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from '../success/success.component';
import { ErrorComponent } from 'app/Error/error.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SignUpService } from '../signUp/sign-up.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit,OnDestroy {

  addPostSub: Subscription = new Subscription();

  focus1 = false;
  focus2 = false;
  focus3 = false;
  focus4 = false;
  focus5 = false;
  focus6 = false;
  focus7 = false;
  focus8 = false;
  jobCategoryList = [];

  jobPostForm: FormGroup;

  constructor(private fb: FormBuilder,
    private jobPostService: JobPostService,
    private modelService: NgbModal,
    private router: Router,
    private signUpService: SignUpService) { }

  ngOnInit(): void {
    this.jobPostForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobType: ['', Validators.required],
      companyName: ['', Validators.required],
      salary: ['', Validators.required],
      vacancies: ['', Validators.required],
      location: ['', Validators.required],
      jobCategory: ['', Validators.required],
      jobDescription: ['', Validators.required]
    });

    this.jobCategoryList = this.signUpService.getCompanyTypes();
  }

  get jobTitle() {
    return this.jobPostForm.get('jobTitle');
  }

  get jobCategory() {
    return this.jobPostForm.get('jobCategory');
  }

  get companyName() {
    return this.jobPostForm.get('companyName');
  }

  get vacancies() {
    return this.jobPostForm.get('vacancies');
  }

  get location() {
    return this.jobPostForm.get('location');
  }

  get jobType() {
    return this.jobPostForm.get('jobType');
  }

  
  get salary() {
    return this.jobPostForm.get('salary');
  }

  get jobDescription() {
    return this.jobPostForm.get('jobDescription');
  }

  jobPostFormSubmit() {
    if (this.jobPostForm.valid) {
     this.addPostSub =  this.jobPostService.addPost(this.jobPostForm.value).subscribe(data => {
        const modalRef = this.modelService.open(SuccessComponent);
        const result = data;
       modalRef.componentInstance.name = result.message;
       this.jobPostForm.reset();
     }, err => {
          const errorRef = this.modelService.open(ErrorComponent);
          const result = JSON.parse(err);
          errorRef.componentInstance.name = result.message;
      });      
    }
  }
  
  ngOnDestroy(): void {
    this.addPostSub.unsubscribe();
  }
}
