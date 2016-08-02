import { Component } from '@angular/core';
import {CalculatorService} from '../calculator.service';

@Component({
  moduleId: module.id,
  selector: 'saved-results',
  templateUrl: 'result-list.component.html',
  styleUrls: ['result-list.component.css']
})

export class ResultListComponent {

	constructor(private calc_service: CalculatorService) {};

	// result-list component items
	result_list = this.calc_service.result_list;
}