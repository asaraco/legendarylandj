import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toastText!: string[];
  @Input() showToast: boolean = false;
  @Output() showToastChange = new EventEmitter<boolean>();

  ngOnInit() {
    //this.showToast = this.persistent;
  }

  closeThis(): void {
    this.showToast = false;
    this.showToastChange.emit(false);
  }
  
}
