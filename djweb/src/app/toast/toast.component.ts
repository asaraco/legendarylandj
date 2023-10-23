import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toastText!: string[];
  @Input() showToast: boolean = false;

  ngOnInit() {
    //this.showToast = this.persistent;
  }

  closeThis(): void {
    this.showToast = false;
  }
  
}
