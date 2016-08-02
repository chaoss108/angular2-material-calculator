import { Injectable } from '@angular/core';
import {CalculatorComponent} from './calculator/calculator.component';
import {ButtonsComponent} from './buttons/buttons.component';
<<<<<<< HEAD
import {ResultListComponent} from './result-list/result-list.component';

interface ResultsList{
	id: number;
	value: number;
	equation: string;
}
=======
import {ResultsList} from './results-list';
>>>>>>> origin/master

@Injectable()
export class CalculatorService {

<<<<<<< HEAD
	/*
	 * calculator equation to be solved
	 * value of display section
	*/
	public equation: string = "0";
	// last solved result
	public result: number = null;
	// limit of characters that can be displayed
=======
	public equation: string = "0";
	public result: number = null;
>>>>>>> origin/master
	public digit_limit: number = 12;
	public is_reseted: boolean = true;
	public can_add_operator: boolean = false;

<<<<<<< HEAD
	// list of ids for result list
=======
>>>>>>> origin/master
	public result_list_ids: number[] = [0];
	public result_list: ResultsList[] = [];

	public memory: number = null;

<<<<<<< HEAD
	/*
	 * @returns {number} the length of equation string
	*/
=======
	// returns the length of current equation string
>>>>>>> origin/master
	public getEquationLength(){
		return this.equation.length;
	}

<<<<<<< HEAD
	/*
	 * adds record to the result-list component
	 * @param value - numeric value to be added
	 * @param equation - the equation string from which the result was calculated
	*/
	public addToResultList(value: number, equation: string){
		let id = this.result_list_ids[this.result_list_ids.length - 1]+1;
=======
	// adds record to the result-list component
	public addToResultList(value: number, equation: string){
		let id = this.result_list_ids[this.result_list_ids.length - 1]+1
>>>>>>> origin/master
		this.result_list_ids.push(id);
		this.result_list.unshift({
			id: id,
			value: value,
			equation: equation
<<<<<<< HEAD
		});
	}

	/*
	 * removes record from the result-list component
	 * @param id - the id of result item to be deleted
	*/
=======
		})
	}

	// removes record from the result-list component
>>>>>>> origin/master
	public removeFromResultList(id: number){
		for(var i = 0; i < this.result_list.length; i++) {
		    if(this.result_list[i].id == id) {
		        this.result_list.splice(i, 1);
		        break;
		    }
		}
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
