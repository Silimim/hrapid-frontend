import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {AutoTable, AutoTableHeaders} from '../../utils/interfaces';

@Component({
  selector: 'auto-table',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './auto-table.component.html',
  styleUrl: './auto-table.component.css'
})
export class AutoTableComponent implements OnInit {

  @Input() tableName: string | undefined;

  tableData: any[] | undefined;

  tableColumns: AutoTableHeaders[] | undefined;

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  ngOnInit() {

    if (this.tableName) {
      this.http.get<AutoTable>(`http://localhost:8080/table/${this.tableName}`).subscribe({
        next: (data) => {
          this.tableData = data.data.length ? data.data : [];
          this.tableColumns = data.headers.map((header) => {
            return {
              field: header.field,
              header: header.header,
              type: this.getColumnType(header.type)
            };
          });
        },
        error: (error: any) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error loading table data'});
        }
      })
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
}
