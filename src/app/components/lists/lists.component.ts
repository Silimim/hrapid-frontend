import { Component } from '@angular/core';
import {CrudPaths} from '../../utils/interfaces';
import {AutoTableComponent} from '../auto-table/auto-table.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    AutoTableComponent
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {
  crudPaths: CrudPaths = {
    get: 'lists',
    add: 'list',
    edit: 'list',
    delete: 'list'
  };

}
