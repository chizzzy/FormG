import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorPageComponent } from './form-error-page.component';

describe('FormErrorPageComponent', () => {
  let component: FormErrorPageComponent;
  let fixture: ComponentFixture<FormErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
