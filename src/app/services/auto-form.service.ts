import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutoFormField} from '../utils/classes';
import {AutoTableHeaders} from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AutoFormService {

  constructor() {
  }

  convertToAutoFormFields(headers: AutoTableHeaders[]): AutoFormField<any>[] {
    return headers.map((header) => {
      return new AutoFormField({
        key: header.field,
        label: header.header,
        required: header.required,
        controlType: header.inputType,
        type: this.convertType(header.type)
      });
    });
  }

  toFormGroup(headers: AutoTableHeaders[]): FormGroup {
    const fields: AutoFormField<any>[] = this.convertToAutoFormFields(headers);
    const group: any = {};
    fields.forEach((field) => {
      group[field.key] = field.required
        ? new FormControl(field.value || null, Validators.required)
        : new FormControl(field.value || null);
    });
    return new FormGroup(group);
  }

  convertType(type: string): string {
    switch (type) {
      case 'time.Time':
      case '*time.Time':
        return 'date';
      case 'int32':
      case '*int32':
      case 'float64':
      case '*float64':
        return 'numeric';
      case 'boolean':
        return 'boolean';
      case 'object':
        return 'object';
      case 'string':
      case '*string':
      default:
        return 'text';
    }
  }
}
