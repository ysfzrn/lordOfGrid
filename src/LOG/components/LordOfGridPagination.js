import React from 'react';

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
    return (
      <div className="well">
          <div className="row">
          <div className="col-md-6">
            Toplam Kayıt:<strong>{this.props.paginatedProps.total}</strong> Kayıt aralığı
            <strong>{o.itemStart}</strong> - <strong>{this.props.paginatedProps.itemEnd}</strong>
          </div>
          <div className="col-md-6">
            <div className="pageControls pull-right">
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-left" onClick={this.updateSettings.bind(this,"page",o.page - 1)} disabled={prev} />
              <DropDownMenu value={o.page} options={o.pageOptions} ref="page" onChange={this.updateSettings.bind(this, "page")} />
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-right" onClick={this.updateSettings.bind(this,"page", o.page + 1)} disabled={next} />
            </div>
            <div className="itemOption pull-right">
              <DropDownMenu value={o.displayCount} options={this.props.displayCountOptions} ref="displayCount" onChange={this.updateSettings.bind(this, "displayCount")} />
            </div>
          </div>
          <div className="clearfix"></div>
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


class DropDownMenu extends React.Component {
  handleClick(key) {
    this.props.onChange(this.props.options[key]);
  }
  render() {
    var optionList = this.props.options.map( function (option, key) {
      return (
        <li key={key}><a onClick={this.handleClick.bind(this, key)} >{option}</a></li>
      )
    }, this)
    return(
      <div className="btn-group">
        <button type="button" className="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
          {this.props.value} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {optionList}
        </ul>
      </div>
    );
  }
};

export default Pagination;
