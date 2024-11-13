import {AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AutoFormService} from '../../services/auto-form.service';
import {AutoTableFormat, AutoTableHeaders} from '../../utils/interfaces';
import {AutoFormField} from '../../utils/classes';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {NgIf} from '@angular/common';
import {ChipModule} from 'primeng/chip';
import {TagModule} from 'primeng/tag';
import {Observable} from 'rxjs';
import {Button} from 'primeng/button';

@Component({
  selector: 'auto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    NgIf,
    ChipModule,
    TagModule,
    Button
  ],
  providers: [AutoFormService],
  templateUrl: './auto-form.component.html',
  styleUrl: './auto-form.component.css'
})
export class AutoFormComponent implements OnInit, OnChanges {
  @Input() autoTableHeaders: AutoTableHeaders[] | undefined;

  form!: FormGroup;

  constructor(private autoFormService: AutoFormService) {

  }

  ngOnInit() {
    if (this.autoTableHeaders) {
      this.autoTableHeaders = this.autoTableHeaders.filter((header) => header.field !== 'id');
      this.form = this.autoFormService.toFormGroup(this.autoTableHeaders);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['autoTableHeaders'] && this.autoTableHeaders) {
      this.autoTableHeaders = this.autoTableHeaders.filter((header) => header.field !== 'id');
      this.form = this.autoFormService.toFormGroup(this.autoTableHeaders);
    }
  }

  onSubmit() {
    console.warn(this.form.value);
  }

  getEnumKeys(header: AutoTableFormat) {
    return header.enum?.map((enumValue) => enumValue.key);
  }

  getSeverity(status: string, enumType: { key: string, value: any }[]): any {
    const found = enumType.find((item) => item.key === status);
    return found ? found.value : 'info';
  }
}
