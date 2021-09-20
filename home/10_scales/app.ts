//Описание Классов

class Product {
    name:string;
    scale:number;

    constructor(_name:string, _scale:number) {
        this.name=_name; 
        this.scale=_scale; 
    }

    getName():string {
        return this.name;
    }

    getScale():number {
        return this.scale;
    }  
}

class Apple extends Product {

    constructor(_name:string, _scale:number) {
        super(_name, _scale); //вызов конструктора класса-предка
    }
}

class Tomato extends Product {

    constructor(_name:string, _scale:number) {
        super(_name, _scale); //вызов конструктора класса-предка
    }
}

class Scales {
    productsArr:Array<Product>;

    constructor() {
        this.productsArr=[]; 
    }

    add(_product:Product){
        this.productsArr.push(_product);
    }

    getNameList():Array<string>{
        let productList=[];
        for (let i=0; i<this.productsArr.length; i++ ) {
            let productName=this.productsArr[i].getName();
            productList.push(productName);
        }
        return productList;   
    }

    getSumScale():number{
        let sumScale=0;
        for (let i=0; i<this.productsArr.length; i++ ) {
            let productScale=this.productsArr[i].getScale();
            sumScale+=productScale;
        }
        return sumScale;
    }
}

//Создание объектов Классов
let scales:Scales=new Scales();
let greenApple:Apple=new Apple("green apple", 80);
let redApple:Apple=new Apple("red apple", 75);
let smallTomato:Tomato=new Tomato("small tomato", 30);
let bigTomato:Tomato=new Tomato("big tomato", 90);

//Вывоз функций 
scales.add(greenApple);
scales.add(redApple);
scales.add(smallTomato);
scales.add(bigTomato);

console.log(scales.getNameList());
console.log(scales.getSumScale());




