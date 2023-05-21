import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPlaceComponent } from './config-place.component';

describe('ConfigPlaceComponent', () => {
  let component: ConfigPlaceComponent;
  let fixture: ComponentFixture<ConfigPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
