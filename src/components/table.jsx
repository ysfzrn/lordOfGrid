import React from 'react';
import Header from './header';
import Body from './body';
import _ from 'underscore';



var Table = React.createClass({
    

    handleRowSelect:function(data){
	    if (this.props.selectable) {
	      const position = this.props.selectedItems.indexOf(data);
	      const newSelected = [...this.props.selectedItems];
	      
	      if (position !== -1) {
	      	 newSelected.splice(position, 1);
	      } else {
	      	 if(this.props.multiselectable){
	      	    newSelected.push(data);
	      	 }else{
	      	 	newSelected.splice(position, 1);
	      	 	newSelected.push(data);
	      	 }
	      }

	      this.props.onSelect(newSelected);
	    }
	    
     },
     onTrDoubleClick:function(e){
     	this.props.onTrDoubleClick(e);
     },
     
     handleEditEnter:function(value){
        this.props.handleEditEnter(value);
     },

    renderBody:function(){
     const rows = _.map(this.props.data,function(data, index){
      return (
        <Body
          data={data}
          key={index}
          data-idx={index}
          tridx={index}
          fullData={this.props.data}
          onTrDoubleClick={this.onTrDoubleClick}
          editState={this.props.editState}
          selectedRow={this.props.selectedRow}
          selectedCell={this.props.selectedCell}
          selectedColumn={this.props.selectedColumn}
          handleEditEnter={this.handleEditEnter}
          columns={this.props.columns}
          selectable={this.props.selectable}
          onSelect={this.handleRowSelect.bind(this, data)}
          selected={this.props.selectedItems.indexOf(data) !== -1}
          />
      );
    }.bind(this));
    return <tbody>{rows}</tbody>;

   },


    render: function() {
    	var divStyle={'overflow':'scroll',
    				  'height':'500px'}

		return (
 			<div style={divStyle}>
 			 <table  className={this.props.className}>
			  <Header columns={this.props.columns} 
                  headerStyle={this.props.headerStyle}
                  headerRowStyle={this.props.headerRowStyle}
                    headerClassName={this.props.headerClassName}
                    selectable={this.props.selectable}
                    headerFullSelect={this.props.headerFullSelect}
                    multiselectable={this.props.multiselectable}
                    onHeaderCheck={this.props.onHeaderCheck}
                    />
			   {this.renderBody()}
			 </table>  
			</div> 
		);
	}

});

module.exports = Table;