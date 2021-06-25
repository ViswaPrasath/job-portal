import { Component, OnInit, OnDestroy } from '@angular/core';
import { employerModel } from '../employer.model';
import { EmployerService } from '../service/employer.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-employer-table',
  templateUrl: './employer-table.component.html',
  styleUrls: ['./employer-table.component.scss']
})
export class EmployerTableComponent implements OnInit,OnDestroy {

  ngOnInit(): void {
    this.getDetail();
  }

  page = 1;
  pageSize = 4;
  
  employers: any[];
  
  data  = [];
  detailsSub: Subscription = new Subscription();
  collectionSize = this.data.length;

  constructor(private employerService:EmployerService) {
    this.refreshCountries();
  }

  getDetail() {
    this.detailsSub = this.employerService.getDetails().subscribe(result => {
      this.data = result.result as employerModel[];
      this.collectionSize = this.data.length;
      this.refreshCountries();
    });
  }
  refreshCountries() {
    console.log(this.page, this.pageSize);
    this.employers = this.data
      .map((country, i) => ({ id: i + 1, ...country }));
    this.employers = this.employers.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    // console.log(this.employers.slice(1,2));
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
  }
}
