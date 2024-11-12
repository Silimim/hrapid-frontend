import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-auto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    NgIf,
    ChipModule,
    TagModule
  ],
  templateUrl: './auto-form.component.html',
  styleUrl: './auto-form.component.css'
})
export class AutoFormComponent implements OnInit, AfterContentInit {
  @Input() autoTableHeaders: AutoTableHeaders[] | undefined;

  form!: FormGroup;

  constructor(private autoFormService: AutoFormService) {
  }

  ngOnInit() {
    if (this.autoTableHeaders) {
      this.form = this.autoFormService.toFormGroup(this.autoTableHeaders);
      console.log(this.form)
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

  ngAfterContentInit(): void {
    if (this.autoTableHeaders) {
      this.form = this.autoFormService.toFormGroup(this.autoTableHeaders);
      console.log(this.form)
    }
  }
}
