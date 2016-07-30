import { Injectable } from '@angular/core';
import {CalculatorComponent} from './calculator/calculator.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {ResultsList} from './results-list';

@Injectable()
export class CalculatorService {

	public equation: string = "0";
	public result: number = null;
	public digit_limit: number = 12;
	public is_reseted: boolean = true;
	public can_add_operator: boolean = false;

	public result_list_ids: number[] = [0];
	public result_list: ResultsList[] = [];

	public memory: number = null;

	// returns the length of current equation string
	public getEquationLength(){
		return this.equation.length;
	}

	// adds record to the result-list component
	public addToResultList(value: number, equation: string){
		let id = this.result_list_ids[this.result_list_ids.length - 1]+1
		this.result_list_ids.push(id);
		this.result_list.unshift({
			id: id,
			value: value,
			equation: equation
		})
	}

	// removes record from the result-list component
	public removeFromResultList(id: number){
		for(var i = 0; i < this.result_list.length; i++) {
		    if(this.result_list[i].id == id) {
		        this.result_list.splice(i, 1);
		        break;
		    }
		}
	}
}
