import {Component} from '@angular/core';
import {ResultListComponent} from '../result-list/result-list.component';
import {ButtonsComponent} from '../buttons/buttons.component';
import {CalculatorService} from '../calculator.service';

@Component({
  moduleId: module.id,
  selector: 'calculator-wrapper',
  templateUrl: 'calculator.component.html',
  styleUrls: ['calculator.component.css'],
  directives: [ResultListComponent,ButtonsComponent],
  providers: [CalculatorService]
})

export class CalculatorComponent {
	constructor(public calc_service: CalculatorService) { }
}
