# DATON

[[Demo]](http://jsfiddle.net/4yt872hL/2/) [[Tests]](https://mattbrailsford.github.io/daton/tests/) 

DATON (Data ATtribute Object Notation) is a parser for object notations embedded in the dom via data attributes. The main use case for this is to allow progressive enhancement such that a sever could render standard markup decorated with DATON specific attributes and then these can be easily parsed and accessed in javascript as plain old objects.

## Usage
Include DATON in your page

````html
<script src="js/DATON.js"></script>
````

In your markup render DATON specific attributes to represent data that should be parsed

````html
<div id="data">
  <ul data-dtn-array="people">
    <li data-dtn-object>
      <a href="http://www.google.com" data-dtn-attr="{ 'href' : 'link' }">
        <img src="/img/joe.png" width="400" data-dtn-attr="{ 'src' : 'image', 'width' : 'size' }" />
        <h4 data-dtn-value="name">Joe blogs</h4>
        <p>Job Role: <span data-dtn-value="role">Director</span></p>
        <p>Email: <span data-dtn-value="email">joe@blogs.com</span></p>
        <div data-dtn-object="address">
          <p data-dtn-value="line1">10 Some St</p>
          <p data-dtn-value="town">Barnsley</p>
          <p data-dtn-value="postcode">S75 1RE</p>
        </div>
      </a>
    </li>
    <li data-dtn-object>
        <a href="http://www.yahoo.com" data-dtn-attr="{ 'href' : 'link' }">
        <img src="/img/jane.png" width="400" data-dtn-attr="{ 'src' : 'image', 'width' : 'size' }"  />
        <h4 data-dtn-value="name">Jane blogs</h4>
        <p>Job Role: <span data-dtn-value="role">Director</span></p>
        <p>Email: <span data-dtn-value="email">joe@blogs.com</span></p>
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

* **data-dtn-array** Denotes the start of an array
* **data-dtn-object** Denotes the start of an object
* **data-dtn-attr** Defines an attribute map where the object key denotes the attribute to parse, and the value denotes the object key the value will be assigned to in the parent object context
* **data-dtn-value** Denotes a value entry taking the inner text content of the dom node

For attributes `data-dtn-array`, `data-dtn-object` and `data-dtn-value` the value of the attribute denotes the object key within the parsed parent object context. If the parent object context is an array, the value can be ommitted and the parsed child objects / values will be pushed into the array in order of occurance.

## TODO
* [ ] A means of casting the type of a variable
* [ ] Having multiple attributes per tag?