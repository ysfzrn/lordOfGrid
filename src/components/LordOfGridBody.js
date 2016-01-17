import React from 'react';
import utils from '../util';
import LordOfGridEditCell from './LordOfGridEditCell';

var LordOfGridBody = React.createClass({

	propTypes: {
        data :React.PropTypes.object,
    	columns: React.PropTypes.object
	},

	//data-tdindex={idx}  row u alabilmek için
	renderRows() {
	    return Object.keys(this.props.columns).map(function(key,idx){
	      return (
					<td data-column={key} key={idx} data-tdindex={idx}>{this.renderRowCell(key)} </td>
	      	  );
	    }.bind(this));
	},
	renderRowCell(key){
	    const value = this.props.data[key];
		const inputType = utils.inputTypeForPrototype(this.props.columns[key].type);

		var editable;

		if(this.props.columns[key].editable === undefined || this.props.columns[key].editable===false){
       		editable = false;
    	}else{
            editable = true;
    	}

    	if (editable && this.props.editState &&  this.props.data=== this.props.fullData[this.props.selectedRow] && key=== this.props.selectedColumn) {
     	   return this.renderInput(key, value);
    	}
        else if(inputType ==='date'){
          const inputValue = utils.prepareValueForInput(value, inputType)
          return inputValue.toString();
	    }
	    else if (value) {
	      return value.toString();
	    }
   },

   renderInput(key, value){
    const inputType = utils.inputTypeForPrototype(this.props.columns[key].type);
    const inputValue= utils.prepareValueForInput(value, inputType);
    const checked = inputType === 'checkbox' && value ? true : null;

    var renderItems=[];

    return <LordOfGridEditCell
              inputType={inputType}
              inputValue={inputValue}
              checked={checked}
              handleEditEnter={this.handleEditEnter}
              key={key}
              editFocusOut={this.onTrDoubleClick} />

  },

  handleEditEnter:function(value){
     this.props.handleEditEnter(value);
  },

   renderSelectCell(){
    if (this.props.selectable) {
      return (
        <td>
          <input type="checkbox" checked={this.props.selected} onChange={this.props.onSelect} />    
        </td>
      );
    }
   },

   onTrDoubleClick:function(e){
   	  this.props.onTrDoubleClick(e);
   },

	render: function() {
		return (
			    <tr onDoubleClick={this.onTrDoubleClick}  key={this.props.tridx} data-idx={this.props.tridx} >
			    	{this.renderSelectCell()} 
			    	{this.renderRows()}
			    </tr>
		);
	}

});

module.exports = LordOfGridBody;