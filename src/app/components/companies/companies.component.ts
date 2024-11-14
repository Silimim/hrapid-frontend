import {Component} from '@angular/core';
import {AutoTableComponent} from '../auto-table/auto-table.component';
import {Company, CrudPaths} from '../../utils/interfaces';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    AutoTableComponent
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {

  crudPaths: CrudPaths = {
    get: 'companies',
    add: 'company',
    edit: 'company',
    delete: 'company'
  };

  constructor() {}
}
