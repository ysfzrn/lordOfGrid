import Checkbox from 'material-ui/lib/checkbox';

const Header = React.createClass({
    renderSelectCell:function(){
		if(!this.props.multiselectable){
			var selectCell = (
           <th style={this.props.style?this.props.style:this.props.headerStyle} width="27px" key='select'>
             #
           </th> );
		}
		else if(this.props.selectable && this.props.multiselectable ){
			var selectCell = (
           <th style={this.props.style?this.props.style:this.props.headerStyle} width="27px" key='select'>
             <Checkbox  onCheck={this.onHeaderCheck} checked={this.props.headerFullSelect}    />
           </th>
           );
		}

		return selectCell;

	},


	onHeaderCheck:function(){
		this.props.onHeaderCheck()
	},


	renderHeader:function(){
		var self = this.props;
		var itemHeads = self.columns.map(function(item, index){
			return(<Title  columndataKey={item.dataKey} 
				           data-reactid={index}
						   columnIndex={index} 
				           key={index} 
				           title={item.title}
				           headerStyle={self.headerStyle}
				           className={self.headerClassName}
				           headerColSpan={item.colspan}
				           toolTip={item.tooltip}
				           style={item.style} />)
		}.bind(this))
		return itemHeads;
	},

	render: function() {
		var theadStyle={'display': 'table-header-group',
						'verticalAlign':'middle',
						'borderColor':'inherit',
		                'position':'fixed',
		                'width':'100%' }
		return (
			<thead   className={this.props.headerClassName}>
			  <tr style={this.props.headerRowStyle}>
			  	{[this.renderSelectCell(),this.renderHeader()]}
			  </tr>
			</thead>
		);
	}

});


var Title = React.createClass({
	render:function(){
		return(<th style={this.props.style?this.props.style:this.props.headerStyle}
			       colSpan={this.props.headerColSpan?this.props.headerColSpan:0} 
			       title={this.props.toolTip?this.props.toolTip:this.props.title} >
			     {this.props.title ? this.props.title : this.props.columndataKey}
			    </th>
		);
	},

})

module.exports = Header;