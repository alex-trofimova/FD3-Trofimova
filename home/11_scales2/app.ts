//Описание Интерфейса
interface IScalable {
    getName():string;
    getScale():number
}

//Описание Классов
//1.
class Apple implements IScalable{
    name:string;
    scale:number;

    constructor(_scale:number) {
        this.name='apple'; 
        this.scale=_scale; 
    }

    getName():string {
        return this.name;
    }

    getScale():number {
        return this.scale;
    }  
}

//2.
class Tomato implements IScalable{
    name:string;
    scale:number;

    constructor(_scale:number) {
        this.name='tomato'; 
        this.scale=_scale; 
    }

    getName():string {
        return this.name;
    }

    getScale():number {
        return this.scale;
    }  
}

//3.
class Scales {
    productsArr:IScalable[];

    constructor() {
        this.productsArr=[]; 
    }

    add(_product:IScalable){
        this.productsArr.push(_product);
    }

    getNameList():Array<string>{
        let productList:Array<string>=[];
        for (let i:number=0; i<this.productsArr.length; i++ ) {
            let productName:string=this.productsArr[i].getName();
            productList.push(productName);
        }
        return productList;   
    }

    getSumScale():number{
        let sumScale=0;
        for (let i:number=0; i<this.productsArr.length; i++ ) {
            let productScale=this.productsArr[i].getScale();
            sumScale+=productScale;
        }
        return sumScale;
    }
}

//Создание объектов Классов
let scales:Scales=new Scales();
let greenApple:Apple=new Apple(90);
let redApple:Apple=new Apple(75);
let smallTomato:Tomato=new Tomato(30);
let bigTomato:Tomato=new Tomato(90);

//Вызов функций 
scales.add(greenApple);
scales.add(redApple);
scales.add(smallTomato);
scales.add(bigTomato);

console.log(scales.getNameList());
console.log(scales.getSumScale());




