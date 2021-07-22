import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { SwPush } from '@angular/service-worker';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss']
})
export class LoginModuleComponent implements OnInit {


  page:number = 1;
  pdfSrc:string = '';
  
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

// private readonly publicKey ='BGHeY4yv3OpUiU0CnFZ-wOgANU6nN1RD22xOB-0n5ClZe66o9v5naGRcOZOKYUqE9mObTqBRA8e_-er3OG8mRPA';

  constructor(  private swPush: SwPush,
    private webservice: WebRequestService) { }

  ngOnInit(): void {
    this.pdfSrc = this.webservice.getPDF();
    this.pushSubscription();
  }

  onFileSelected() {
    let img: any = document.querySelector("#file");

    if(typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e:any) => {
        this.pdfSrc = e.target.result;
      }

      reader.readAsArrayBuffer(img.files[0]);
    }
  }
  
  pushSubscription() {
    if(!this.swPush.isEnabled){
      console.log("Notification id not enabled");
      return;
    }
    // this.swPush.requestSubscription({
    //   serverPublicKey: this.publicKey,

    // }).then( (sub) =>console.log(JSON.stringify(sub))).catch((err) => console.log(err));
}
}
