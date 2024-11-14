import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AutoFormService} from '../../services/auto-form.service';
import {AutoFormMode, AutoTableFormat, AutoTableHeaders, CrudPaths} from '../../utils/interfaces';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {NgIf} from '@angular/common';
import {ChipModule} from 'primeng/chip';
import {TagModule} from 'primeng/tag';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';

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
    Button,
    DialogModule
  ],
  providers: [AutoFormService],
  templateUrl: './auto-form.component.html',
  styleUrl: './auto-form.component.css'
})
export class AutoFormComponent implements OnInit, OnChanges {
  @Input() autoTableHeaders: AutoTableHeaders[] | undefined;
  @Input() mode!: AutoFormMode;
  @Input() crudPaths!: CrudPaths;
  @Input() showModal!: boolean;

  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() refreshData: EventEmitter<boolean> = new EventEmitter<boolean>();

  form!: FormGroup;

  constructor(private autoFormService: AutoFormService, private http: HttpClient, private messageService: MessageService) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['autoTableHeaders'] && this.autoTableHeaders) {
      this.autoTableHeaders = this.autoTableHeaders.filter((header) => header.field !== 'id' && header.field !== 'date_added' && header.field !== 'user_added_id');
      this.form = this.autoFormService.toFormGroup(this.autoTableHeaders);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.mode === AutoFormMode.Add) {
        this.http.post('http://localhost:8080/api/' + this.crudPaths.add, this.form.value).subscribe({
          next: (data) => {
            this.refreshData.emit(true);
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error adding record'});
          }
        });
      } else {
        this.http.put('http://localhost:8080/api/' + this.crudPaths.edit, this.form.value).subscribe({
          next: (data) => {
            this.refreshData.emit(true);
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error updating record'});
          }
        });
      }
    }
  }

  getEnumKeys(header: AutoTableFormat) {
    return header.enum?.map((enumValue) => enumValue.key);
  }

  getSeverity(status: string, enumType: { key: string, value: any }[]): any {
    const found = enumType.find((item) => item.key === status);
    return found ? found.value : 'info';
  }

  visibleChange(event: any) {
    this.showModalChange.emit(event);
  }
}
