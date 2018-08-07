const createHtml = (html) => {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

const isObject = (obj) => {
    return typeof obj === 'object';
}

const isArray = (obj) => {
    return isObject(obj) && obj.constructor === Array;
}