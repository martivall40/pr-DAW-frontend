import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAllComponent } from './log-all.component';

describe('LogAllComponent', () => {
  let component: LogAllComponent;
  let fixture: ComponentFixture<LogAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
