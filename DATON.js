const DATON = ((w, d, u) => {
  
  const isObject = (obj) => {
    return typeof obj === 'object';
  }
  
  const isArray = (obj) => {
    return isObject(obj) && obj.constructor === Array;
  }
  
  const isObjectStr = (str) => {
    return (str.indexOf('{') == 0 && str.indexOf('}') == str.length - 1)
      || (str.indexOf('[') == 0 && str.indexOf(']') == str.length - 1);
  }
  
  const parseObjectStr = (str) => {
    var obj = JSON.parse(str.replace(/(?<!\\)'/g, '"').replace(/\\'/g, '\''));
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
    if (typeInfo.type === 'array') {
      return setValue(json, typeInfo.cfg, []);
    } else if (typeInfo.type === 'object') {
      return setValue(json, typeInfo.cfg, {});
    } else if (typeInfo.type === 'attribute' && isObjectStr(typeInfo.cfg)) {
      const map = parseObjectStr(typeInfo.cfg);
      for (let prop in map) {
        setValue(json, map[prop], elem.getAttribute(prop));
      }
    } else if (typeInfo.type === 'value') {
      setValue(json, typeInfo.cfg, elem.textContent);
    }
    return null;
  }
  
  const getTypeInfo = (elem, ns) => {
    if (elem.hasAttributes()) {
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
            case 'value':
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

  return w.DATON = new DATON();

})(window, document);

module.exports = DATON