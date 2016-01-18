var React = require('react');
import util from './util';
var LordOfGridTable = require('./components/LordOfGridTable');
var LordOfGridSearch = require ('./components/LordOfGridSearch');
import LordOfGridPagination from './components/LordOfGridPagination';
import colResizable from './plugins/colResizable-1.5.min';


var LordOfGrid = React.createClass({
	
	getInitialState: function() {
        return{dataSource:[],
               initialData:[],
               selectedItems:[],
               fullSelected:false,
               page: 1,
      		   displayCount: 10,
      		   editState:false,
      		   selectedRow:-1,
      		   selectedCell:-1,
      		   selectedColumn:'' };
    },

	 getDefaultProps:function(){
			return {  sourceUrl:'',
					  columns:[],
					  tableClass:"table table-bordered table-hover  table-striped",
					  headerClass:"thead-inverse",
					  filterable:true,
					  selectable:true,
					  multiselectable:false,
					  pagination:true
					}
	 },

	propTypes: {
		 sourceUrl:React.PropTypes.string,
		 columns: React.PropTypes.object,
		 headerClass:React.PropTypes.string,
		 tableClass:React.PropTypes.string,
		 filterable:React.PropTypes.bool
	},

	 componentDidMount:function(){
        $.ajax({
            url: this.props.sourceUrl,
            dataType: 'json',
            cache: false,
            context: this,
            success: function(data) {
            	this.setState({dataSource:data, initialData:data});
            }
        });
	 },

	 searchFunc:function(searchText){
        var filteredData = LordOfGridSearch.filtrele(this.state.dataSource,searchText,this.state.initialData );
        //filtreleme yapınca selected nesnelerini boşalt 
        this.setState({dataSource:filteredData,selectedItems:[],fullSelected:false});
	 },

	 onHeaderCheck:function(){
	 	const newSelected = this.state.dataSource.length === this.state.selectedItems.length ? [] : this.state.dataSource.map((item, idx) => item);
        const fullSelected= newSelected.length===0 ? false : true;
        this.setState({selectedItems:newSelected, fullSelected:fullSelected });
	 },
	 onSelectRow:function(selectedIndex){
	 	console.log("selectedIndex");
	 	console.log(selectedIndex);
	 	const fullSelected = this.state.dataSource.length === selectedIndex.length ? true : false;
	 	this.setState({selectedItems:selectedIndex, fullSelected:fullSelected });
	 },

	 renderPagination:function(){
	 	if(this.state.dataSource.length>0 && this.props.pagination){
		  var paginated = LordOfGridPagination.pageData(this.state.dataSource, this.state);
		  return (<LordOfGridPagination paginatedProps={paginated.paginatedProps} 
			  						 onChange={this.setState.bind(this)} />	);
		} 
	 },

	 onTrLastDoubleClick:function(e){
	 	var rowIndex = e.currentTarget.dataset.idx;
	 	var cellIndex = e.target.dataset.tdindex;
	 	var selectedColumn = e.target.dataset.column;
	 	this.setState({ editState:!this.state.editState,
	 				    selectedRow:rowIndex,
	 				    selectedCell:cellIndex,
	 					selectedColumn:selectedColumn });

	 	console.log(rowIndex);
	 	console.log(cellIndex);
	 },

	 disableEdit:function(){
	 	this.setState({editState:false});
	 },

	 handleEditEnter:function(value){
	 	//TODO  datasource u seçip state i güncelleyen algoritmayı yaz
	 	console.log(value);
	 	console.log(this.state);
	 	this.disableEdit();
	 },

	render: function() {
		if (!this.props.pagination){
			var paginated = {paginatedProps:{}, paginatedData:[]};
			paginated.paginatedData= this.state.dataSource;
		}else{
			var paginated = LordOfGridPagination.pageData(this.state.dataSource, this.state);
		}
		

		return (
			<div>
			  <LordOfGridSearch filterable={this.props.filterable} searchInputChange={this.searchFunc}  />
			  <LordOfGridTable columns={this.props.columns}
			                   data={paginated.paginatedData}
			                   headerClass={this.props.headerClass}
			                   tableClass={this.props.tableClass}
			                   selectable={this.props.selectable}
			                   onHeaderCheck={this.onHeaderCheck}
			                   headerFullSelect={this.state.fullSelected}
			                   selectedItems={this.state.selectedItems}
			                   onSelect={this.onSelectRow}
			                   multiselectable={this.props.multiselectable}
			                   onTrDoubleClick={this.onTrLastDoubleClick}
			                   editState={this.state.editState}
			                   selectedRow={this.state.selectedRow}
			                   selectedCell={this.state.selectedCell}
			                   selectedColumn={this.state.selectedColumn}
			                   handleEditEnter={this.handleEditEnter}
			                      />
			                   { this.state.dataSource.length>0 && this.props.pagination  
			                   		&&
				                   	<LordOfGridPagination paginatedProps={paginated.paginatedProps} 
			  						 onChange={this.setState.bind(this)} />}
			  	


			</div>
		);
		
    }
});

module.exports = LordOfGrid;