import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebRequestService } from '../web-request.service';
import{DialogAssetLogComponent } from '../dialog-asset-log/dialog-asset-log.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist-log-table',
  templateUrl: './checklist-log-table.component.html',
  styleUrls: ['./checklist-log-table.component.scss']
})
export class ChecklistLogTableComponent implements OnInit {
  displayedColumns: string[] = ['upcomingCheckdate','checklistoperationDate','serviceDoneDate','log'];
  dataSource = new MatTableDataSource();

  constructor(private webservice: WebRequestService, public dialog: MatDialog) { }
  open(index : number) {
    console.log("index", index);
    this.webservice.checklistLogPK=index;
    const dialogRef = this.dialog.open(DialogAssetLogComponent,{height:'80%',width:'70%'});
    //this._router.navigate(['/dialog-table',index]);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }
  ngOnInit(): void {

    this.webservice.getchecklistlog().subscribe((data:any ) =>{
      console.log("////",data)
     this.dataSource.data=data.req_log;
      
      
  })
      
    }
  }

