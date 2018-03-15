import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAdminUsersComponent } from './global-admin-users.component';

describe('GlobalAdminUsersComponent', () => {
  let component: GlobalAdminUsersComponent;
  let fixture: ComponentFixture<GlobalAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
