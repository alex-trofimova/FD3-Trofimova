var IShopProductsList = React.createClass({

    displayName: 'IShopProductsList',

    getDefaultProps: function() {
        return { ishopTitle: "Нет названия у интернет-магазина" }
      },

      render: function() {
        var productsInfo=[];
        
        function createTheTable(elem, i, arr) {
            if (i===0) {
                var elemInfo= 
                    React.DOM.tr({className:'TableHeader'},
                        React.DOM.th({className:'HeaderProductName'}, elem.productName),
                        React.DOM.th({className:'HeaderProductPrice'}, elem.price),
                        React.DOM.th({className:'HeaderProductPhoto'}, elem.photo),
                        React.DOM.th({className:'HeaderProductResidue'}, elem.residue)
                );
            }

            else {
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
            
            return elemInfo;
        }

        var infoArr = this.props.products;
        productsInfo.push(infoArr.map(createTheTable)); 
        

        return React.DOM.div( {className:'IShopProductsList'},
            React.DOM.table( {className:'IShopInfo'}, 
                React.DOM.caption( {className:'IShopTitle'}, this.props.title+', ассортимент товаров'), 
                productsInfo
            )
        )
    },


    // render: function() {
    //     var productsInfo=[];
    //     for ( var i=1; i<this.props.products.length; i++ ) {
    //     var product=this.props.products[i];
    //     var productInfo=        
    //         React.DOM.tr({key:product.code, className:'Product'},
    //             React.DOM.td({className:'ProductName'}, product.productName),
    //             React.DOM.td({className:'ProductPrice'}, product.price),
    //             React.DOM.td({className:'ProductPhoto'}, 
    //                 React.DOM.a({href: product.photo, target: '_blank'}, 
    //                     React.DOM.img({src: product.photo, width: '100px'}))),
    //             React.DOM.td({className:'ProductResidue'}, product.residue),
    //         );
    //     productsInfo.push(productInfo);
    //     }

    //     return React.DOM.div( {className:'IShopProductsList'},
    //         React.DOM.table( {className:'IShopInfo'}, 
    //             React.DOM.caption( {className:'IShopTitle'}, this.props.title+', ассортимент товаров'),
    //             React.DOM.tr({className:'TableHeader'},
    //                 React.DOM.th({className:'HeaderProductName'}, this.props.products[0].productName),
    //                 React.DOM.th({className:'HeaderProductPrice'}, this.props.products[0].price),
    //                 React.DOM.th({className:'HeaderProductPhoto'}, this.props.products[0].photo),
    //                 React.DOM.th({className:'HeaderProductResidue'}, this.props.products[0].residue)),
    //             productsInfo)
    //     )
    // },

})