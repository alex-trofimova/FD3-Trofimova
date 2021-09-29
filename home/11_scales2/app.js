//Описание Классов
//1.
var Apple = /** @class */ (function () {
    function Apple(_scale) {
        this.name = 'apple';
        this.scale = _scale;
    }
    Apple.prototype.getName = function () {
        return this.name;
    };
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    return Apple;
}());
//2.
var Tomato = /** @class */ (function () {
    function Tomato(_scale) {
        this.name = 'tomato';
        this.scale = _scale;
    }
    Tomato.prototype.getName = function () {
        return this.name;
    };
    Tomato.prototype.getScale = function () {
        return this.scale;
    };
    return Tomato;
}());
//3.
var Scales = /** @class */ (function () {
    function Scales() {
        this.productsArr = [];
    }
    Scales.prototype.add = function (_product) {
        this.productsArr.push(_product);
    };
    Scales.prototype.getNameList = function () {
        var productList = [];
        for (var i = 0; i < this.productsArr.length; i++) {
            var productName = this.productsArr[i].getName();
            productList.push(productName);
        }
        return productList;
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        for (var i = 0; i < this.productsArr.length; i++) {
            var productScale = this.productsArr[i].getScale();
            sumScale += productScale;
        }
        return sumScale;
    };
    return Scales;
}());
//Создание объектов Классов
var scales = new Scales();
var greenApple = new Apple(90);
var redApple = new Apple(75);
var smallTomato = new Tomato(30);
var bigTomato = new Tomato(90);
//Вызов функций 
scales.add(greenApple);
scales.add(redApple);
scales.add(smallTomato);
scales.add(bigTomato);
console.log(scales.getNameList());
console.log(scales.getSumScale());
//# sourceMappingURL=app.js.map