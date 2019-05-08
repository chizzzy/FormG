import {Component, Input, OnInit} from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import pieChartOptions from '../../../shared/pie-chart-options'
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() question;
  public availableColors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,55,0.3)', 'rgba(255,0,55,0.3)',
    'rgba(55,255,0,0.3)', 'rgba(55,255,55,0.3)', 'rgba(30,255,30,0.3)']
  public pieChartOptions = pieChartOptions;
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];

  constructor() { }

  ngOnInit() {
    this.pieChartOptions.legend.position = 'right';
    this.question.options.forEach((option, index) => {
      let positiveResponses = 0;
      this.question.answers.forEach(answer => {
        if (answer[option.id] == true) {
          positiveResponses++;
        }
      });
      this.addSlice(option.title, positiveResponses, index);
    });
  }

  addSlice(title, positiveResponses, index) {
    this.pieChartLabels.push(title);
    this.pieChartData.push(positiveResponses);
    this.pieChartColors[0].backgroundColor.push(this.availableColors[index]);
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
}
