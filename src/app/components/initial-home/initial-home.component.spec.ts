import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialHomeComponent } from './initial-home.component';

describe('InitialHomeComponent', () => {
  let component: InitialHomeComponent;
  let fixture: ComponentFixture<InitialHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialHomeComponent]
    });
    fixture = TestBed.createComponent(InitialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
