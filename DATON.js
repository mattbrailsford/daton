(function () {
  
  const objectStrRegex = /^[\t ]*(?:\{[\w\W]*\}|\[[\w\W]*\])[\t ]*$/g; // { ... } or [ ... ]

  const quoteRegex1 = /([^'\\]*(?:\\.[^'\\]*)*)'/g;   // Non escaped single quotes
  const quoteRegex2 = /\\'/g; // Escaped single quotes

  const stringRegex = /^[\s'"]+|[\s'"]+$/g // Remove whitespace and ' or " from string ends

  const trimStr = (str) => {
    return str.replace(stringRegex, '');
  }

  const isObject = (obj) => {
    return typeof obj === 'object';
  }
  
  const isArray = (obj) => {
    return isObject(obj) && obj.constructor === Array;
  }
  
  const isObjectStr = (str) => {
    return str.match(objectStrRegex);
  }
  
  const parseObjectStr = (str) => {
    let obj = JSON.parse(str.replace(quoteRegex1, '$1"').replace(quoteRegex2, '\''));
    return isArray(obj)
      ? obj.reduce((o, k) => {
          o[k] = k;
          return o;
        }, {})
      : obj;
  }
  
  const setValue = (obj, key, val) => {
    if (key) obj[key] = val;
    else if (isArray(obj)) obj.push(val);
    else throw 'Unable to set value as there is no setable key for value "'+ val + '"'; 
    return val;
  }
  
  // Parses data attribute and returns an obj/arr
  // if a new child object is started
  const parseData = (elem, typeInfo, json) => {
    switch (typeInfo.type) {
      case 'array':
        return setValue(json, typeInfo.cfg, []);
      case 'object':
        return setValue(json, typeInfo.cfg, {});
      case 'attribute':
        if (isObjectStr(typeInfo.cfg)) {
          const map = parseObjectStr(typeInfo.cfg);
          for (let prop in map) {
            setValue(json, prop, elem.getAttribute(map[prop]));
          }
        } else {
          setValue(json, typeInfo.cfg, elem.getAttribute(typeInfo.cfg));
        }
        break;
      case 'value':
        if (isObjectStr(typeInfo.cfg)) {
          const map = parseObjectStr(typeInfo.cfg);
          for (let prop in map) {
            setValue(json, prop, map[prop]);
          }
        } else {
          setValue(json, typeInfo.cfg, elem.textContent);
        }
        break;
    }
    return null;
  }
  
  const getTypeInfo = (elem, ns) => {
    if (elem.attributes) {
      const attrPrefix = 'data-' + (ns ? ns + '-' : '');
      const attrs = elem.attributes;
      for (let attr of attrs) {
        if (attr.name.indexOf(attrPrefix) === 0) {
          let key = attr.name.substr(attrPrefix.length).toLowerCase();
          switch (key) {
            case 'arr':
            case 'array':
              return { type: 'array', cfg: attr.value };
            case 'obj':
            case 'object':
              return { type: 'object', cfg: attr.value };
            case 'attr':
            case 'attrs':
            case 'attribute':
            case 'attributes':
              return { type: 'attribute', cfg: attr.value };
            case 'val':
            case 'vals':
            case 'value':
            case 'values':
              return { type: 'value', cfg: attr.value };
          }
        }
      }
    }
    return null;
  }
    
  const processElement = (elem, ns, json) => {
    let data;
    let typeInfo = getTypeInfo(elem, ns);
    if (typeInfo) {
      data = parseData(elem, typeInfo, json);
    }
    let children = elem.children;
    if (children) {
      let childrenLen = children.length;
      for (let i = 0; i < childrenLen; i++) {
        if (data) {
          processElement(children[i], ns, data);
        } else {
          processElement(children[i], ns, json);
        }
      }
    }
  }

  class DATON {

    parse (elem, ns = 'dtn', json = {}) {
      processElement(elem, ns, json);
      return json;
    }

  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = new DATON();
  } else {
    window.DATON = new DATON();
  };

})();

