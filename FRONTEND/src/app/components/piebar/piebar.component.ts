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
				{  y: 10, label: "Run1",color:'#4CAF50', name:"Passed"},
				{  y: 4, label: "Run2", color:'#4CAF50',name:"Passed" },
				{  y: 16, label: "Run3", color:'#4CAF50', name:"Passed" },
				{  y: 15, label: "Run4", color:'#4CAF50', name:"Passed" },
				{  y: 14, label: "Run5", color:'#4CAF50', name:"Passed" },
				{  y: 6, label: "Run6", color:'#4CAF50' , name:"Passed"},
				{  y: 16, label: "Run7", color:'#4CAF50' ,name:"Passed"},
				{  y: 6, label: "Run8", color:'#4CAF50' , name:"Passed"},
				{  y: 4, label: "Run9", color:'#4CAF50', name:"Passed" },
				{  y: 7, label: "Run10", color:'#4CAF50', name:"Passed" },

				
			]
		}, {
			type: "stackedColumn100",
			
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				
				{  y: 1, label: "Run1", color:'#F44336', name:"Failed" },
				{  y: 0, label: "Run2", color:'#F44336', name:"Failed" },
				{  y: 1, label: "Run3", color:'#F44336', name:"Failed" },
				{  y: 1, label: "Run4", color:'#F44336', name:"Failed" },
				{  y: 2, label: "Run5", color:'#F44336', name:"Failed" },
				{  y: 4, label: "Run6", color:'#F44336', name:"Failed" },
				{  y: 0, label: "Run7", color:'#F44336' , name:"Failed"},
				{  y: 4, label: "Run8", color:'#F44336', name:"Failed" },
				{  y: 16, label:"Run9", color:'#F44336', name:"Failed" },
				{  y: 1, label: "Run10", color:'#F44336', name:"Failed" },
				
				
			]
		},
		{
			type: "stackedColumn100",
		
			
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 1, label: "Run1", color:'#2196F3', name:'Skipped' },
				{  y: 36, label: "Run2", color:'#2196F3', name:'Skipped' },
				{  y: 126, label: "Run3", color:'#2196F3', name:'Skipped' },
				{  y: 127, label: "Run4", color:'#2196F3', name:'Skipped' },
				{  y: 127, label: "Run5", color:'#2196F3', name:'Skipped' },
				{  y: 25, label: "Run6", color:'#2196F3', name:'Skipped' },
				{  y: 0, label: "Run7", color:'#2196F3' ,name:'Skipped'},
				{  y: 30, label: "Run8", color:'#2196F3' , name:'Skipped'},
				{  y: 0, label: "Run9", color:'#2196F3', name:'Skipped' },
				{  y: 0, label: "Run10", color:'#2196F3', name:'Skipped' },
				
			]
		}
		
		
		]
	}	

}
