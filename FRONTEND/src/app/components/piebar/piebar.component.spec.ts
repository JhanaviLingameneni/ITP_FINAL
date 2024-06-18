import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiebarComponent } from './piebar.component';

describe('PiebarComponent', () => {
  let component: PiebarComponent;
  let fixture: ComponentFixture<PiebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
