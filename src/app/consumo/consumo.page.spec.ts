import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoPage } from './consumo.page';

describe('ConsumoPage', () => {
  let component: ConsumoPage;
  let fixture: ComponentFixture<ConsumoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
