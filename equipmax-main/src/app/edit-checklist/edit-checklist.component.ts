import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jsDocComment } from '@angular/compiler';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})
export class EditChecklistComponent implements OnInit {
  selectedValue: any;
  other_poolfrequency: any;
  select: any;
  assetId: number;
  checkboxes: any[] = [];
  checkboxes1= [];
  poolfrequency: any[] = [];
  toppingList: string[] = [];
  assetChecklistFields: any[] = [];
  assetChecklistFields1: any[] = [];
  selectedItems: string[];
  fieldValue: any[] = [];
  fieldValue1: any[] = [];
  selectedValuefinal: any[] = [];
  checkboxes2: any;
  
  constructor(private route: ActivatedRoute, private webservice: WebRequestService) { }

  onSubmit(userForm) {
    
   var hasError: boolean = false;
   var hasError1: boolean = false;
      var msg = '';
  
    // for(let i=0;  this.checkboxes[i]["selectedValue"] ==1 ; i++){
    //   this.checkboxes1[i] = JSON.stringify(this.checkboxes[i]["checklistpk"]);
    //   console.log("newcheck", this.checkboxes1[i]);
    //  }
this.checkboxes1=[]
     for(let i=0;  i<this.checkboxes.length ; i++){
       if(this.checkboxes[i]["selectedValue"] ==1)
      this.checkboxes1.push(JSON.stringify(this.checkboxes[i]["checklistpk"]));
     
     }
     console.log("newcheck", this.checkboxes1);
     console.log("newcheck", this.getpoolRate());
     console.log(this.checkboxes1.length);

     if(this.getpoolRate() == ''){
      console.log("value should be minimum 1");
      hasError1 = true;
      return hasError1
    }

     if (this.checkboxes1.length == 0) {
       console.log('Please provide atleast one checklist for update') ;
      hasError = true;
    return hasError;
    }
         console.log(userForm);

         if (!hasError && !hasError1) {
    let saveObject = {

      // checkListFieldsArrJson: JSON.stringify(this.selectedItems),
      updatedpool: this.getpoolHours(),
      updatedpoolRate: this.getpoolRate(),
      itemkey: this.assetId,
     checkListFieldsArrJson: this.checkboxes1
    };
    console.log('saveObject', saveObject);
     this.webservice.saveNewNExistingCheckListFieldsForSelectedAsset1(saveObject).subscribe(value => {
       console.log(value);

     });

  } }

  getpoolHours() {
      if(this.selectedValue==="Daily"){
        let poolHours = 1 * 24;
        return poolHours;
      }else if(this.selectedValue==="Weekly"){
        let poolHours = 7 * 24;
        return poolHours;
      }else if(this.selectedValue==="Monthly"){
        let poolHours = 30 * 24;
        return poolHours;
      }else{
        this.selectedValue="others";
        let poolHours = this.other_poolfrequency * 24;
        return poolHours;
      }
    
  }

  getpoolRate() {
    let pool = this.poolfrequency[0]["fieldValue1"];
    console.log(pool);
    return pool;
  }

 


  ngOnInit(): void {

    this.selectedItems = new Array<string>();

    this.webservice.getDialogId();
    this.assetId = JSON.parse(localStorage.getItem('id'));
    console.log("asset", this.assetId);



    this.assetChecklistFields = [];
    this.webservice.getchecklistForEdit(this.assetId).subscribe((value: any) => {
      this.assetChecklistFields = value.req_log;
    
      console.log('assetChecklistFields278', this.assetChecklistFields);
      this.checkboxes = value.req_log;
      this.select = this.checkboxes;
    });


    this.webservice.getpoolfrequency(this.assetId).subscribe((value: any) => {
      this.poolfrequency = value.req_log;
      for (let obj of this.poolfrequency) {
        obj.fieldValue = '';
        obj.fieldValue1 = '';
      }
      const poolFreqDays=this.poolfrequency[0].poolfrequency / 24;
      let listOption;
      if(poolFreqDays===1){
        listOption="Daily";
      }else if(poolFreqDays===7){
        listOption="Weekly";
      }else if(poolFreqDays===30){
        listOption="Monthly";
      }else{
        listOption="others";
        this.other_poolfrequency = listOption;
      }
      this.selectedValue=listOption;
      console.log('poolfrequency', this.poolfrequency);
      console.log('other_poolfrequency', this.other_poolfrequency);
    });

  }
  toggleSelection(event: any, checkboxes1) {
    console.log(checkboxes1);
    checkboxes1.selectedValue == 0 ? checkboxes1.selectedValue=1 : checkboxes1.selectedValue=0;
    console.log("checkboxes1",checkboxes1);
    this.selectedItems.push(checkboxes1);
    return false;
  }

  
 
  

}



