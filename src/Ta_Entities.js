class TA_Entities {
    constructor() {
      let GLOBALSCOPE = this;
  
      this.createGeometry = function (geometryType, params) {
        let geometry = new THREE[geometryType]();
  
        this.checkParams(params, geometry.parameters);
  
        let paramsArray = Object.values(params);
  
        geometry = new THREE[geometryType](...paramsArray);
  
        return geometry;
    };
}}