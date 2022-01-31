import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor  {
  faToggleOn = faToggleOn;

  @Input() checked = false; 

  writeValue(obj: any): void {
    this.checked = obj;
  }
  
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  propagateChange = (_: any) => {};


  toggleChecked() {
    this.checked = !this.checked;
    this.propagateChange(this.checked);
  }

}
