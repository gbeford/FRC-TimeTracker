import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert: ElementRef;

  @Input() alertMessage: string;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


  closeAlert() {
    // this.alert.nativeElement.classList.remove('show');
    this.notify.emit();
  }


  ngOnInit() {
    setTimeout(() => { this.notify.emit(); }, 10000);

  }

  ngAfterViedwInit() {
    // setTimeout(() => { this.alert.nativeElement.classList.remove(); }, 1000);
  }
}
