import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { ActivatedRoute  } from '@angular/router';
import { home } from '../home.model';
import {FormBuilder, NgForm, Validators, FormControl,FormArray,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { getRtlScrollAxisType } from '@angular/cdk/platform';

@Component({
  selector: 'app-update-checklist',
  templateUrl: './update-checklist.component.html',
  styleUrls: ['./update-checklist.component.scss']
})
export class UpdateChecklistComponent implements OnInit {
  topping:any = new FormControl();
  toppingList: string[]=[] ;
  assetId:number;
  checklist;
  selected:any
  checklistField:any;
  checklistPK:number;
  assetDetails;
  checklistLogDetails: any[] = [];   
  assetChecklistFields: any[] = [];
  fieldValue: any[] = [];
  checkboxes: any[]=[];
  selectedRow: Number;
  data: any;
  id: any;
  poolItemKeyPK: number;
  AssetId: string;
 assetKey;
 checklistKey;
 selectedItems:string[];

  @ViewChild('focus', { static: false })input: ElementRef;
public toggleButton: boolean = true;

  constructor(private route: ActivatedRoute, private webservice: WebRequestService,
    private _router: ActivatedRoute,
    private formBuilder: FormBuilder, private FormsModule: FormsModule,
    private  ReactiveFormsModule:  ReactiveFormsModule ) {
      
  }
  
 ngOnInit(): void {
  this.LoadData();
    // this.webservice.getchecklist().subscribe(data =>{
    //   console.log(data)
    //   this.toppingList = JSON.parse(JSON.stringify(data))
   //  { this.checkboxes = new Array(this.topping.length);
     // this.checkboxes.fill(true);
  //  }
      //})
 this.selectedItems  = new Array<string>();
  this.webservice.getDialogId();
      this.assetId= JSON.parse(localStorage.getItem('id'));
      console.log("asset",this.assetId);

      // this.webservice.getupdatechecklist();
      // this.checklist= JSON.parse(localStorage.getItem('id'));
      // console.log("checklist",this.checklist);
    
 }
 LoadData(){
  this.webservice.getchecklist().subscribe(data =>{
    console.log(data)
    this.toppingList = JSON.parse(JSON.stringify(data))
    // { this.checkboxes = new Array(this.topping.length);
    //   this.checkboxes.fill(false);}
    })
 }

//  setClickedRow(index) {
//   this.selectedRow = index;
// }
  toggleSelection(event:any, toppingList:string) {
    
   
      this.selectedItems.push(toppingList);
      if(event.target.checked){
        console.log(toppingList + 'check');
        
    }
    
      else{
        console.log(toppingList+ 'uncheck');
        this.selectedItems= this.selectedItems.filter(m=>m!=toppingList);

      }
      console.log(toppingList);
  console.log('589745ggjg',this.selectedItems);
//  this.checkboxes = this.toppingList;
   console.log('454bhbjk',this.checkboxes);
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
  this.webservice.fetch(this.assetId).subscribe((value:any) => {
    console.log(value);
    this.assetDetails = value.req_log;
    this.checkboxes = value.req_log;
    console.log('assetDetails', this.assetDetails);
  });
  this.webservice. fetchCheckListFields().subscribe((value:any) => {
    console.log(value);
    
    this.checklist = value
    //console.log('checklists', );
  });
}

// addmorechecklist() {
//   this.webservice.getchecklist().subscribe(data =>{
//     console.log(data)
//     this.toppingList = JSON.parse(JSON.stringify(data))
//     })

//     this.route.queryParams.subscribe( params => {
//       console.log(params);

//     });
//}
// deletechecklist(i)
// {
//   console.log(i);
//   this.webservice.deleteData(i).subscribe(data=>{
//     console.log('assetChecklistFields0505', this.assetChecklistFields);
//   })
// }

enable() {
  this.toggleButton = false
  setTimeout(() => { // this will make the execution after the above boolean has changed
    this.input.nativeElement.focus();
   // this.selectedRow ;
  }, 0);
  
}

// delete() {
//   var atleastOneSelected = this.checkboxes.some(checkbox => checkbox === true);
//   var allSelected = this.checkboxes.every(checkbox => checkbox === true);
//   if (!atleastOneSelected) {
//     alert("No rows selected.")
//     return;
//   }
//  if (allSelected) {
//     alert("At least one row should be present.")
//     return;
//   }

//   for (let i = this.checkboxes.length-1; i >= 0; i--) {
//     // If selected, then delete that row.
//     if (this.checkboxes[i]) {
//       this.toppingList.splice(i, 1);
//      this.webservice.deleteData(this.assetId).subscribe(result => {  
//        alert(result);  
//        this.LoadData();  
//     })
//     }
// }

//   // Remove entries from checkboxes array.
//   this.checkboxes = this.checkboxes.filter(checkbox => checkbox === false);
// }


onsubmit() {
  //console.log("saved" , usermodel);
  
  let saveObject = {
    itemkey: this.assetId,
    
    

    checkListFieldsArrJson: JSON.stringify(this.selectedItems)
   
  };
  
  
  console.log("fhjf",this.assetId);
  console.log("5894752",this.checklist);
  
  console.log('saveObject', saveObject);
  this.webservice.saveNewNExistingCheckListFieldsForSelectedAsset(saveObject).subscribe(value => {
    console.log(value);
    
  });
 }
}
