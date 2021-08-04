var FilterBlock = React.createClass({

    displayName: 'FilterBlock',

    propTypes: {       
      initWordsList: React.PropTypes.array.isRequired, //массив из слов
      startShowMode: React.PropTypes.number.isRequired, // состояние отображения списка: 1 - без сортировки, 2 - сортировка в алфавитном порядке
      initfilterFieldText: React.PropTypes.string.isRequired, // содержимое текстового поля - параметр фильтровки
      initisSorted: React.PropTypes.bool.isRequired, // состояние чекбокса: true - checked = true, false - checked = false
    },


    getInitialState: function() {
      return { 
        filterFieldText:this.props.initfilterFieldText,
        showMode:this.props.startShowMode,
        wordsList:this.props.initWordsList,
        isSorted:this.props.initisSorted,
      };
    },

    // описание функции при вводе букв в текстовом поле - меняется соответствующее значение state
    filterFieldTextChanged: function(EO) { 
      this.setState( {filterFieldText:EO.target.value} ); 
    },

    //описание функции при нажатии кнопки сброс - возврат к исходному состоянию
    returnToInitState: function(){
      this.setState( {showMode:1} );
      this.setState( {isSorted:false} );
      this.setState( {filterFieldText:''} );
    },

    //описание функции при работе с чекбоксом - для сортировки
    sortWords: function() {
      if (this.state.showMode==1) {
        this.setState( {showMode:2} );
        this.setState( {isSorted:true} );
      }

      if (this.state.showMode==2) {
        this.setState( {showMode:1} );
        this.setState( {isSorted:false} );
      } 
    },

    //описание функции отрисовки компоненты
    render: function() {

      //фильтр (массив "обрезается" до элементов, содержащих буквы текстового поля)
      var currWordsListArr = this.state.wordsList.filter(elem => !(elem.indexOf(this.state.filterFieldText)==-1));

      //сортировка
      if ( this.state.showMode==1 ) {
        var drawWordsListArr = currWordsListArr;
      }

      if ( this.state.showMode==2 ) {
        var coppyArr = currWordsListArr.slice(); //чтобы запомнить искомый порядок слов в массиве
        drawWordsListArr = currWordsListArr.sort();
        currWordsListArr = coppyArr;
      }
      
      //отображение получившегося списка
      var listContent=drawWordsListArr.map( (elem, index) =>
        React.DOM.option( {key:index, className:'FilterWords', value: 'word_'+(index+1),}, 
          elem )
      );
  
        return React.DOM.div( {className:'FilterWrapper'},

          React.DOM.div( {className:'FilterOptions'},
            //чекбокс
            React.DOM.input( {type:'checkbox',checked:this.state.isSorted, 
                              onClick:this.sortWords} ),
            //текстовое поле
            React.DOM.input( {type:'text',name:'CutOption',className:'FilterField',
                              value:this.state.filterFieldText, 
                              onChange:this.filterFieldTextChanged} ),
            //кнопка сброс
            React.DOM.input( {type:'button',value:'сброс', onClick:this.returnToInitState} ),
          ),
          
          //выпадающий список
          React.DOM.select( {multiple:true, name:'WordsList', className:'FilterWordsList'}, 
            listContent
          ),
        )  
    },
})