var FilterBlock = React.createClass({

    displayName: 'FilterBlock',

    propTypes: {       
      initWordsList: React.PropTypes.array.isRequired, //массив из слов
      startShowMode: React.PropTypes.number.isRequired, // состояние отображения списка: 1 - без сортировки, 2 - сортировка в алфавитном порядке
      initfilterFieldText: React.PropTypes.string.isRequired, // содержимое текстового поля - параметр фильтровки
    },


    getInitialState: function() {
      return { 
        filterFieldText:this.props.initfilterFieldText,
        showMode:this.props.startShowMode,
        wordsList:this.props.initWordsList,
      };
    },

    // описание функции при вводе букв в текстовом поле - меняется соответствующее значение state
    filterFieldTextChanged: function(request) { 
      this.setState( {filterFieldText:request} ); 
    },

    //описание функции при нажатии кнопки сброс - возврат к исходному состоянию
    returnToInitState: function(){
      this.setState( {showMode:1} );
      this.setState( {filterFieldText:this.props.initfilterFieldText} );
    },

    //описание функции при работе с чекбоксом - для сортировки
    sortWords: function() {
      if (this.state.showMode==1) {
        this.setState( {showMode:2} );
      }

      if (this.state.showMode==2) {
        this.setState( {showMode:1} );
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
            React.DOM.input( {type:'checkbox',defaultChecked:false, onChange:this.sortWords} ),

            //отрисовка дочернего компонента
            React.createElement(FilterOption, 
              {filterFieldText:this.state.filterFieldText,
              cbfilterFieldTextChanged:this.filterFieldTextChanged,  
              } ),
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