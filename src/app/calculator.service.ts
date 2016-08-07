import { Injectable } from '@angular/core';
import {CalculatorComponent} from './calculator/calculator.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {ResultListComponent} from './result-list/result-list.component';

interface ResultsList{
	id: number;
	value: number;
	equation: string;
}

@Injectable()
export class CalculatorService {

	/*
	 * calculator equation to be solved
	 * value of display section
	*/
	public equation: string = "0";
	// last solved result
	public result: number = null;
	// limit of characters that can be displayed
	public digit_limit: number = 12;
	public is_reseted: boolean = true;
	public can_add_operator: boolean = false;

	// list of ids for result list
	public result_list_ids: number[] = [0];
	public result_list: ResultsList[] = [];

	public memory: number = null;

	/*
	 * @returns {number} the length of equation string
	*/
	public getEquationLength(): number{
		return this.equation.length;
	}

	/*
	 * adds record to the result-list component
	 * @param value - numeric value to be added
	 * @param equation - the equation string from which the result was calculated
	*/
	public addToResultList(value: number, equation: string): void{
		let id = this.result_list_ids[this.result_list_ids.length - 1]+1;
		this.result_list_ids.push(id);
		this.result_list.unshift({
			id: id,
			value: value,
			equation: equation
		});
	}

	/*
	 * removes record from the result-list component
	 * @param id - the id of result item to be deleted
	*/
	public removeFromResultList(id: number): void{
		// iterates over result-list items until id matches; then deletes
		for(var i = 0; i < this.result_list.length; i++) {
		    if(this.result_list[i].id == id) {
		        this.result_list.splice(i, 1);
		        break;
		    }
		}
	}
}