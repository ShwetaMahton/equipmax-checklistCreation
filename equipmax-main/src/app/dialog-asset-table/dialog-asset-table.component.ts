import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder, NgForm, Validators, FormControl,FormArray} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WebRequestService } from '../web-request.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TaskService } from '../task.service' ;
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subject, of, from} from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, tap, takeUntil} from 'rxjs/operators';
import * as _moment from 'moment';
import { AssetTableComponent } from '../asset-table/asset-table.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-dialog-asset-table',
  templateUrl: './dialog-asset-table.component.html',
  styleUrls: ['./dialog-asset-table.component.scss'],

})

export class DialogAssetTableComponent implements OnInit {
  
  toppings = new FormControl();
  assetId:number;
  toppingList: string[] 
  assetKey: number;
  assetDetails;
  checklistLogDetails: any[] = [];   
  assetChecklistFields: any[] = [];
  fieldValue: any[] = [];
  upcomingCheckDate;
  checklistoperationDate;
  serviceDoneDate;
  temp; 
  humidity;
  private _id:number;
  data: any;
  id: any;
  poolItemKeyPK: number;
  AssetId: string;
  assetIndex : DialogAssetTableComponent;
  checkoutForm;
  dataArr:any[] = [];
  //@Inject(MAT_DIALOG_DATA) public data1: any
  tomorrow = new Date();
  constructor(public dialog: MatDialog,
     private webservice: WebRequestService,
      public datepicker: MatDatepickerModule,
       private taskservice: TaskService, 
       private route: ActivatedRoute,
        private _router: ActivatedRoute,
        private formBuilder: FormBuilder,
    private router: Router,) { 
      this.tomorrow.setDate(this.tomorrow.getDate());
    }
  additem(usermodel) {
    console.log(usermodel);
  }
  checklistAssign() {
    this.dialog.open(DialogAssetTableComponent ,{height:'90%',width:'100%'});
    }
 


  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      console.log(params);

    });
    console.log(this._router.snapshot.params);
    this.id = this._router.snapshot.params.id;
    console.log("this.id",this.id);
this.webservice.getDialogId();
    this.assetId= JSON.parse(localStorage.getItem('id'));
    console.log("asset",this.assetId);
  
      this.route.queryParams.subscribe(params => {
        console.log('params', params);
        if (params && params.assetKey) {
          this.assetKey = JSON.parse(params.assetKey);
          console.log('params',this.assetKey);
        }
      });
 
   }
   getOne()
   {
      this.webservice.getOne(this.id).subscribe(data=>
       {
         console.log(this.data);
          this.data=JSON.parse(JSON.stringify(data));
        
       })
   }

   ngAfterContentInit() {
    console.log('ngAfterContentInit');
    this.assetChecklistFields = [];
    this.webservice.getchecklistlogData(this.assetId).subscribe((value:any) => {
    this.assetChecklistFields = value.req_log;
    for(let obj of this.assetChecklistFields) {
      obj.fieldValue = '';
    }
    console.log('assetChecklistFields', this.assetChecklistFields);
  });
  
  this.webservice.fetchAssetDetails(this.assetId).subscribe((value:any) => {
    console.log(value);
    this.assetDetails = value.req_log;
    console.log("fggh.......",this.assetDetails[0].poolfrequency);
    console.log('assetDetails', this.assetDetails);
  });
}

Submit() {
  for (let i = 0; i < this.assetChecklistFields.length; i++) { 
    this.fieldValue[i]=JSON.parse(JSON.parse(JSON.stringify(this.assetChecklistFields[i]["fieldValue"])));
  }
  console.log("......",this.fieldValue);
var hasError: boolean = false;
var fieldvalue=[];
  var date = new Date(); 
  var offset = date.getTimezoneOffset() * 60000;
  var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
  console.log("date////",localISOTime);
  console.log("da.///////",new Date(this.serviceDoneDate).toISOString().slice(0, -1));
  var event = new Date(this.serviceDoneDate);

let date1 = JSON.stringify(event)
date1 = date1.slice(1,11)
console.log("date1////",date1);
  console.log("date////",this.serviceDoneDate);
  //console.log(this.id.poolItemKeyPK);

 
  
//this.webservice.saveDataDialog(this.assetId,localISOTime,this.getUpcomingCheckDate(),localISOTime);
  if (!hasError) {
    let saveObject = {
      itemkey: this.assetId,
      upcomingCheckDate: this.getUpcomingCheckDate(),
      checklistoperationDate: localISOTime,
      serviceDoneDate: new Date(this.serviceDoneDate).toISOString().slice(0, -1),
      
      
      checkListFieldsDataArrJson: JSON.stringify(this.assetChecklistFields)
    };
    console.log("date////",JSON.stringify(this.assetChecklistFields));
    console.log("////",this.serviceDoneDate);
    console.log('saveObject', saveObject);
    this.webservice.savechecklistCreationLogNDataValue(saveObject).subscribe(value => {
      console.log(value);
      this.serviceDoneDate = '';
    });
  }
  
}



getUpcomingCheckDate() {
  let noOfHours = this.assetDetails[0].poolfrequency;
  let noOfTimes = this.assetDetails[0].poolfrequencyRate;
  let dateAfterNoOfHours;
  let newEntryafterHours = noOfHours / noOfTimes; // 24-11-2020 10:00 + 12
  let nextDate;

  if (this.checklistLogDetails.length !== 0) {
    // get firstChecklist Operation Date + poolfrequency
    var firstChecklistOperationDate = this.checklistLogDetails[0].checklistoperationDate;
    var firstChkOperation_date = new Date(firstChecklistOperationDate);

    // add the maximm date value
    dateAfterNoOfHours = this.addhours(firstChkOperation_date, noOfHours);
    firstChkOperation_date = new Date(firstChecklistOperationDate);
  }

  // get current DateTime
  let date = new Date();
  let offset = date.getTimezoneOffset() * 60000;
  let localTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);

  if (localTime < dateAfterNoOfHours && this.checklistLogDetails.length !== 0) {
    // console.log('A');

    if (this.checklistLogDetails.length == (noOfTimes-1)) {
      // console.log('A1');
      // No of time entry for the hours is completed so set next day date.
      nextDate = dateAfterNoOfHours;
    } else {
      // console.log('A2');
      // Still Entries for the day is left
      var date_afterHours = this.addhours(firstChkOperation_date, newEntryafterHours);
      firstChkOperation_date = new Date(firstChecklistOperationDate);

      if ( date_afterHours < dateAfterNoOfHours) {
        // console.log('A21');
          nextDate = date_afterHours;
      } else if ( date_afterHours < dateAfterNoOfHours) {

      }
       else {
        // console.log('A22');
          nextDate =  this.addhours(firstChkOperation_date, (noOfHours - 1));
          firstChkOperation_date = new Date(firstChecklistOperationDate);
      }
    }
  } else {
    // console.log('B');
    nextDate = this.addhours(date, newEntryafterHours);
  }

  console.log('nextDate', nextDate);
  return nextDate;
}

addhours(date, hrs) {
  date.setHours(date.getHours() + hrs);
  let offsetVal = date.getTimezoneOffset() * 60000;
  let ISODate = (new Date(date - offsetVal)).toISOString().slice(0, -1);
  // console.log('ISODate', ISODate);

  return ISODate;
}

validateSaveObj() {
  var hasError: boolean = false;
  var msg = '';

  for (let obj of this.assetChecklistFields) {
    if (obj.fieldValue === '') {
      msg = 'Please provide ' + obj.checklistField;
      hasError = true;
      break;
    }
  }

  if (hasError) {
    this.validationMessageBox(msg);
  }

  return hasError;
}
validationMessageBox(msg) {
   // const confirm = this.alertCtrl.create({
   //   header: 'Alert',
   //   message: msg,
   //   buttons: [
    //    {
     //     text: 'OK',
     //     handler: () => {
            // console.log('Agree clicked', this.selectedcheckListFields);
    //      }
     //   }
   //   ]
  //  }).then(alert => alert.present());
  }



// calendarServiceDoneDate() {
//   var date = new Date();
//   var offset = date.getTimezoneOffset() * 60000;
//   var test = (new Date(moment(Date.now() - offset).add(1, 'days').toISOString())).valueOf();
//   var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
//   console.log("testDate", localISOTime);
//   // var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
//   this.datepicker.show({
//     date: new Date(),
//     mode: 'datetime',
//     maxDate: new Date().valueOf(),
//     // (new Date(moment(Date.now() - offset).toISOString())).valueOf(),
//     androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
//   }).then(
//     date => {
//       // const newDate = dateTime.getDate()+"/"+dateTime.toLocaleString('default', { month: 'long' })+"/"+dateTime.getFullYear()+" "+dateTime.getHours()+":"+dateTime.getMinutes();
//       const newDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate() + ' ' + date.getHours()+ ':' + date.getMinutes();
//       this.serviceDoneDate = newDate;
//     },
//     err => console.log(err)
//   );
//   }
  
}



