import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncientArtPage } from './ancient-art.page';

describe('AncientArtPage', () => {
  let component: AncientArtPage;
  let fixture: ComponentFixture<AncientArtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncientArtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncientArtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
