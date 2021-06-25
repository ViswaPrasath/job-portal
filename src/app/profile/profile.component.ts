import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,HostListener, Inject } from '@angular/core';
import { FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignUpService } from '../signUp/sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from 'app/success/success.component';

import { filter } from 'rxjs/operators';
import { ErrorComponent } from 'app/Error/error.component';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService, StorageService } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    focus;
    focus1;
    focus2;
    focus3;
    focus4;
    focus5;
    focus6;
    focus7;
    focus8;
    focus9;
    focus10;
    focus11;
    focus12;
    focus13;
    focus14;
    focus15;
    focus16;
    focus17;
    focus18;
    focus19;
    focus20;
    focus21;
    focus22;
    focus23;

    candidateCard = false;
    employerCard = false;
    allowRedirect = true;

    candidateSub: Subscription = new Subscription();
    employerSub: Subscription = new Subscription();

    range : string[] = ['0'];
    enableCVUpload = false;
    userId;
    URL = '';
    uploader: FileUploader = new FileUploader({
      url: this.URL,
      itemAlias: 'cv'
    });

    
    constructor(private fb: FormBuilder,
        private signUpService: SignUpService,
        private toastrService: ToastrService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(LOCAL_STORAGE) private storageService: StorageService,
        private http: HttpClient) { }

    signUpForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        DOB: ['',[ Validators.required, Validators.pattern(/^[0-9][0-9]-[0-9][0-9]-[0-9]{4}$/)]],
        jobTitle: ['',[Validators.required]],
        gender: ['',[Validators.required, Validators.maxLength(1)]],
        description: [''],
        email: ['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
        phoneNo: ['',[Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
        address: ['',[Validators.required]],
        education: this.fb.array([
            this.fb.group({
                title: ['',[Validators.required]],
                institute: ['',[Validators.required]],
                degree: ['',[Validators.required]],
                year: ['',[Validators.required,Validators.pattern(/^[0-9]{4}-[0-9]{4}$/)]]
            }) 
        ]),
        skill: this.fb.array([
            this.fb.group({
                technology: ['',[Validators.required]],
                percentage: ['0']
            })
        ]),
        socialLinks: this.fb.group({
            facebook: [''],
            linkedIn: [''],
            instagram:['']
        }),
        cv: [null]
    });

    employerSignUpForm = this.fb.group({
        companyName: ['', [Validators.required]],
        officalEmail: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
        mobileNo: ['', [Validators.required, Validators.maxLength(11),Validators.minLength(11)]],
        contactPersonName: ['', [Validators.required]],
        companyType: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        GSTIN: ['', [Validators.maxLength(15)]]
    });

    companyTypeList = [];

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander() {
        // or directly false
        event.returnValue = !this.allowRedirect;
        return !this.allowRedirect;
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('bg-warning');

        
        this.fetchCandidate();
        this.fetchEmployer();
        
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onErrorItem = (item, res, status, headers) => {
            const modalRef = this.modalService.open(ErrorComponent);
            const result = JSON.parse(res);
            modalRef.componentInstance.name = result.message;
        }

        
        this.uploader.response.subscribe(res => {
            const result = JSON.parse(res);
            if (result.status == 200) {
                this.allowRedirect = true;
                this.toastrService.success('File uploaded!!!');
                this.router.navigate(['../'], { relativeTo: this.route });
            }
        }, (err) => {
                console.log("Error :" + err);
        });
      
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('bg-warning');

        this.allowRedirect = true;
        this.employerSub.unsubscribe();
        this.candidateSub.unsubscribe();

    }

    fetchCandidate() {
        const candidateId = this.storageService.get('candidateId');
        if (candidateId) {
            this.URL = `http://localhost:8000/user/signUp/uploadCV/?userId=${candidateId}`;
            this.uploader.setOptions({ url: this.URL });
            this.candidateCard = true;
            this.candidateSub = this.signUpService.getSingleCandidate(candidateId).subscribe(result => {
                
                // console.log(result);
                this.signUpForm.get('name').setValue(result.data.name);
                this.signUpForm.get('DOB').setValue(result.data.DOB);
                this.signUpForm.get('jobTitle').setValue(result.data.jobTitle);
                this.signUpForm.get('gender').setValue(result.data.gender);
                this.signUpForm.get('description').setValue(result.data.description);
                this.signUpForm.get('email').setValue(result.data.email);
                this.signUpForm.get('phoneNo').setValue(result.data.phoneNo);
                this.signUpForm.get('address').setValue(result.data.address);
                
                let edu = result.data.education;
                this.education.removeAt(0);
                edu.forEach(element => {
                    this.education.push(this.fb.group(element));
                });
                
                let ski = result.data.skill;
                this.range.splice(0, 1);
                this.skill.removeAt(0);
                ski.forEach(element => {
                    // console.log(element.percentage);
                    this.range.push(element.percentage);
                    this.skill.push(this.fb.group(element));
                });
                
                this.signUpForm.get('socialLinks.facebook').setValue(result.data.socialLinks.facebook);
                this.signUpForm.get('socialLinks.linkedIn').setValue(result.data.socialLinks.linkedIn);
                this.signUpForm.get('socialLinks.instagram').setValue(result.data.socialLinks.instagram);
                this.signUpForm.get('cv').setValue(result.data.cv);
            });
        }
    }

    fetchEmployer() {
        const employerId = this.storageService.get('employerId');
        if (employerId) {
              this.companyTypeList = this.signUpService.getCompanyTypes();
              this.employerCard = true;
              this.employerSub = this.signUpService.getSingleEmployer(employerId).subscribe(result => {
              this.employerSignUpForm.setValue(result.data);
           });
        }
    }

    // getter to get the value in the template 
    get name() {
        return this.signUpForm.get('name');
    }

    get password() {
        return this.signUpForm.get('password');
    }

    get DOB() {
        return this.signUpForm.get('DOB');
    }

    get jobTitle() {
        return this.signUpForm.get('jobTitle');
    }
    
    get gender() {
        return this.signUpForm.get('gender');
    }

    get description() {
        return this.signUpForm.get('description');
    }

    get email() {
        return this.signUpForm.get('email');
    }

    get address() {
        return this.signUpForm.get('address');
    }

    get phoneNo() {
        return this.signUpForm.get('phoneNo');
    }

    get facebook() {
        return this.signUpForm.get('socialLinks.facebook');
    }

    get linkedIn() {
        return this.signUpForm.get('socialLinks.linkedIn');
    }

    get instagram() {
        return this.signUpForm.get('socialLinks.instagram');
    }
    
    get education() {
        return this.signUpForm.get('education') as FormArray;
      }  

    get skill() {
        return this.signUpForm.get('skill') as FormArray;
    }

    addEducation() {
        const education = {
            title: [''],
            institute: [''],
            degree: [''],
            year: ['']
        };

       this.education.push(this.fb.group(education));
    }

    deleteEducation(index:number) {
        this.education.removeAt(index);
    }

    addSkill() {
        const skill = {
            technology: [''],
            percentage: ['']
        };

        this.range.push('0');
        this.skill.push(this.fb.group(skill));
    }

    deleteSkill(index: number) {
        this.skill.removeAt(index);
    } 

    signUpFormSubmit()
    {
        if (this.signUpForm.valid) {
          this.candidateSub =   this.signUpService.updateCandidateDetails(this.signUpForm.value).subscribe((res) => {
                  const modalRef = this.modalService.open(SuccessComponent);
                //   const result = JSON.parse(res);
                  modalRef.componentInstance.message = res.message;
                //   this.signUpForm.reset();
                // this.router.navigate(['../'], { relativeTo: this.route });
              this.fetchCandidate();
          });
        }    
    }

    allowedType = true;
    FILE_TYPE = {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
        "application/pdf": ".pdf"
    }

    fileSelected(event) {
        if (!this.FILE_TYPE[event[0].type]) {
            this.allowedType = true;
            console.log(this.FILE_TYPE[event[0].type]);
        } else {
            this.allowedType = false;
        }
    }

    downloadCV() {
        const file = this.signUpForm.get('cv').value;
        const path = file.split('/');
        // console.log(path[4]);
        this.http.get(`http://localhost:8000/user/download/cv/${path[4]}`,{responseType: "blob"}).subscribe(res => {
            saveAs(res,path[4]);
        });
    }

    get companyName() {
        return this.employerSignUpForm.get('companyName');
    }

    get officalEmail() {
        return this.employerSignUpForm.get('officalEmail');
    }

    get employerPassword() {
        return this.employerSignUpForm.get('employerPassword');
    }

    get mobileNo() {
        return this.employerSignUpForm.get('mobileNo');
    }

    get contactPersonName() {
        return this.employerSignUpForm.get('contactPersonName');
    }

    get companyType() {
        return this.employerSignUpForm.get('companyType');
    }

    get pincode() {
        return this.employerSignUpForm.get('pincode');
    }

    get GSTIN() {
        return this.employerSignUpForm.get('GSTIN');
    }

    employerSignUpFormSubmit() {
        if (this.employerSignUpForm.valid) {
          this.employerSub = this.signUpService.updateEmployerDetails(this.employerSignUpForm.value).subscribe(result => {
                const modalRef = this.modalService.open(SuccessComponent);
              modalRef.componentInstance.message = result.message;
            this.fetchEmployer();
            });
        }
    }

    toLogin() {
        this.allowRedirect = true;
        this.router.navigate(['/login']);
    }
}
