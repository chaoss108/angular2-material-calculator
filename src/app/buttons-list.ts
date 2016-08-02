interface Button{
	class: string;
	value: string;
	action?: ()=> void;
}

export class ButtonsList {

	constructor(private cl) {};

	public buttons: Button[] = [
		{class:'button-memory',value:'MC',action:()=>this.cl.deleteMemory()},
		{class:'button-memory',value:'MR',action:()=>this.cl.writeMemory()},
		{class:'button-memory',value:'M+',action:()=>this.cl.memoryPlus()},
		{class:'button-memory',value:'M-',action:()=>this.cl.memoryMinus()},
		{class:'button-memory',value:'MS',action:()=>this.cl.saveMemory()},

		{class:'button-number',value:'7',action:()=>this.cl.addNumber(7)},
		{class:'button-number',value:'8',action:()=>this.cl.addNumber(8)},
		{class:'button-number',value:'9',action:()=>this.cl.addNumber(9)},
		{class:'button-operator',value:'/',action:()=>this.cl.addOperator('/')},
		{class:'button-operator',value:'DEL',action:()=>this.cl.deleteLastChar()},

		{class:'button-number',value:'4',action:()=>this.cl.addNumber(4)},
		{class:'button-number',value:'5',action:()=>this.cl.addNumber(5)},
		{class:'button-number',value:'6',action:()=>this.cl.addNumber(6)},
		{class:'button-operator',value:'*',action:()=>this.cl.addOperator('*')},
		{class:'button-operator',value:'C',action:()=>this.cl.reset()},

		{class:'button-number',value:'1',action:()=>this.cl.addNumber(1)},
		{class:'button-number',value:'2',action:()=>this.cl.addNumber(2)},
		{class:'button-number',value:'3',action:()=>this.cl.addNumber(3)},
		{class:'button-operator',value:'-',action:()=>this.cl.addOperator('-')},
		{class:'button-operator',value:''},
		
		{class:'button-number',value:'.',action:()=>this.cl.addOperator('.')},
		{class:'button-number',value:'0',action:()=>this.cl.addNumber(0)},
		{class:'button-number',value:''},
		{class:'button-operator',value:'+',action:()=>this.cl.addOperator('+')},
		{class:'button-operator',value:'=',action:()=>this.cl.equal()},
	];
}
