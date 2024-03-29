import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  faSpinner = faSpinner;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  onChange(event) { }

  onTouched() { }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get inputClass(): string {
    const value = (this.controlDir
      && this.controlDir.control
      && this.controlDir.control.touched)
      ? !this.controlDir.control.valid
        ? 'is-invalid'
        : 'is-valid'
      : null;

    return value;
  }

  get isInvalid(): boolean {
    const value = this.controlDir
      && this.controlDir.control
      && !this.controlDir.control.valid;

    return value;
  }

  get isTouched(): boolean {
    const value = this.controlDir
      && this.controlDir.control
      && this.controlDir.control.touched;

    return value;
  }

  get isDirty(): boolean {
    const value = this.controlDir
      && this.controlDir.control
      && this.controlDir.control.dirty;

    return value;
  }

  get isPending(): boolean {
    const value = this.controlDir
      && this.controlDir.control
      && this.controlDir.control.status === 'PENDING';

    return value;
  }

}
