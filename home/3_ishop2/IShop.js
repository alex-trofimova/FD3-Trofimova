var IShop = React.createClass({

    displayName: 'IShop',

    propTypes: {
        title: React.PropTypes.string.isRequired,
        products:React.PropTypes.arrayOf(
          React.PropTypes.shape({
            productName: React.PropTypes.string.isRequired,
            code: React.PropTypes.number.isRequired,
            price: React.PropTypes.number.isRequired,
            url: React.PropTypes.string.isRequired,
            residue: React.PropTypes.number.isRequired,
            //initRowStyle: React.PropTypes.string.isRequired,
          })
        )
    },


    getInitialState: function() {
        return { 
          selectedProductCode: null,
          deletedProductCode: null,
        };
    },

    productToRemove: function(code) {
        console.log('планируется удалить продукт с кодом '+code);
        this.setState( {deletedProductCode:code} );
    },

    productSelected: function(code){
        console.log('выбран продукт с кодом '+code);
        this.setState( {selectedProductCode:code} );
    },

    render: function() {
        var ishopTableContent=this.props.products.map( elem =>
          React.createElement(Product, {key:elem.code, productName:elem.productName, code:elem.code,
                                        price:elem.price, url:elem.url, residue:elem.residue,
                                        initRowStyle:initialRowStyle,
                                        cbSelected:this.productSelected,
                                        cbToRemove:this.productToRemove,
                                        selectedProductCode:this.state.selectedProductCode,} )
        );

        return React.DOM.div( {className:'IShopProductsList'},
            React.DOM.table( {className:'IShopInfo'}, 
                React.DOM.caption( {className:'IShopTitle'}, this.props.title+', ассортимент товаров'),
                React.DOM.thead( {className:'HeaderContent'}, 
                    React.DOM.tr({className:'TableHeader'},
                        React.DOM.th({className:'HeaderProductName'}, 'товар'),
                        React.DOM.th({className:'HeaderProductPrice'}, 'цена'),
                        React.DOM.th({className:'HeaderProductPhoto'}, 'ссылка'),
                        React.DOM.th({className:'HeaderProductResidue'}, 'остаток'),
                        React.DOM.th({className:'HeaderProductControl'}, 'управление')
                    )
                ),
                React.DOM.tbody( {className:'IShopContent'}, ishopTableContent),
            )
        );
    },
})