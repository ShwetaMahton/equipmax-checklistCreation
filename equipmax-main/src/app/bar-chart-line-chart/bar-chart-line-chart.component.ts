import { Component, OnInit } from '@angular/core';
import {Chart, ChartOptions, ChartType} from 'chart.js';
import { ActivatedRoute , Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-bar-chart-line-chart',
  templateUrl: './bar-chart-line-chart.component.html',
  styleUrls: ['./bar-chart-line-chart.component.scss']
})
export class BarChartLineChartComponent implements OnInit {
  static class: string;
  

  constructor() { }

  ngOnInit(): void {
  }

}
