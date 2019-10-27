import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigsPage } from './configs.page';

describe('ConfigsPage', () => {
  let component: ConfigsPage;
  let fixture: ComponentFixture<ConfigsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
