import { EventEmitter, HostListener, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit {
  isLoading= true;
  public itemDetails = [];
  itemDetails1 = [];
  itemDetails2 = [];


  NewItems= [];
  throttle = 0;
  scrollDistance = 2;
  page= 1;

  constructor(private webservice: WebRequestService, private scroll: InfiniteScrollModule) {

   }


 

  onScrollDown() : void {
    this.webservice.getForVirtualScrolling(++this.page).subscribe((NewItems:any) => {
      this.NewItems = NewItems;
    this.NewItems.push(...this.NewItems);
    });
  }

 

  ngOnInit(): void {

    this.webservice.getForVirtualScrolling(this.page).subscribe((value:any) => {
      this.itemDetails1 = value;
      this.itemDetails2 = value;

      this.itemDetails = this.itemDetails1.concat(this.itemDetails2);
      this.isLoading= false;
     
      console.log('itemDetails', this.itemDetails);
    },
    _error => this.isLoading= false
    );
console.log("this.loadmore",this.yHandler());
this.yHandler();
  }

  yHandler() {
    // var wrap = document.getElementById('wrap');
    // var contentHeight = window.innerHeight;
    // var yOffset = window.pageYOffset;
    // var y = yOffset +window.innerHeight;
    // if(y>= contentHeight) {
    //   wrap.innerHTML += this.isLoading;
    //   return wrap.innerHTML += this.isLoading;;
    // }
   
  }
  // loadmore(KeyboardEvent) {
  //   var items = ["one", "twp", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
  //   var currentindex = 0
  //   var maxresult = 2
  //       for(var i = 0; i < maxresult; i++){
  //           if(currentindex >= items.length){
  //               this.lmbutton.hide();
  //               return  this.lmbutton.hide();
  //           }
  //           this.content.concat("<div>"+items[i+currentindex]+"</div>")
  //       }
  //       currentindex += maxresult
   
  // }

  
  
}
