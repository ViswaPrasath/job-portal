import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../user.model';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {

   ngOnInit() {
     this.getUser();
  }

  page = 1;
  pageSize = 4;
  users: any[];
  userSub: Subscription = new Subscription();
  sampleData = [];
  collectionSize = this.sampleData.length;
  
  constructor(private userService: UserService) {
    this.refreshCountries();
  }

  getUser() {
    this.userSub = this.userService.getUsers().subscribe(result => {
      this.sampleData = result.result as UserModel[];
      this.collectionSize = this.sampleData.length;
     this.refreshCountries();
    });
  }

  refreshCountries() {
    this.users = this.sampleData
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

ngOnDestroy(): void {
  this.userSub.unsubscribe();
}
}
