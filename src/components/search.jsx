import React from 'react';
import utils from '../app/util.js';

var Search = React.createClass({
   
   handleInput:function(){
   		this.props.searchInputChange(this.refs.searchInput.value);
   },


	statics:{
		filtrele:function(dataSource,searchText,initialData){
		 	 if (searchText === "" || !searchText) {
	            return initialData;
	         }
	         else {
	            return (initialData.filter(function(o) {
	            	               return (
	            	                 Object.keys(o).some(function(v, i) {
	            	                  return o[v].toString().toLowerCase().indexOf(searchText.toLowerCase())>-1	
	            	                //return o[v].toString().includes(searchText.toLowerCase());
	            	              })
	            	            )
	            	          }));
	        }	
		  }

	},

   renderSearch:function(){
		if(this.props.filterable){
			return ( 
			<form>
			  <label htmlFor="searchInput" className="control-label">Arama</label>
			  <input id="searchInput" ref="searchInput" type="text" className="form-control" onChange={this.handleInput}/>
			  <br/>
			</form>   
			);
		}
		else{
			return <div/>
		}

	},

	render: function() {
		return (
			<div>
			 {this.renderSearch()}
			</div> 
		);
	}

});

module.exports = Search;