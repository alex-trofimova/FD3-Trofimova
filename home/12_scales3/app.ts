//Описание Класса Product
class Product {
    
    constructor(private _name:string, private _scale:number) {
        this._name=_name; 
        this._scale=_scale; 
    }

    get name():string {
        return this._name;
    }

    get scale():number {
        return this._scale;
    }  
}

//Описание Интерфейса
interface IStorageEngine{
    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
}

//Описание Класса механизма хранения в массиве, ScalesStorageEngineArray
class ScalesStorageEngineArray {
    
    productsArr:Array<Product>;

    constructor() {
        this.productsArr=[];
    }

    // добавить продукт на весы
    addItem(item:Product):void {
        this.productsArr.push(item)
    }

    // получить взвешиваемый продукт
    getItem(index:number):Product {
        return this.productsArr[index];
    }

    //посчитать продукты на весах
    getCount():number {
        return this.productsArr.length;
    }  
}

//Описание Класса механизма хранения в localStorage, ScalesStorageEngineLocalStorage
class ScalesStorageEngineLocalStorage {
    
    localStorageKey:string="productsArr";

    // добавить продукт на весы
    addItem(item:Product):void {
        let storage:Array<Product>;

        if (localStorage.getItem(this.localStorageKey) == null) {
            storage = []; 
        }
        else storage = JSON.parse(localStorage.getItem(this.localStorageKey));

        storage.push(item);
        localStorage.setItem(this.localStorageKey, JSON.stringify(storage));
    }

    // получить взвешиваемый продукт
    getItem(index:number):Product {
        let storage:Array<any>;
        storage = JSON.parse(localStorage.getItem(this.localStorageKey));
        return new Product(storage[index]._name, storage[index]._scale);
    }

    //посчитать продукты на весах
    getCount():number {
        let storage:Array<Product>;
        storage = JSON.parse(localStorage.getItem(this.localStorageKey));
        return storage.length;
    }  
}

//Описание параметризованного Класса Scales
class Scales<StorageEngine extends IStorageEngine> {

    storageEngine:StorageEngine=null;

    constructor(_se:StorageEngine) {
        this.storageEngine=_se;
    }

    getNameList():Array<string>{
        let productList:Array<string>=[];
        for (let i:number=0; i<this.storageEngine.getCount(); i++ ) {
            let product:Product=this.storageEngine.getItem(i);
            let productName:string=product.name;
            productList.push(productName);
        }
        return productList;   
    }

    getSumScale():number{
        let sumScale=0;
        for (let i:number=0; i<this.storageEngine.getCount(); i++ ) {
            let product:Product=this.storageEngine.getItem(i);
            let productScale=product.scale;
            sumScale+=productScale;
        }
        return sumScale;
    }   
}


//Создание объектов Класса StorageEngine с различными механизмами хранения
// и соответствующих объектов Класса Scales

//хранение в массиве
let storageEA:ScalesStorageEngineArray=new ScalesStorageEngineArray();
let scales1:Scales<ScalesStorageEngineArray>=new Scales(storageEA);

//хранение в localStorage
let storageELS:ScalesStorageEngineLocalStorage=new ScalesStorageEngineLocalStorage();
let scales2:Scales<ScalesStorageEngineLocalStorage>=new Scales(storageELS);

//Создание объектов Класса Product
let greenApple:Product=new Product("green apple", 80);
let redApple:Product=new Product("red apple", 70);
let yellowApple:Product=new Product("yellow apple", 65);

//Вызов функций 
storageEA.addItem(greenApple);
storageEA.addItem(redApple);
storageEA.addItem(yellowApple);
storageELS.addItem(greenApple);
storageELS.addItem(redApple);
storageELS.addItem(yellowApple);

//Вывод в консоль результата
console.log(scales1.getNameList());
console.log(scales1.getSumScale());

console.log(scales2.getNameList());
console.log(scales2.getSumScale());




