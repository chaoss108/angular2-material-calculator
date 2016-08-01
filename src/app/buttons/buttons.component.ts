import { Component } from '@angular/core';
import {CalculatorComponent} from '../calculator/calculator.component';
import {CalculatorService} from '../calculator.service';
import {ResultListComponent} from '../result-list/result-list.component';
import {ButtonsList} from './buttons-list';

@Component({
  moduleId: module.id,
  selector: '.buttons-section',
  templateUrl: 'buttons.component.html',
  styleUrls: ['buttons.component.css']
})

export class ButtonsComponent {

	constructor(public calc_service: CalculatorService) { }
	
	// list of buttons
	public buttons = new ButtonsList(this).buttons;

	// defines if the last pressed button was MS
	private wrote_memory: boolean = false;
	// defines if the calculator will be resseted on the next button press 
	private reset_on_click: boolean = false;

	/*
	 * Adds a number to equation.
	 * @param num - number to be added
	*/
	addNumber(num: number){
		// if characters can't be added, returns false and does nothing
		if(this.calc_service.getEquationLength() >= this.calc_service.digit_limit){
			return false;
		}
		// if the last pushed button was the equal button, resets the calculator
		if(this.reset_on_click){
			this.reset();
		}
		// if 
		if(!this.calc_service.is_reseted && num != 0){
			this.calc_service.equation += num;
		}else{
			this.calc_service.equation = num.toString();
			this.calc_service.is_reseted = false;
			this.wrote_memory = false;
		}
		this.calc_service.can_add_operator = true;
		this.reset_on_click = false;
	}

	/*
	 * adds an operator to equation string
	 * @param operator - operator to be added
	*/
	addOperator(operator: string){
		// if characters can't be added, returns false and does nothing
		if(this.calc_service.getEquationLength() >= this.calc_service.digit_limit){
			return false;
		}
		// if the last pushed button was the equal button, resets the calculator
		if(this.reset_on_click){
			this.reset_on_click = false;
		}
		if(this.calc_service.equation == "0" && operator == "-"){
			this.calc_service.equation = operator;
			this.calc_service.can_add_operator = false;
			this.wrote_memory = false;
			this.calc_service.is_reseted = false;
		}
		if(this.calc_service.can_add_operator){
			this.calc_service.equation += operator;
			this.calc_service.can_add_operator = false;
			this.wrote_memory = false;
		}
	}
	/*
	 * solves a given string
	 * @param eq - string to solve
	 * @returns {number} solved string or {null} if can't be solved
	*/
	solve(eq: string){
		try{
			return eval(eq);
		}catch(Exception){
			return null;
		}
	}

	/*
	 * updates the result variable and equation string
	 * adds the result to the result list
	*/
	equal(){
		let eq = this.calc_service.equation;
		if(eq.indexOf('M') != -1 && this.calc_service.memory != null){
			eq = this.calc_service.equation.split('M').join(this.calc_service.memory.toString());
		}
		this.calc_service.result = this.solve(eq);
		if(this.calc_service.result != null && eq != '0'){
			this.calc_service.equation = this.calc_service.result.toString();
			this.calc_service.addToResultList(this.calc_service.result, eq);
			this.wrote_memory = false;
			this.reset_on_click = true;
		}
	}

	/*
	 * deletes the last character of equation string if it isn't reseted
	*/
	deleteLastChar(){
		if(this.reset_on_click){
			this.reset();
			return true;
		}
		if(this.calc_service.getEquationLength() != 1){
			this.calc_service.equation = this.calc_service.equation.slice(0,-1);
			this.calc_service.can_add_operator = true;
		}else{
			this.reset();
			this.calc_service.can_add_operator = false;
		}
	}

	/*
	 * resets the calculator
	 * sets equation string to 0
	*/
	reset(){
		this.calc_service.equation = "0";
		this.calc_service.can_add_operator = false;
		this.calc_service.is_reseted = true;
	}

	/*
	 * saves a number to the memory
	 * @param num - number to save
	*/
	saveMemory(num: number = this.solve(this.calc_service.equation)){
		if(num != null && !this.calc_service.is_reseted){
			this.calc_service.memory = num;
		}
	}

	/*
	 * deletes the memory
	*/
	deleteMemory(){
		this.calc_service.memory = null;
	}

	/*
	 * 
	*/
	memoryPlus(){
		let res:number = this.solve(this.calc_service.equation);
		if(res != null){
			this.saveMemory(res + this.calc_service.memory);
		}
	}

	memoryMinus(){
		let res:number = this.solve(this.calc_service.equation);
		if(res != null){
			this.saveMemory(this.calc_service.memory - res);
		}
	}

	/*
	 * adds M to equation string, which will be replaced by the memory variable
	*/
	writeMemory(){
		if(this.calc_service.getEquationLength() >= this.calc_service.digit_limit || this.wrote_memory || this.calc_service.memory == null){
			return false;
		}
		if(!this.calc_service.is_reseted){	
			this.calc_service.equation += "M";
		}else{
			this.calc_service.equation = "M";
			this.calc_service.is_reseted = false;
		}
		this.wrote_memory = true;
		this.calc_service.can_add_operator = true;
	}
}