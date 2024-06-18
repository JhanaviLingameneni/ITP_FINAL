import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-piebar',
  templateUrl: './piebar.component.html',
  styleUrl: './piebar.component.css',
 
})
export class PiebarComponent {
  chartOptions = {
	  animationEnabled: true,
	  title:{
		
	  },
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 10, name: "Passed" },
		  { y: 1, name: "Failed" },
		  { y: 0, name: "Pending" },
		  { y: 1, name: "Skipped" }
		  
		]
	  }]
	}	
	columnChartOptions = {
		animationEnabled: true,
		exportEnabled: true,
		title:{
			  
		},
		axisX:{
			title: "Runs"
		},
		axisY:{
			title: "Percentage"
		},
		toolTip:  {
			shared: true
		},
		legend: {
			horizontalAlign: "right",
			verticalAlign: "center",
			reversed: true        
		},
		data: [{
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 10, label: "Run1"},
				{  y: 1, label: "Run2" },
				{  y: 0, label: "Run3" },
				{  y: 1, label: "Run4" }
				
			]
		}, {
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 4, label: "Run1"},
				{  y: 0, label: "Run2" },
				{  y: 0, label: "Run3" },
				{  y: 36, label: "Run4" }
			]
		},
		{
			type: "stackedColumn100",
		
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 16, label: "Run1"},
				{  y: 1, label: "Run2" },
				{  y: 0, label: "Run3" },
				{  y: 126, label: "Run4" }
			]
		},
		{
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 15, label: "Run1"},
				{  y: 1, label: "Run2" },
				{  y: 0, label: "Run3" },
				{  y: 127, label: "Run4" }
			]
		},
		{
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 14, label: "Run1"},
				{  y: 2, label: "Run2" },
				{  y: 0, label: "Run3" },
				{  y: 127, label: "Run4" }
			]
		},
		{
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 6, label: "Run1"},
				{  y: 4, label: "Run2" },
				{  y: 0, label: "Run3" },
				{  y: 25, label: "Run4" }
			]
		}
		]
	}	

}
