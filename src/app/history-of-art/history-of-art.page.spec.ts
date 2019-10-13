import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfArtPage } from './history-of-art.page';

describe('HistoryOfArtPage', () => {
  let component: HistoryOfArtPage;
  let fixture: ComponentFixture<HistoryOfArtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfArtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfArtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
