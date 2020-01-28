import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent {

  selectedDT = null;
  @Output() dtEmitter = new EventEmitter<any>();

  onSelectDate() {
    if (this.selectedDT) {
      const selDate = new Date(this.selectedDT).toLocaleDateString();
      const selTime = new Date(this.selectedDT).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
      this.dtEmitter.emit({
        selDate,
        selTime
      });
    }
  }

}
