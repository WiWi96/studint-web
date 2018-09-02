import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditModalComponent } from './company-edit-modal.component';

describe('CompanyEditModalComponent', () => {
  let component: CompanyEditModalComponent;
  let fixture: ComponentFixture<CompanyEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
