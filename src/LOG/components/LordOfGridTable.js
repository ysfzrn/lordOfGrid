import React from 'react';
import LordOfGridHeader from './LordOfGridHeader';
import LordOfGridBody from './LordOfGridBody';
import _ from 'underscore';

var LordOfGridTable = React.createClass({
    componentDidMount:function(){
    	$(function(){
           $('#myTable').colResizable({
           	  fixed:false,
           	  minWidth:30,
           	  liveDrag:true,
           	  gripInnerHtml:"<div className='grip'></div>",
           	  draggingClass:"dragging",
           	  postbackSafe:true,
		partialRefresh:true
		  });

        });


    },

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
        <LordOfGridBody
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
    	var divStyle={'overflowX':'hidden',
                    'overflowY':'scroll',
    				        'height':'500px'}

		return (
 			<div className="col col-sm-4 col-md-12"  style={divStyle}>
 			 <table id='myTable' className={this.props.tableClass}>
			   <LordOfGridHeader headerClass={this.props.headerClass} 
			                     columns={this.props.columns} 
			                     selectable={this.props.selectable}
			                     onHeaderCheck={this.props.onHeaderCheck}
			                     headerFullSelect={this.props.headerFullSelect}
			                     multiselectable={this.props.multiselectable} />
			   {this.renderBody()}
			 </table>  
			</div> 
		);
	}

});

module.exports = LordOfGridTable;