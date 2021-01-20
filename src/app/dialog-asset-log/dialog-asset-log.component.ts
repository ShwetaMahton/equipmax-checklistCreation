import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebRequestService } from '../web-request.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-asset-log',
  templateUrl: './dialog-asset-log.component.html',
  styleUrls: ['./dialog-asset-log.component.scss']
})
export class DialogAssetLogComponent implements OnInit {
  displayedColumns: string[] = ['checkListField','checkListValue'];
  dataSource = new MatTableDataSource();
  assetId:number;
  constructor(private webservice: WebRequestService) { }

  ngOnInit(): void {
   
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit');
 
   this.webservice.getAssetlogData().subscribe((value:any) => {
    console.log("////",value);
   this.dataSource.data=value.req_log;
  });
}
}
