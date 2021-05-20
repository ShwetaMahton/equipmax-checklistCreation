import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { ActivatedRoute  } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})
export class EditChecklistComponent implements OnInit {
  selectedValue : any;
  select: any;
  assetId:number;
  checkboxes: any[]=[];
  checkboxes1: any[]=[];
  poolfrequency: any[]=[];
  toppingList: string[]=[] ;
  assetChecklistFields: any[] = [];
  assetChecklistFields1: any[] = [];
  selectedItems:string[];
  fieldValue: any[] = [];
  fieldValue1: any[] = [];
  constructor(private route: ActivatedRoute,private webservice: WebRequestService) { }

  onSubmit(userForm) {
    for (let i = 0; i < this.poolfrequency.length; i++) { 
     this.fieldValue1[i]=JSON.stringify(this.poolfrequency[i]["fieldValue1"]);
    //  this.fieldValue1[i+1]=JSON.parse(JSON.parse(JSON.stringify(this.poolfrequency[i+1]["fieldValue1"])));
     }
console.log("......",this.fieldValue);
console.log("......",this.fieldValue1);
    console.log(userForm);
    let saveObject = {
      
      // checkListFieldsArrJson: JSON.stringify(this.selectedItems),
      // select:  this.selectedItems,
       updatedpool :  this.getpoolHours(),
       updatedpoolRate : this. getpoolRate(),
       itemkey: this.assetId
       };
    console.log('saveObject', saveObject);
    this.webservice.saveNewNExistingCheckListFieldsForSelectedAsset1(saveObject).subscribe(value => {
      console.log(value);
      
     });
    
  }

  getpoolHours() {
    let pool = this.poolfrequency[0]["fieldValue"];
    let poolHours = pool*24; // 24-11-2020 10:00 + 12
    console.log(poolHours);
    return poolHours;
  }

  getpoolRate() {
    let pool = this.poolfrequency[0]["fieldValue1"];
    console.log(pool);
    return pool;
  }
  

  ngOnInit(): void {

    this.selectedItems  = new Array<string>();
  
  this.webservice.getDialogId();
      this.assetId= JSON.parse(localStorage.getItem('id'));
      console.log("asset",this.assetId);

      

      this.assetChecklistFields = [];
      this.webservice.getchecklistForEdit(this.assetId).subscribe((value:any) => {
      this.assetChecklistFields = value.req_log;
     
      console.log('assetChecklistFields278', this.assetChecklistFields);
      this.checkboxes = value.req_log;
this.select = this.checkboxes;
  });


  this.webservice.getpoolfrequency(this.assetId).subscribe((value:any) => {
    this.poolfrequency = value.req_log;
    for(let obj of this.poolfrequency) {
      obj.fieldValue = '';
      obj.fieldValue1 = '';
       }
    console.log('poolfrequency', this.poolfrequency);
});

  }
  toggleSelection(event:any, checkboxes1:string) {
    
     this.selectedItems.push(checkboxes1);
    if(event.target.checked){
      console.log(checkboxes1 + 'check');
      
  }
   else{
      console.log(checkboxes1+ 'uncheck');
       this.selectedItems= this.selectedItems.filter(m=>m!=checkboxes1);

    }
    console.log(checkboxes1);
console.log('589745ggjg',this.selectedItems);
//  this.checkboxes = this.toppingList;
 console.log('454bhbjk',this.checkboxes);
}
 
}
