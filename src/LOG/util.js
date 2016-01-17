var initialData=[];
var displayedData=[];

var selectedIndex=[];
var selectedItems=[];

export default {
 
 

 inputTypeForPrototype(prototype) {
    if (prototype === Date) return 'date';
    if (prototype === Number) return 'number';
    if (prototype === Boolean) return 'checkbox';
    return 'text';
  },


  prepareValueForInput(value, type) {
    if (type === 'date') {
    	return new Date(value).toISOString().slice(0, 10);
    }
    if (type === 'checkbox') {
      return value ? 'on' : null;
    }
    return value;
  },

  onSetInitialData(state){
    initialData= state.dataSource;
  },

  onSetDisplayedData(state){
     displayedData= state.dataSource;
  },

  getInitialData(){
    return initialData;
  },

  setSelectedItems(selectSource){
    console.log("selectedIndex");
    console.log(selectedIndex);
   selectedIndex=selectSource;
  },

  getSelectedItems(){
    selectedItems =[];
    var sortedKeys = Object.keys(displayedData).sort();
    for(var i=0; i< selectedIndex.length; i++){
         selectedItems.push(displayedData[sortedKeys[selectedIndex[i]]]);
    }

    return selectedItems;
  }

};