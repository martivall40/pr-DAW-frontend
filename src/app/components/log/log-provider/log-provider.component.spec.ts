import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogProviderComponent } from './log-provider.component';

describe('LogProviderComponent', () => {
  let component: LogProviderComponent;
  let fixture: ComponentFixture<LogProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
