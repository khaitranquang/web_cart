import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookDetailComponent } from './admin-book-detail.component';

describe('AdminBookDetailComponent', () => {
  let component: AdminBookDetailComponent;
  let fixture: ComponentFixture<AdminBookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
