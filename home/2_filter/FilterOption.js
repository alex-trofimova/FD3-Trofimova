var FilterOption = React.createClass({

    displayName: 'FilterOption',

    propTypes: {       
      filterFieldText: React.PropTypes.string.isRequired,
      cbfilterFieldTextChanged: React.PropTypes.func.isRequired,   
    },

    filterFieldTextChanged: function(EO) { 
      this.props.cbfilterFieldTextChanged(EO.target.value); 
    },


    render: function() {
      return React.DOM.input( {type:'text',name:'CutOption',className:'FilterField',
                              defaultValue:this.props.filterFieldText, onChange:this.filterFieldTextChanged} )
    },             
})