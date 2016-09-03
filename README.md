Simple drag
==================
2016-09-02


A simple drag function in vanilla javascript.



Features
------------
- lightweight: less than 60 lines of code
- one liner
- onDrag and onStop callbacks
- compatible with all modern browsers (as long as they can handle the addEventListener function)
- handle SVG elements dragging (since v2.0.0)



How to use?
---------------

Simple use (don't forget to include the simpledrag.js file in your head)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Html page</title>
    <script src="simpledrag.js"></script>
    <style>

        body{
            padding: 30px;
        }

        #my_target {
            width: 100px;
            height: 100px;
            background-color: #666;
            color: white;
            padding: 10px 12px;
            cursor: move;
            position: relative; /* important (all position that's not `static`) */
        }
    </style>
</head>

<body>

<div id="my_target"><span>Drag me!</span></div>


<script>


    // simple usage
    document.getElementById('my_target').sdrag();
    

</script>


</body>
</html>
```


onDrag and onStop callbacks
------------------------------

You can use onDrag and/or onStop callbacks.
Both callbacks have one argument: the currentTarget element (#my_target in the example above)


### using the onDrag callback
```js
	// using the onDrag callback
    document.getElementById('my_target').sdrag(function(el){
        console.log("dragging " + el.style.left + ":" + el.style.top);
    });
```

### using the onStop callback
```js
	// using the onStop callback
    document.getElementById('my_target').sdrag(null, function(el){
        console.log("stopped " + el.style.left + ":" + el.style.top);
    });
```

### using both the onDrag and the onStop callbacks
```js
    // using both the onDrag and onStop callbacks
    document.getElementById('my_target').sdrag(function(el){
        console.log("dragging " + el.style.left + ":" + el.style.top);
    }, function(el){
        console.log("stopped " + el.style.left + ":" + el.style.top);
    });
```



SVG element dragging example
--------------------------------

The left and top css properties doesn't seem to affect the svg elements.
But using the onDrag callback, you can move svg elements, like so:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Html page</title>
    <script src="simpledrag.js"></script>
    <style>
        body {
            position: fixed;
            width: 100%;
            height: 100%;
            background: #eee;
        }
        #circle1{
            cursor: pointer;
        }
    </style>
</head>

<body>


<svg width="100%" height="100%">

    <circle id="circle1" cx="100" cy="100" r="5"
            fill="red"
            stroke="red"
            stroke-width="2"
    ></circle>
</svg>


<script type="text/javascript">
    var circle1 = document.getElementById('circle1');
    circle1.sdrag(function(el, pageX, startX, pageY, startY){
        el.setAttribute('cx', pageX);
        el.setAttribute('cy', pageY);
    });
</script>
</body>
</html>
```





Author note
---------------

I was about to use the drag and drop api, but I realized that I just needed a simple drag function,
and the api seemed to have compatibility problems on mobile devices, and too complicated compared to my needs.

Also note that the sdrag function is attached directly on the Element prototype.
Some people consider this as a bad practice and I generally don't use it, but I think the one liner's feature is worth it.

Anyway, it's also easy to import the 40 lines of code in your javascript source if you don't want that, but still want to use
the simple drag functionality.



Version history
--------------------


- 2.0.0 - 2016-09-02

    Added SVGElement support arguments (tested in firefox 48 and chrome 53).

- 1.0.1 - 2016-09-02

    Added SVGElement support (tested in firefox 48 and chrome 53).

- 1.0.0 - 2016-09-02

    Initial commit








