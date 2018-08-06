# DATON
DATON is a parser for object notations embedded in the dom via data attributes. The main use case for this is to allow progressive enhancement such that a sever could render standard markup decorated with DATON specific attributes and then these can be easily parsed and accessed in javascript as plain old objects.

## Usage
Include DATON in your page

````javascript
<script src="js/DATON.js"></script>
````

In your markup render DATON specific attributes to represent data that should be parsed

````html
<div id="data">
  <ul data-js-array="people">
    <li data-js-object>
      <a href="http://www.google.com" data-js-attribute="{ link: 'href' }">
        <img src="/img/joe.png" width="400" data-js-attr="{ image: 'src', size: 'width' }" />
        <h4 data-js-value="name">Joe blogs</h4>
        <p>Job Role: <span data-js-value="role">Director</span></p>
        <p>Email: <span data-js-value="email">joe@blogs.com</span></p>
        <div data-js-object="address">
          <p data-js-value="line1">10 Some St</p>
          <p data-js-value="town">Barnsley</p>
          <p data-js-value="postcode">S75 1RE</p>
        </div>
      </a>
    </li>
    <li data-js-object>
        <a href="http://www.yahoo.com" data-js-attribute="{ link: 'href' }">
        <img src="/img/jane.png" width="400" data-js-attr="{ image: 'src', size: 'width' }"  />
        <h4 data-js-value="name">Jane blogs</h4>
        <p>Job Role: <span data-js-value="role">Director</span></p>
        <p>Email: <span data-js-value="email">joe@blogs.com</span></p>
      </a>
    </li>
  </ul>
</div>
````

In your javascript, call `DATON.parse` on your root dom node

````javascript
var div = document.getElementById('data');
var result = DATON.parse(div);
console.log(result);

// Output
{
    "people":[
        {
            "link":"http://www.google.com",
            "image":"/img/joe.png",
            "size":"400",
            "name":"Joe blogs",
            "role":"Director",
            "email":"joe@blogs.com",
            "address":{
                "line1":"10 Some St",
                "town":"Barnsley",
                "postcode":"S75 1RE"
            }
        },{
            "link":"http://www.yahoo.com",
            "image":"/img/jane.png",
            "size":"400",
            "name":"Jane blogs",
            "role":"Director",
            "email":"joe@blogs.com"
        }
    ]
}

````

Supported attributes are

* **data-js-array** Denotes the start of an array
* **data-js-object** Denotes the start of an object
* **data-js-attr** Defines an attribute map where the object key denotes the target key, and the value denotes the attribute to parse the value from
* **data-js-value** Denotes a value entry taking the inner text content of the dom node

For attributes `data-js-array`, `data-js-object` and `data-js-value` the value of the attribute denotes the object key within the parsed parent object context. If the parent object context is an array, the value can be ommitted and the parsed child objects / values will be pushed into the array in order of occurance.