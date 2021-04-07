import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAmcCostComponent } from './assets-amc-cost.component';

describe('AssetsAmcCostComponent', () => {
  let component: AssetsAmcCostComponent;
  let fixture: ComponentFixture<AssetsAmcCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsAmcCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsAmcCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
