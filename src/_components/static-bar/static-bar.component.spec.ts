import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticBarComponent } from './static-bar.component';

describe('StaticBarComponent', () => {
  let component: StaticBarComponent;
  let fixture: ComponentFixture<StaticBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
