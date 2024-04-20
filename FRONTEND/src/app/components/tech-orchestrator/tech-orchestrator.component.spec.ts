import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechOrchestratorComponent } from './tech-orchestrator.component';

describe('TechOrchestratorComponent', () => {
  let component: TechOrchestratorComponent;
  let fixture: ComponentFixture<TechOrchestratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechOrchestratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechOrchestratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
