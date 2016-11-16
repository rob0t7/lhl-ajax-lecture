# LHL AJAX Lecture Code

Here is the lecture code done in class.

To run the project do:

```shell
$ npm install
$ npm start
```

## Lecture Notes


Today we discussed how we can use AJAX to fetch data from the server
asyncronously in the browser. This technology allows us to *sync* and
change the state of our app **without** refreshing the page.

The technology was originally create by Microsoft. It is actually
called **XMLHttpRequest** but it's an aweful name so everyone calls it
AJAX instead.

For this week to make our lives easier we will be using the jQuery
library to make AJAX easier instead of the native way of creating
*xhr* requests.


``` javascript
// Native vanilla.js way of doing a GET Ajax request
var request = new XMLHttpRequest();
request.onload = function() {
  // this function gets call when the response is successfull
  var data = JSON.parse(request.responseBody)
  /...
}
reqest.open('GET', 'http://localhost:5000/breweries')
request.send() // actually sends the call
```

### jQuery AJAX

Here is how to do a jQuery ajax call (same as above)

``` javascript
$.ajax('http://localhost:5000/breweries')
  .done((response) => {
    console.log(response)
  })
  .fail(() => {
    console.err('The call failed')
  })
```

A bonus is that the response from the server is automatically turned
into JS objects and you don't have to manually convert the
responseBody via JSON.parse()

When dealing with AJAX requests there exists a min of **3** outcomes:

1. The call was successfull (happy path)
2. The call was successfully BUT the request failed (i.e. The server
   responded that you didn't something you weren't supposed to do.)
3. The call failed (for example the internet went down)


Also you can use the jQuery.get(), jQuery.getJSON(), jQuery.post()
calls, but they are just helper functions that call jQuery.ajax behind
the scenes.

### Other resources

* [Bootstrap](http://getbootstrap.com/)
* [jQuery API Docs](http://api.jquery.com/)
* [jQuery AJAX Docs](http://api.jquery.com/category/ajax/)
* [XMLHttpRequest Mozilla Docs](https://developer.mozilla.org/en-US/docs/AJAX)
* [XMLHttpRequest Spec](https://www.w3.org/TR/2012/WD-XMLHttpRequest-20120117/)
* [BEM Notation for class naming](http://getbem.com/)
