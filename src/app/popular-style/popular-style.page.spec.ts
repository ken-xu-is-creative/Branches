import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularStylePage } from './popular-style.page';

describe('PopularStylePage', () => {
  let component: PopularStylePage;
  let fixture: ComponentFixture<PopularStylePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularStylePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularStylePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
