import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,HostListener, Inject } from '@angular/core';
import { FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SignUpService } from '../signUp/sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from 'app/success/success.component';

import { filter } from 'rxjs/operators';
import { ErrorComponent } from 'app/Error/error.component';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

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

    candidateCard = true;
    employerCard = false;
    allowRedirect = true;
    // editmode = false;

    candidateSub: Subscription = new Subscription();
    employerSub: Subscription = new Subscription();
    // profileSub = new Subscription();

    range : string[] = ['0'];
    enableCVUpload = false;
    userId;
    URL = '';
    uploader: FileUploader = new FileUploader({
      url: this.URL,
      itemAlias: 'cv'
    });

    // model: NgbDateStruct;

    // date: { year: number, month: number };
    
    // isWeekend(date: NgbDateStruct) {
    //     const d = new Date(date.year, date.month - 1, date.day);
    //     return d.getDay() === 0 || d.getDay() === 6;
    // }

    // isDisabled(date: NgbDateStruct, current: {month: number}) {
    //     return date.month !== current.month;
    // }
    
    constructor(private fb: FormBuilder,
        private signUpService: SignUpService,
        private toastrService: ToastrService,
        private cd: ChangeDetectorRef,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(LOCAL_STORAGE)private storageService: StorageService) { }

    signUpForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(6)]],
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
        employerPassword: ['',[Validators.required,Validators.maxLength(16),Validators.minLength(6)]],
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

        // const candidateId = this.storageService.get('candidateId');
        // const employerId = this.storageService.get('employerId');

        // if (candidateId) {
        //      this.signUpService.getSingleCandidate(candidateId);    
        //     // this.signUpForm.setValue()
        // }

        // if (employerId) {
        //     this.profileSub = this.signUpService.getSingleEmployer(employerId).subscribe(result => {
        //         const companyName = result.data.companyName;
        //         const officalEmail = result.data.officalEmail;
        //         const employerPassword = "";
        //         const mobileNo = result.data.mobileNo;
        //         const contactPersonName = result.data.contactPersonName;
        //         const companyType = result.data.companyName;
        //         const pincode = result.data.pincode;
        //         const GSTIN = result.data.GSTIN;

        //         const employerDetails = {
        //             companyName,
        //             officalEmail,
        //             employerPassword,
        //             mobileNo,
        //             contactPersonName,
        //             companyType,
        //             pincode,
        //             GSTIN
        //         }
        //         console.log(employerDetails);
        //         this.employerSignUpForm.setValue(employerDetails);
        //     });
        // }

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onErrorItem = (item, res, status, headers) => {
            const modalRef = this.modalService.open(ErrorComponent);
            const result = JSON.parse(res);
            modalRef.componentInstance.name = result.message;
        }

        // this.uploader.onCompleteItem = (item: any, status: any) => {
        //     this.allowRedirect = true;
        //     console.log(this.allowRedirect);
        //     this.toastrService.success('File uploaded!!!');
        //     console.log("File upload" + status);
            
        //     this.router.navigate(['../'], { relativeTo: this.route});
        // }

        
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
        

        this.companyTypeList = this.signUpService.getCompanyTypes();
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
          this.candidateSub =   this.signUpService.signUp(this.signUpForm.value).subscribe((res) => {
                if (res.userId) {
                    this.enableCVUpload = true;
                    this.userId = res.userId;
                    this.URL = `http://localhost:8000/user/signUp/uploadCV/?userId=${this.userId}`;
                    this.cd.markForCheck();
                    this.uploader.setOptions({ url: this.URL });
                    this.allowRedirect = false;

                    const modalRef = this.modalService.open(SuccessComponent);
                    // const result = JSON.parse(res);
                    modalRef.componentInstance.message = res.message;
                    this.signUpForm.reset();
              }   
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
          this.employerSub = this.signUpService.employerSignUp(this.employerSignUpForm.value).subscribe(result => {
                const modalRef = this.modalService.open(SuccessComponent);
                modalRef.componentInstance.message = result.message;
              this.employerSignUpForm.reset();
              this.router.navigate(['/', 'login']);
        });
        }
    }

    toLogin() {
        this.allowRedirect = true;
        this.router.navigate(['/login']);
    }
}
