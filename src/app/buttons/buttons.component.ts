import { Component } from '@angular/core';
import {CalculatorComponent} from '../calculator/calculator.component';
import {CalculatorService} from '../calculator.service';
import {ResultListComponent} from '../result-list/result-list.component';
import {ResultListService} from '../result-list.service';
import {ButtonsList} from '../buttons-list';

@Component({
  moduleId: module.id,
  selector: '[id=buttons-section]',
  templateUrl: 'buttons.component.html',
  styleUrls: ['buttons.component.css']
})

export class ButtonsComponent {

	constructor(public calc_service: CalculatorService) {};
	
	public buttons = new ButtonsList(this).buttons;

	private wrote_memory: boolean = false;
	private reset_on_click: boolean = false;

	addNumber(num: number){
		if(this.calc_service.getEquationLength() >= this.calc_service.digit_limit){
			return false;
		}
		if(this.reset_on_click){
			this.reset();
		}
		if(!this.calc_service.is_reseted){
			this.calc_service.equation += num;
			this.calc_service.can_add_operator = true;
		}else if(num != 0){
			this.calc_service.equation = num.toString();
			this.calc_service.is_reseted = false;
			this.calc_service.can_add_operator = true;
			this.wrote_memory = false;
		}
		this.reset_on_click = false;
	}

	addOperator(operator: string){
		if(this.calc_service.getEquationLength() >= this.calc_service.digit_limit){
			return false;
		}
		if(this.reset_on_click){
			this.reset_on_click = false;
		}
		if(this.calc_service.equation == "0" && operator == "-"){
			this.calc_service.equation = operator;
			this.calc_service.can_add_operator = false;
			this.wrote_memory = false;
			this.calc_service.is_reseted = false;
			return true;
		}
		if(this.calc_service.can_add_operator){
			this.calc_service.equation += operator;
			this.calc_service.can_add_operator = false;
			this.wrote_memory = false;
			return true;
		}
	}

	solve(eq: string){
		try{
			return eval(eq);
		}catch(Exception){
			return null;
		}
	}

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

	reset(){
		this.calc_service.equation = "0";
		this.calc_service.can_add_operator = false;
		this.calc_service.is_reseted = true;
	}

	saveMemory(num: number = this.solve(this.calc_service.equation)){
		if(num != null && !this.calc_service.is_reseted){
			this.calc_service.memory = num;
		}
	}

	deleteMemory(){
		this.calc_service.memory = null;
	}

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
