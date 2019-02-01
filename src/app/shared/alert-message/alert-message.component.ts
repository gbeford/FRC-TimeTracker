import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';

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
    // setTimeout(() => { this.alert.nativeElement.classList.remove().fadeOut(); }, 1000);

  }

  ngAfterViedwInit() {
    setTimeout(() => { this.alert.nativeElement.classList.remove(); }, 1000);
  }
}
