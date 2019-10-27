import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtdMoradoresPage } from './qtd-moradores.page';

describe('QtdMoradoresPage', () => {
  let component: QtdMoradoresPage;
  let fixture: ComponentFixture<QtdMoradoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtdMoradoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtdMoradoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
