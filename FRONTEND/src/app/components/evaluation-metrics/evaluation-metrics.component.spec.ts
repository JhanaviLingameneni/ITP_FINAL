import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationMetricsComponent } from './evaluation-metrics.component';

describe('EvaluationMetricsComponent', () => {
  let component: EvaluationMetricsComponent;
  let fixture: ComponentFixture<EvaluationMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationMetricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
