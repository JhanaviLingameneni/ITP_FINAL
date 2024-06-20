import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { color } from 'highcharts';

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
		  { y: 10, name: "Passed", color:'#4CAF50' },
		  { y: 1, name: "Failed", color:'#F44336' },
		  { y: 1, name: "Skipped" , color:'#2196F3'}
		  
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
				{  y: 10, label: "Run1",color:'#4CAF50'},
				{  y: 1, label: "Run2", color:'#4CAF50' },
				{  y: 1, label: "Run3", color:'#4CAF50' }
				
			]
		}, {
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 4, label: "Run1", color:'#F44336'},
				{  y: 0, label: "Run2" ,color:'#F44336'},
				{  y: 36, label: "Run3", color:'#F44336' }
			]
		},
		{
			type: "stackedColumn100",
		
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 16, label: "Run1", color:'#2196F3'},
				{  y: 1, label: "Run2", color:'#2196F3' },
				{  y: 126, label: "Run3" , color:'#2196F3'}
			]
		},
		
		]
	}	

}
