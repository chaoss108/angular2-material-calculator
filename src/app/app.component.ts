import { Component } from '@angular/core';
import {CalculatorComponent} from './calculator/calculator.component';

@Component({
  moduleId: module.id,
  selector: 'calculator',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CalculatorComponent]
})

export class AppComponent {
}