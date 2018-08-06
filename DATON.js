const DATON = ((w, d, u) => {

  const trim = (str, chars = '\\s') => {
    return str.replace(new RegExp('^['+ chars +']+|['+ chars +']+$','g'), '');
  }
  
  const isObject = (obj) => {
    return typeof obj === 'object';
  }
  
  const isArray = (obj) => {
    return typeof obj === 'object' && obj.constructor === Array;
  }
  
  const isObjectStr = (str) => {
    return str.indexOf('{') == 0 && str.indexOf('}') == str.length - 1;
  }
  
  const parseObjectStr = (str) => {
    return str.split(',')
      .map(x => x.split(':').map(y => trim(y, '\\s\'"{}')))
      .reduce((a, x) => {
        a[x[0]] = x[1];
        return a;
      }, {});
  }
  
  const setValue = (obj, key, val) => {
    if (key) obj[key] = val;
    else if (isArray(obj)) obj.push(val);
    else throw 'Unable to set value as there is no setable key for value "'+ val + '"'; 
    return val;
  }
  
  const getTypeInfo = (elem, prefix) => {
    if (elem.hasAttributes()) {
      const attrs = elem.attributes;
      for (let attr of attrs) {
        if (attr.name.indexOf(prefix) === 0) {
          let key = attr.name.substr(prefix.length + 1).toLowerCase();
          switch (key) {
            case 'arr':
            case 'array':
              return { type: 'array', key: attr.value };
            case 'obj':
            case 'object':
              return { type: 'object', key: attr.value };
            case 'attr':
            case 'attrs':
            case 'attribute':
            case 'attributes':
              return { type: 'attribute', key: attr.value };
            case 'val':
            case 'value':
              return { type: 'value', key: attr.value };
          }
        }
      }
    }
    return null;
  }
  
  const parseData = (elem, typeInfo, json) => {
    if (typeInfo.type === 'array') {
      return setValue(json, typeInfo.key, []);
    } else if (typeInfo.type === 'object') {
      return setValue(json, typeInfo.key, {});
    } else if (typeInfo.type === 'attribute' && isObjectStr(typeInfo.key)) {
      const map = parseObjectStr(typeInfo.key);
      for (let prop in map) {
        setValue(json, prop, elem.getAttribute(map[prop]));
      }
      return json;
    } else if (typeInfo.type === 'value') {
      return setValue(json, typeInfo.key, elem.textContent);
    }
  }
    
  const processElement = (elem, prefix, json) => {
    let data;
    let typeInfo = getTypeInfo(elem, prefix);
    if (typeInfo) {
      data = parseData(elem, typeInfo, json);
    }
    let children = elem.children;
    if (children) {
      let childrenLen = children.length;
      for (let i = 0; i < childrenLen; i++) {
        if (data && isObject(data)) {
          processElement(children[i], prefix, data);
        } else {
          processElement(children[i], prefix, json);
        }
      }
    }
  }

  class DATON {

    parse (elem, prefix = 'data-js', json = {}) {
      processElement(elem, prefix, json);
      return json;
    }

  }

  return w.DATON = new DATON();

})(window, document);
