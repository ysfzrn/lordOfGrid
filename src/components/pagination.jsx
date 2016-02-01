import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';


class Pagination extends React.Component{
  constructor(props) {
    super(props);
  }

  updateSettings(type, value) {
    var setting = {};
    setting[type] = value
    this.props.onChange(setting);
  }

  componentWillUpdate(nextProps) {
    if (this.props.paginatedProps.total !== nextProps.paginatedProps.total) {
      this.props.onChange({'page' : 1});
    }

    if (nextProps.paginatedProps.displayCount !== this.props.paginatedProps.displayCount) {
      var i = 1;
      while(this.props.paginatedProps.itemStart > i * nextProps.paginatedProps.displayCount) { i++; };
      this.props.onChange({'page' : i});
    }
  }

  static pageData(d, o) {
    let requires = ['page', 'displayCount'];
    if (!requires.every(function(p) { return p in o; })) {
      throw new Error("Pagination.pageData() expects an object with the properties 'page', 'displayCount' as it's second parameter. Ensure the proper data is being passed.");
    }

    return new PagedData(d,o);

  }

  render() {
    let o = this.props.paginatedProps;
    let prev = o.page === o.pageOptions[0];
    let next = o.page === o.pageOptions[o.pageOptions.length - 1];

    var btnGroupStyle={'verticalAlign':'bottom'}

    return (
          <div className="container-fluid">
              <div className="col-md-4">
                <DropDownMenuN value={o.displayCount} options={this.props.displayCountOptions} ref="displayCount" onChange={this.updateSettings.bind(this, "displayCount")} />
                Toplam Kayıt:<strong>{this.props.paginatedProps.total}</strong> Kayıt aralığı
                <strong>{o.itemStart}</strong> - <strong>{this.props.paginatedProps.itemEnd}</strong>
              </div>
          
          <div className="col-md-8 btn-group" style={btnGroupStyle} role="group">
            
             <div className="btn btn-secondary"> 
              <RaisedButton onClick={this.updateSettings.bind(this,"page",o.page - 1)} disabled={prev}
                          label="Geri"
                          labelPosition="after"
                          primary={true}
                          icon={<ArrowBack /> } />
              <DropDownMenuN value={o.page} options={o.pageOptions} ref="page" onChange={this.updateSettings.bind(this, "page")} />
              <RaisedButton onClick={this.updateSettings.bind(this,"page", o.page + 1)} disabled={next}
                          label="İleri"
                          labelPosition="before"
                          primary={true}
                          icon={<ArrowForward /> } />
              
            </div>


            
          </div>

           


          </div>
   
    );
  }
};

Pagination.defaultProps = {
  displayCountOptions : [3,5,10,25,50,100]
}

class PagedData {
  constructor(d, o) {
    var r = {paginatedProps:{}, paginatedData:[]};

    r.paginatedProps.total = d.length;
    r.paginatedProps.itemStart = PagedData.getStart(r.paginatedProps.total, o.page, o.displayCount);
    r.paginatedProps.itemEnd = PagedData.getEnd(r.paginatedProps.total, o.page, o.displayCount);
    r.paginatedProps.pageOptions = PagedData.getPageOptions(r.paginatedProps.total, o.displayCount);
    r.paginatedProps.page = o.page;
    r.paginatedProps.displayCount = o.displayCount;
    r.paginatedData = PagedData.splitData(d, r.paginatedProps.itemStart, r.paginatedProps.itemEnd);

    return Object.freeze(r);
  }
  static splitData(d, s, e) {
    return d.slice(s - 1, e);
  }
  static getStart(t, p, d) {
    return (t > 0) ? ((p - 1) * d) + 1 : 0;
  }
  static getEnd(c, p, d) {
    var h = p * d;
    return (h <= c) ? h : c;
  }
  static getPageOptions(t, d) {
    var o = new Array(Math.ceil(t / d));
    var i = 0;
    var a = o.length;
    while(i < a){
      o[i] = i+1;
      i++;
    }
    return o;
  }
}


class DropDownMenuN extends React.Component {
  handleClick(key) {
    this.props.onChange(this.props.options[key]);
  }
  render() {
    var style={"width":"100px", 'height':'36px' }
    var optionList = this.props.options.map( function (option, key) {
      return (
        <li key={key}><a onClick={this.handleClick.bind(this, key)} >{option}</a></li>
      )
    }, this)
    return(
      <div className="btn-group">
        <button style={style} type="button" className="btn btn-xs btn-info dropdown-toggle" data-toggle="dropdown">
          {this.props.value} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {optionList}
        </ul>
      </div>
    );
  }
};


const DropDownMenu =React.createClass({
  
  handleClick(key) {
    this.props.onChange(this.props.options[key]);
  },    

  render() {
    var optionList = this.props.options.map( function (option, key) {
      return (
        <MenuItem  key={key} primaryText={option} onClick={this.handleClick.bind(this, key)} value={option} />
      )
    }, this)

    var style={"width":"100px" }
    return(
      <div>
        <SelectField style={style}   value={this.props.value}>
          {optionList}
        </SelectField>
      </div>
    );
  },
});

export default Pagination;
