import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAverageComponent } from './graph-average.component';

describe('GraphAverageComponent', () => {
  let component: GraphAverageComponent;
  let fixture: ComponentFixture<GraphAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphAverageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
