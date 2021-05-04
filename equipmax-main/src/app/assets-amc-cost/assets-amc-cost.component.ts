import { Component, OnInit, ElementRef } from '@angular/core';
import {Chart, ChartOptions, ChartType} from 'chart.js';
import { ActivatedRoute , Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import { endWith } from 'rxjs/operators';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

// import {Label } from 'ng2-charts';  

@Component({
  selector: 'app-assets-amc-cost',
  templateUrl: './assets-amc-cost.component.html',
  styleUrls: ['./assets-amc-cost.component.scss']
  
})

export class AssetsAmcCostComponent implements OnInit {
chart:any;
lineChart: any;
lineCharts: any;
pieChart: any;
poolCost:number;
items=[];
Items1=[];
p: number=1;
length=0;
lengths=0;
  pageSize = 5;  
  finalLabel :any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  // MatPaginator Output
  pageEvent: PageEvent;
  pageEvents: PageEvent;

  pageItems = 10;

  constructor(private router: Router,private webservice: WebRequestService,private elementRef: ElementRef) {
    
   }

  ngOnInit(): void {

    this.webservice.getassetamc().subscribe(value =>{    
      this.items=value;  
      this.lengths=value.length;
      console.log("data",value);
    
        let labelValue = []
        let itemCost = []
        let amcCost = []
      //  let difference = []
     var labelLength = 8
    
  for(let i=0; i< this.pageSize; i++){
    itemCost.push(value[i].itemcost);
    amcCost.push(value[i].amccost);
    labelValue.push(value[i].AssetID);
   // difference.push(value[i].difference);
  }
 //First Chart
let htmlRef = this.elementRef.nativeElement.querySelector(`#chartContainer`);
if(this.lineChart != undefined) {
  while (this.lineChart.data.datasets.length > 0) {
    this.lineChart.data.datasets.pop();
  }
}
// this.lineChart.destroy();
// {}
//this.assetstatus = data;
this.lineChart = new Chart(htmlRef, {
  type: 'bar',
  data: {
    datasets: [
      {
        //data: [25, 40, 35],
        label: "Assets Cost",
        data: itemCost,
        backgroundColor: '#63FF84',
             fill:false
           },
           {
             label:"AMC Costs",
            data: amcCost,
            backgroundColor: '#40E0D0',
            fill:false
          },
         
    ],
    labels: labelValue,
  },
  options: {
    title: {
      fullWidth: true,
      fontSize:15,
      padding: 50,
          display: true,
          text: 'AmcCost-AssetsCost Comparison Chart',
          
      },
  
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#000080',
      },
    },
    responsive: true,
    // hover: {mode: null},
    scales: {
      xAxes: [{
        ticks: {
          display: false
   },
        gridLines:{
          drawBorder:true,
          drawOnChartArea:false
        },
      }],
      yAxes: [{
        gridLines:{
          drawBorder:true,
          drawOnChartArea:false
        },
          ticks: {
              beginAtZero: false,
               //max value for the chart is 60  
              }
          }
      ]},
    maintainAspectRatio: false,
  },
});
}) 

//Second Chart
this.webservice.getAssetcostDepreciatecostChart().subscribe(value =>{
  this.Items1=value;  
  this.length=value.length;
  console.log("data",value);

    let labelValues = []
    let itemCosts = []
    let depreciateCost = []
  //  let difference = []

for(let i=0; i< this.pageSize; i++){
itemCosts.push(value[i].before_cost);
depreciateCost.push(value[i].after_depreciation_cost);
labelValues.push(value[i].poolAssetID);
// difference.push(value[i].difference);
}


let htmlRefs = this.elementRef.nativeElement.querySelector(`#chartContainers`);
 if(this.lineCharts != undefined) {
  while (this.lineCharts.data.datasets.length > 0) {
    this.lineCharts.data.datasets.pop();
  }
}
// this.lineChart.destroy();
// {}
this.lineCharts = new Chart(htmlRefs, {
  type: 'bar',
  data: {
    datasets: [
      {
        //data: [25, 40, 35],
        label: "Assets Cost",
        data: itemCosts,
        backgroundColor: '#63FF84',
             fill:false
           },
           {
           // data: [88, 80, 15],
            label:"Depreciated Costs",
            data: depreciateCost,
            backgroundColor: '#EE82EE',
            fill:false
          },
          // {
          //   data: difference,
          //   backgroundColor: '#6970d5',
          //   fill:false
          // },
       // backgroundColor: ['#FF6384', '#63FF84'],
      //},
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: labelValues,
  },
  options: {
    title: {
      fullWidth: true,
      fontSize:15,
      padding: 50,
      display: true,
      text: 'Depreciated-AssetsCost Comparison Chart',
      
  },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#000080',
      },
    },
    responsive: true,
    // hover: {mode: null},
    scales: {
      xAxes: [{
        ticks: {
          display: false
   },
        gridLines:{
          drawBorder:true,
          drawOnChartArea:false
        },
      }],
      yAxes: [{
        gridLines:{
          drawBorder:true,
          drawOnChartArea:false
        },
          ticks: {
              beginAtZero: false,
               //max value for the chart is 60  
              }
          }
      ]},
    maintainAspectRatio: false,
  },
});
}) 

///Third PIE Chart *****************

this.webservice.getAssetLifeCycle().subscribe(value =>{ 
  this.length=value.length;
  console.log("data",value);

    
    let Expired_Life = []
    let Life_in_range = []
    let  Life_not_Reached = []
  //  let difference = []


  
  Expired_Life.push(value[0].Expired_Life);
  Life_in_range.push(value[0]. Life_within_Range);
  Life_not_Reached.push(value[0].Life_not_Reached);
// difference.push(value[i].difference);
console.log("Life_in_range",Life_in_range);
console.log("Expired_Life",Expired_Life);


let htmlRefs = this.elementRef.nativeElement.querySelector(`#chartPie`);

this.pieChart = new Chart(htmlRefs, {
  type: 'pie',
  data: {
    datasets: [
      {
        //data: [25, 40, 35],
        label: "Lifespan Expired",
        data: [Expired_Life,Life_in_range, Life_not_Reached],
        backgroundColor: ['rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'],
             fill:false
           },
          //  {
          //  // data: [88, 80, 15],
          //   label:"Lifespan Within Range",
          //   data: [55,22,77],
          //   backgroundColor: '#EE82EE',
          //   fill:false
          // },
          // {
          //   //data: [25, 40, 35],
          //   label: "Lifespan not Reached",
          //   data: [88,50,60],
          //   backgroundColor: '#63hbjb',
          //        fill:false
          //      },
          // {
          //   data: difference,
          //   backgroundColor: '#6970d5',
          //   fill:false
          // },
       // backgroundColor: ['#FF6384', '#63FF84'],
      //},
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Lifespan Expired", "Lifespan Within Range", "Lifespan not Reached" ],
  },
  options: {
    title: {
      fullWidth: true,
      fontSize:15,
      padding: 50,
      display: true,
      text: 'LifeCycle Of Assets',
      
  },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#000080',
      },
    },
    responsive: true,
    // hover: {mode: null},
    scales: {
      xAxes: [{
        ticks: {
          display: false
   },
        gridLines:{
          display: false,
          drawBorder:true,
          drawOnChartArea:false
        },
      }],
      yAxes: [{
        gridLines:{
          display: false,
          drawBorder:true,
          drawOnChartArea:false
        },
          ticks: {
            display: false,
              beginAtZero: false,
               //max value for the chart is 60  
              }
          }
      ]},
    maintainAspectRatio: false,
  },
});

})

  }
  //for Strip the long strng from label
truncateString(labelValue,labelLength){
  console.log("labelValue",labelValue);
//var  myString = labelValue.toString();

//var  labelValue1 = labelValue.toString();

console.log("labelValue:",labelValue);
for(let i=0; i<labelValue.length ; i++) {
labelValue= labelValue.toString().substring(0,labelLength) + "...";

 // console.log("myString.....",myString);
//  var wordCount = 0;
  
  //     for(let i=0;i<myString.length;i++){
  //       if(myString.length>labelValue.length) {
  //       myString= myString.substring(0,6) + "...";
  //       console.log("myString4546",myString);  
  //       wordCount++; 
  //     }
     
  //  }
}
   return labelValue;
  }
  
  //function for 1st chart
  nextItems(pageSize,pageEvents){
    console.log("pagination");
    console.log("this is pagesize",pageSize);
    console.log("this is pageevent",pageEvents);
    console.log("this is this.pageSize",this.pageSize);
    if(pageEvents!=undefined){
    

    var currentitems=[];
    var itemStartIndex= pageEvents.pageSize*pageEvents.pageIndex+1;
    var totalItems = itemStartIndex + pageEvents.pageSize
    if(totalItems>this.items.length){
      totalItems = this.items.length;
    }

    for(let i=itemStartIndex; i<totalItems; i++){
      currentitems.push(this.items[i]);
      
    }
    
    console.log("currentitems",currentitems);

    let labelValue = []
        let itemCost = []
        let amcCost = []
      //  let difference = []

    for(let i=0; i< currentitems.length; i++){
      itemCost.push(currentitems[i].itemcost);
      amcCost.push(currentitems[i].amccost);
      labelValue.push(currentitems[i].AssetID);
    //  difference.push(currentitems[i].difference);
    }
    this.chart_cost(itemCost,amcCost,labelValue);
    console.log("truncateString",this.truncateString(labelValue,4));
}
}
chart_cost(itemCost,amcCost,labelValue) {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#chartContainer`);
    if(this.lineChart != undefined) {
      while (this.lineChart.data.datasets.length > 0) {
        this.lineChart.data.datasets.pop();
      }
    }
    // this.lineChart.destroy();
// {}
    //this.assetstatus = data;
    this.lineChart = new Chart(htmlRef, {
      type: 'bar',  
      data: {
        datasets: [
          {
            //data: [25, 40, 35],
            label: "Assets Cost",
            data: itemCost,
            backgroundColor: '#63FF84',
                 fill:false
               },
               {
                 label:"AMC Costs",
                data: amcCost,
                backgroundColor: '#40E0D0',
                fill:false
              },
             
        ],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: labelValue,
      },
      options: {
        title: {
          fullWidth: true,
          fontSize:15,
          padding: 50,
          display: true,
          text: 'AmcCost-AssetsCost Comparison Chart',
          
      },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#000080', 
          },
          
        },
        responsive: true,
        // hover: {mode: null},
        scales: {
          xAxes: [{
            ticks: {
              display: false
       },
            gridLines:{
              drawBorder:true,
              drawOnChartArea:false
            },
          }],
          yAxes: [{
            gridLines:{
              drawBorder:true,
              drawOnChartArea:false
            },
              ticks: {
                  beginAtZero: false,
                   //max value for the chart is 60  
                  }
              }
          ]},
        maintainAspectRatio: false,
      },
    });
   
  }
  //for second chart
  nextItemss(pageSize,pageEvent){
    console.log("pagination");
    console.log("this is pagesize",pageSize);
    console.log("this is pageevent",pageEvent);
    console.log("this is this.pageSize",this.pageSize);
    if(pageEvent!=undefined){
    

    var currentitems=[];
    var itemStartIndex= pageEvent.pageSize*pageEvent.pageIndex+1;
    var totalItems = itemStartIndex + pageEvent.pageSize
    if(totalItems>this.Items1.length){
      totalItems = this.Items1.length;
    }

    for(let i=itemStartIndex; i<totalItems; i++){
      currentitems.push(this.Items1[i]);
    }
    
    console.log("currentitems",currentitems);

    let labelValues = []
    let itemCosts = []
    let depreciateCost = []
      //  let difference = []

    for(let i=0; i< currentitems.length; i++){
      itemCosts.push(currentitems[i].before_cost);
      depreciateCost.push(currentitems[i].after_depreciation_cost);
      labelValues.push(currentitems[i].poolAssetID);
    //  difference.push(currentitems[i].difference);
    }
    
    this.chart_costs(itemCosts,depreciateCost,labelValues);
}
}
chart_costs(itemCosts,depreciateCost,labelValues){
  let htmlRefs = this.elementRef.nativeElement.querySelector(`#chartContainers`);
if(this.lineCharts != undefined) {
  while (this.lineCharts.data.datasets.length > 0) {
    this.lineCharts.data.datasets.pop();
  }
}
// this.lineChart.destroy();
//  {}
  this.lineCharts = new Chart(htmlRefs, {
    type: 'bar',
    data: {
      datasets: [
        {
          //data: [25, 40, 35],
          label: "Assets Cost",
          data: itemCosts,
          backgroundColor: '#63FF84',
               fill:false
             },
             {
             // data: [88, 80, 15],
              label:"Depreciated Costs",
              data: depreciateCost,
              backgroundColor: '#EE82EE',
              fill:false
            },
            // {
            //   data: difference,
            //   backgroundColor: '#6970d5',
            //   fill:false
            // },
         // backgroundColor: ['#FF6384', '#63FF84'],
        //},
      ],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: labelValues,
    },
    options: {
      title: {
        fullWidth: true,
        fontSize:15,
        // padding:{top: 1,
        //   right: 1,
        //   bottom: 2,
        //   left: 2},
        padding: 50,
       display: true,
        text: 'Depreciated-AssetsCost Comparison Chart',
        
    },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#000080',
        },
      },
      responsive: true,
      // hover: {mode: null},
      scales: {
        xAxes: [{
          ticks: {
            display: false
     },
          gridLines:{
            drawBorder:true,
            drawOnChartArea:false
          },
        }],
        yAxes: [{
          gridLines:{
            drawBorder:true,
            drawOnChartArea:false
          },
            ticks: {
                beginAtZero: false,
                 //max value for the chart is 60  
                }
            }
        ]},
      maintainAspectRatio: false,
    },
  });
}
}
