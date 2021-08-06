var Product = React.createClass({

    displayName: 'Product',

    propTypes: {
        productName: React.PropTypes.string.isRequired,
        code: React.PropTypes.number.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        residue: React.PropTypes.number.isRequired,
        initRowStyle: React.PropTypes.string.isRequired,
        cbSelected: React.PropTypes.func.isRequired,
        cbToRemove: React.PropTypes.func.isRequired,
        selectedProductCode: React.PropTypes.number, // может быть null, пока ни один товар не выбран
        deletedProductCode: React.PropTypes.number, // может быть null, пока ни один товар не выбран для удаления
    },

    getInitialState: function() {
        return { 
          rowStyle:this.props.initRowStyle,
        };
      },

    productClicked: function(EO) {
        this.props.cbSelected(this.props.code); 
        console.log('выбран товар '+this.props.code); 
    },

    delete: function(EO){
        this.props.cbToRemove(this.props.code);
        console.log('нужно удалить товар '+this.props.code);
    },

    render: function() {
        if ( this.props.deletedProductCode==this.props.code ) {
            return null;
        }
        else {
            return React.DOM.tr( {className: ((this.props.selectedProductCode!=this.props.code)?'ProductInfo_init':'ProductInfo_select') , 
                                        onClick: this.productClicked},
                    React.DOM.td({className:'ProductCell ProductName '+this.props.code},this.props.productName),
                    React.DOM.td({className:'ProductCell ProductPrice'},this.props.price),
                    React.DOM.td({className:'ProductCell ProductUrl'},
                        React.DOM.a({href:this.props.url, target:'_blank'},
                            React.DOM.img({src:this.props.url, width:'100px'}))
                    ),
                    React.DOM.td({className:'ProductCell ProductResidue'},this.props.residue),
                    React.DOM.td({className:'ProductCell ProductDelete'}, 
                        React.DOM.button( {value:this.props.code, onClick:this.delete}, 'удалить' )
                    ),  
            );
        }        
      },

})