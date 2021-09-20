//Описание Классов
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.scale;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(_name, _scale) {
        return _super.call(this, _name, _scale) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(_name, _scale) {
        return _super.call(this, _name, _scale) || this;
    }
    return Tomato;
}(Product));
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
var scales = new Scales();
var greenApple = new Apple("green apple", 80);
var redApple = new Apple("red apple", 75);
var smallTomato = new Tomato("small tomato", 30);
var bigTomato = new Tomato("big tomato", 90);
scales.add(greenApple);
scales.add(redApple);
scales.add(smallTomato);
scales.add(bigTomato);
console.log(scales.getNameList());
console.log(scales.getSumScale());
//# sourceMappingURL=app.js.map