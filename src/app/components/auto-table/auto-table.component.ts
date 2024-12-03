import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Table, TableModule, TableRowSelectEvent} from 'primeng/table';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {AutoFormMode, AutoTable, AutoTableHeaders, CrudPaths} from '../../utils/interfaces';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {DropdownModule} from 'primeng/dropdown';
import {TagModule} from 'primeng/tag';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {AutoFormComponent} from '../auto-form/auto-form.component';
import {MultiSelect, MultiSelectModule} from 'primeng/multiselect';

@Component({
  selector: 'auto-table',
  standalone: true,
  imports: [
    TableModule,
    CurrencyPipe,
    DatePipe,
    Button,
    IconFieldModule,
    DropdownModule,
    TagModule,
    FormsModule,
    DialogModule,
    AutoFormComponent,
    MultiSelectModule,
    NgIf
  ],
  templateUrl: './auto-table.component.html',
  styleUrl: './auto-table.component.css'
})
export class AutoTableComponent implements OnInit {

  @Input() crudPaths: CrudPaths | undefined;

  @ViewChild('dt') table: Table | undefined;

  tableData: any[] | undefined;

  rowData: any | undefined;

  tableColumns!: AutoTableHeaders[];

  selectedTableColumns!: AutoTableHeaders[];

  loading: boolean = true;

  showModal: boolean = false;
  modalMode: AutoFormMode = AutoFormMode.Add;

  refreshed: boolean = true;

  detail: any;

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  ngOnInit() {

    if (this.crudPaths?.get) {
      this.getData();
    }
  }

  getColumnType(type: string): string {
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

  getData() {
    this.http.get<AutoTable>(`http://localhost:8080/table/${this.crudPaths?.get}`).subscribe({
      next: (data) => {
        this.tableData = data.data.length ? data.data : [];
        this.tableColumns = data.headers.map((header) => {
          return {
            field: header.field,
            header: header.header,
            type: this.getColumnType(header.type),
            formatType: header.formatType,
            inputType: header.inputType,
            required: header.required
          };
        });
        this.selectedTableColumns = this.tableColumns;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error loading table data'});
      }
    })
  }

  getSeverity(status: string, enumType: { key: string, value: any }[]): any {
    const found = enumType.find((item) => item.key === status);
    return found ? found.value : 'info';
  }

  addRow() {
    this.modalMode = AutoFormMode.Add;
    this.showModal = true
  }

  editRow(data: any) {
    this.rowData = data;
    this.modalMode = AutoFormMode.Edit;
    this.showModal = true;
  }

  deleteRow(data: any) {
    this.http.delete(`http://localhost:8080/api/${this.crudPaths?.delete}/${data.id}`).subscribe({
      next: () => {
        this.refreshData(true);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Row deleted successfully'});
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error deleting row'});
      }
    });
  }

  refreshData(event: any) {
    if (event) {
      this.getData();
    }
  }

  showModalChange(show: boolean) {
    if (!show) {
      this.showModal = show;
      this.rowData = undefined;
    }
  }

  openDetail(data: {detail: string, [key: string]: string}) {

  }
}
