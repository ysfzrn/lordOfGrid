import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LordOfGrid from './lordofgrid'; // Our custom react component

injectTapEventPlugin();

const App = React.createClass({
    getInitialState:function(){
    	return { 
    	 columns:[ {dataKey:"id",title:"ID", type: Number, editable:true},
    	           {dataKey:"gender",title:"Cinsiyet", type: String, editable:true},
    	           {dataKey:"first_name",type: String},
    	           {dataKey:"last_name",title:"Soyadı", type: String},
    	           {dataKey:"email",title:"Email", type: String},
    	           {dataKey:"ip_address",title:"IP", type: String},
    	           {dataKey:"skill",title:"Linkedn", type: String,tooltip:"Linkedn deki yetenekleri"},
    	           ], 
       }
    },

	render: function() {
		return (
			<div>
			 LordOfGrid
			 <br/>
			 ------------------------------
			 <LordOfGrid columns={this.state.columns} sourceUrl='http://localhost:3000/MOCK_DATA.json' 
			             multiselectable={true} 
			             />
			</div> 
		);
	},

});


ReactDOM.render(<App />, document.getElementById('app'));
