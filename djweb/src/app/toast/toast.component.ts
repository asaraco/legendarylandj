import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toastText!: string[];
  @Input() persistent: boolean = false;
  @Input() showToast: boolean = false;
  @Output() showToastChange = new EventEmitter<boolean>();

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showToast']) {
      if (this.showToast==true) { 
        if (this.persistent==false) {
          let toastInterval = setInterval(() => {this.closeThis(); clearInterval(toastInterval)}, (2000*this.toastText.length));
        }        
      }
    }
  }

  closeThis(): void {
    this.showToast = false;
    this.showToastChange.emit(false);
  }
  
}
