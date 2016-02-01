const React = require('react');
const Table = require('../components/table');
const Search = require('../components/search');
import Pagination from '../components/pagination';
import util from './util.js';

require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');


const LordOfGrid = React.createClass({
  propTypes: {
    sourceUrl:React.PropTypes.string,
    columns: React.PropTypes.array.isRequired,
    headerClassName:React.PropTypes.string,
    className:React.PropTypes.string,
    filterable:React.PropTypes.bool,
  },
  getInitialState:function(){
    return { dataSource:[],
             initialData:[],
             selectedItems:[],
             fullSelected:false,
             page: 1,
             displayCount: 10,
             editState:false,
             selectedRow:-1,
             selectedCell:-1,
             selectedColumn:'' }
  },

  getDefaultProps:function(){
    return {
      sourceUrl:'',
      columns:[],
      headerStyle:{"cursor":"pointer", "backgroundColor":"#4CAF50","color":"white"}, 
      headerClassName:'thead',
      selectable:true,
      multiselectable:false,
      className:"table table-striped",
      filterable:true,
      pagination:true,
    }
  },

  componentDidMount:function(){
        $.ajax({
            url: this.props.sourceUrl,
            dataType: 'json',
            cache: false,
            context: this,
            success: function(data) {
              this.setState({dataSource:data, initialData:data});
            },
        });
   },

   searchFunc:function(searchText){
        let filteredData = Search.filtrele(this.state.dataSource,searchText,this.state.initialData );
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
      let paginated = Pagination.pageData(this.state.dataSource, this.state);
      return (<Pagination paginatedProps={paginated.paginatedProps} 
                     onChange={this.setState.bind(this)} /> );
    } 
   }, 
   
   onTrLastDoubleClick:function(e){
    let rowIndex = e.currentTarget.dataset.idx;
    let cellIndex = e.target.dataset.tdindex;
    let selectedColumn = e.target.dataset.column;
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
    let paginated = {paginatedProps:{}, paginatedData:[]};
    if (!this.props.pagination){
      paginated.paginatedData= this.state.dataSource;
    }else{
      paginated = Pagination.pageData(this.state.dataSource, this.state);
    }


    return (
      <div>
       <div className="col-md-4" >
        <Search filterable={this.props.filterable} searchInputChange={this.searchFunc}  />
       </div>
       
       <div className="col-md-12" >
        <Table columns={this.props.columns} 
               data={paginated.paginatedData}
               className={this.props.className}
               headerStyle={this.props.headerStyle}
               headerClassName={this.props.headerClassName}
               headerRowStyle={this.props.headerRowStyle}
               selectable={this.props.selectable}
               multiselectable={this.props.multiselectable}
               onHeaderCheck={this.onHeaderCheck}
               headerFullSelect={this.state.fullSelected}
                         selectedItems={this.state.selectedItems}
                         onSelect={this.onSelectRow}
                         onTrDoubleClick={this.onTrLastDoubleClick}
                         editState={this.state.editState}
                         selectedRow={this.state.selectedRow}
                         selectedCell={this.state.selectedCell}
                         selectedColumn={this.state.selectedColumn}
                         handleEditEnter={this.handleEditEnter}
               />
        { this.state.dataSource.length>0 && this.props.pagination  
                            &&
                            <Pagination paginatedProps={paginated.paginatedProps} 
                     onChange={this.setState.bind(this)} />}
       </div>              
      </div>
    );
  },

});

module.exports = LordOfGrid;