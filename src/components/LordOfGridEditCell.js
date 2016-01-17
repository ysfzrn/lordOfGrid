import React from 'react';
import ClassNames from 'classnames';


var LordOfGridEditCell = React.createClass({

	renderEditCell:function(){
		var inputType = this.props.inputType;
		var inputValue = this.props.inputValue;
		var key = this.props.key;
		var checked = this.props.checked;


		if(inputType==="date"){
          
          var inputDate =  new Date(inputValue);

	       return ( <form onSubmit={this.handleEditEnter.bind(null, key, inputType)}> 
	       	          <input type="date" ref="dtp" defaultValue={inputDate} />
                    </form>)
	    }
	    else if(inputType==="checkbox"){
	       return  (<form onSubmit={this.handleEditEnter.bind(null, key, inputType)}> 
	       	          <input type="checkbox" checked={checked} ref="cb" />	       	          
                    </form> ) 
	     }
	     else if(inputType==="number"){
	     	console.log('asdas');
	       return ( <form onSubmit={this.handleEditEnter.bind(null, key, inputType)}>
	       	          <input type="number" ref="txtfnumber" className="form-control" defaultValue={inputValue} /> 
                    </form> )

	     }else {
	        return (<form onSubmit={this.handleEditEnter.bind(null, key, inputType)}>
	                    <input type="text" ref="txtftext" className="form-control" defaultValue={inputValue} /> 
                    </form>)  
	     }

	},



  handleEditEnter:function(key, type, event){
    var value='';
    if(type==='checkbox'){
       value = this.refs.cb.checked;
    }
    else if(type==='date'){
       value = this.refs.dtp.value;
    }
    else if(type==='number'){
       value = this.refs.txtfnumber.value; 
    }
    else{
       value = this.refs.txtftext.value; 
    }
    
    this.inputEnterEvent(value);
  },

  inputEnterEvent(value){
  	this.props.handleEditEnter(value);
  },

	render: function() {
		

		return (
			<div onBlur={this.props.editFocusOut}>
				{this.renderEditCell()}
			</div>
		);
	}

});

module.exports = LordOfGridEditCell;