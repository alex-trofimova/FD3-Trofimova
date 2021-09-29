//Описание Класса Product
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
        this._name = _name;
        this._scale = _scale;
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: false,
        configurable: true
    });
    return Product;
}());
//Описание Класса механизма хранения в массиве, ScalesStorageEngineArray
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.productsArr = [];
    }
    // добавить продукт на весы
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.productsArr.push(item);
    };
    // получить взвешиваемый продукт
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.productsArr[index];
    };
    //посчитать продукты на весах
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.productsArr.length;
    };
    return ScalesStorageEngineArray;
}());
//Описание Класса механизма хранения в localStorage, ScalesStorageEngineLocalStorage
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.localStorageKey = "productsArr";
    }
    // добавить продукт на весы
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        var storage;
        if (localStorage.getItem(this.localStorageKey) == null) {
            storage = [];
        }
        else
            storage = JSON.parse(localStorage.getItem(this.localStorageKey));
        storage.push(item);
        localStorage.setItem(this.localStorageKey, JSON.stringify(storage));
    };
    // получить взвешиваемый продукт
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var storage;
        storage = JSON.parse(localStorage.getItem(this.localStorageKey));
        return new Product(storage[index]._name, storage[index]._scale);
    };
    //посчитать продукты на весах
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        var storage;
        storage = JSON.parse(localStorage.getItem(this.localStorageKey));
        return storage.length;
    };
    return ScalesStorageEngineLocalStorage;
}());
//Описание параметризованного Класса Scales
var Scales = /** @class */ (function () {
    function Scales(_se) {
        this.storageEngine = null;
        this.storageEngine = _se;
    }
    Scales.prototype.getNameList = function () {
        var productList = [];
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            var product = this.storageEngine.getItem(i);
            var productName = product.name;
            productList.push(productName);
        }
        return productList;
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            var product = this.storageEngine.getItem(i);
            var productScale = product.scale;
            sumScale += productScale;
        }
        return sumScale;
    };
    return Scales;
}());
//Создание объектов Класса StorageEngine с различными механизмами хранения
// и соответствующих объектов Класса Scales
//хранение в массиве
var storageEA = new ScalesStorageEngineArray();
var scales1 = new Scales(storageEA);
//хранение в localStorage
var storageELS = new ScalesStorageEngineLocalStorage();
var scales2 = new Scales(storageELS);
//Создание объектов Класса Product
var greenApple = new Product("green apple", 80);
var redApple = new Product("red apple", 70);
var yellowApple = new Product("yellow apple", 65);
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
//# sourceMappingURL=app.js.map