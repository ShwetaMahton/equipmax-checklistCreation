import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartLineChartComponent } from './bar-chart-line-chart.component';

describe('BarChartLineChartComponent', () => {
  let component: BarChartLineChartComponent;
  let fixture: ComponentFixture<BarChartLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
