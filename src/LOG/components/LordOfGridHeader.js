import React  from 'react';

var LordOfGridHeader = React.createClass({

   getHead:function(){
		var self = this.props;
		var itemHeads = Object.keys(self.columns).map(function(item, index){
			return <th data-reactid={index} padding="0px" key={index}>{self.columns[item].header}</th>
		}.bind(this))

		return itemHeads;
	},

	getSelectable:function(){
		if(!this.props.multiselectable){
			var selectCell = (
           <th width="27px" key='select'>
             #
           </th> );
		}
		else if(this.props.selectable && this.props.multiselectable ){
			var selectCell = (
           <th width="27px" key='select'>
             <input type="checkbox" onChange={this.onHeaderCheck} checked={this.props.headerFullSelect}    />
           </th>
           );
		}

		return selectCell;

	},
	onHeaderCheck:function(){
		this.props.onHeaderCheck()
	},
	render: function() {
		return (
			<thead className={this.props.headerClass}>
			 <tr>{[this.getSelectable(),this.getHead()]}</tr>
			</thead>
		);
	}

});

module.exports = LordOfGridHeader;