import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOrchestratorComponent } from './test-orchestrator.component';

describe('TestOrchestratorComponent', () => {
  let component: TestOrchestratorComponent;
  let fixture: ComponentFixture<TestOrchestratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestOrchestratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestOrchestratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
