import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDeviceComponent } from './log-device.component';

describe('LogDeviceComponent', () => {
  let component: LogDeviceComponent;
  let fixture: ComponentFixture<LogDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
