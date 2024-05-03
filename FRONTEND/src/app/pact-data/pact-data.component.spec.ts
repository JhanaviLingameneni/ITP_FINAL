import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PactDataComponent } from './pact-data.component';

describe('PactDataComponent', () => {
  let component: PactDataComponent;
  let fixture: ComponentFixture<PactDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PactDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PactDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
