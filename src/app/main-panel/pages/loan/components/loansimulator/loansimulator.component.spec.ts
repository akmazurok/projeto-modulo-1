import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansimulatorComponent } from './loansimulator.component';

describe('LoansimulatorComponent', () => {
  let component: LoansimulatorComponent;
  let fixture: ComponentFixture<LoansimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
