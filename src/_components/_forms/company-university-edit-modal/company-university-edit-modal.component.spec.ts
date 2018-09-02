import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUniversityEditModalComponent } from './company-university-edit-modal.component';

describe('CompanyUniversityEditModalComponent', () => {
  let component: CompanyUniversityEditModalComponent;
  let fixture: ComponentFixture<CompanyUniversityEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUniversityEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUniversityEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
