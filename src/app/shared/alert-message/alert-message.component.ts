import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;

  @Input() alertMessage: string;

  constructor() { }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }


  ngOnInit() {
  }



}
