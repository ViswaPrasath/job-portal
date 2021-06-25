import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerTableComponent } from './employer-table.component';

describe('EmployerTableComponent', () => {
  let component: EmployerTableComponent;
  let fixture: ComponentFixture<EmployerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
