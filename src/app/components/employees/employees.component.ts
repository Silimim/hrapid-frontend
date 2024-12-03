import { Component } from '@angular/core';
import {CrudPaths} from '../../utils/interfaces';
import {AutoTableComponent} from '../auto-table/auto-table.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    AutoTableComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  crudPaths: CrudPaths = {
    get: 'employees',
    add: 'employee',
    edit: 'employee',
    delete: 'employee'
  };
}
