import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

export const componentsList = [
  'Accordion', 'Alert', 'Buttons', 'Carousel', 'Collapse', 'Datepicker', 'Dropdown', 'Modal', 'Pagination', 'Popover',
  'Progressbar', 'Rating', 'Tabs', 'Timepicker', 'Tooltip', 'Typeahead'
];

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent {

}
