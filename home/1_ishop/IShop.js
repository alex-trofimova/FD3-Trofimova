var IShopProductsList = React.createClass({

    displayName: 'IShopProductsList',

    getDefaultProps: function() {
        return { ishopTitle: "Нет названия у интернет-магазина" }
    },

    render: function() {
        var productsInfo=[];
        
        function createTheTable(elem, i, arr) {
            if (!(i===0)) {
                var elemInfo=        
                    React.DOM.tr({key:elem.code, className:'Product'},
                        React.DOM.td({className:'ProductName'}, elem.productName),
                        React.DOM.td({className:'ProductPrice'}, elem.price),
                        React.DOM.td({className:'ProductPhoto'}, 
                            React.DOM.a({href: elem.photo, target: '_blank'}, 
                                React.DOM.img({src: elem.photo, width: '100px'}))),
                        React.DOM.td({className:'ProductResidue'}, elem.residue),
                    );
            }

            else return;
            
            return elemInfo;
        }

        var infoArr = this.props.products;
        productsInfo.push(infoArr.map(createTheTable)); 
        

        return React.DOM.div( {className:'IShopProductsList'},
            React.DOM.table( {className:'IShopInfo'}, 
                React.DOM.caption( {className:'IShopTitle'}, this.props.title+', ассортимент товаров'),
                React.DOM.thead( {className:'HeaderContent'}, 
                    React.DOM.tr({className:'TableHeader'},
                        React.DOM.th({className:'HeaderProductName'}, this.props.products[0].productName),
                        React.DOM.th({className:'HeaderProductPrice'}, this.props.products[0].price),
                        React.DOM.th({className:'HeaderProductPhoto'}, this.props.products[0].photo),
                        React.DOM.th({className:'HeaderProductResidue'}, this.props.products[0].residue)
                    )
                ),
                React.DOM.tbody( {className:'IShopContent'}, productsInfo),
            )
        )
    },
})