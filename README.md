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
- handle SVG elements dragging 
- can constrain the movement horizontally or vertically
- can constrain the movement inside of a virtual box with little effort



How to use?
---------------

Simple use (don't forget to include the simpledrag.js file in your head),
and, the target must be in a non static position (for instance position: relative)

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



Make it horizontal only or vertical only
------------------------------

```js
document.getElementById('target1').sdrag(null, null, 'horizontal'); // the #target1 will move horizontally only
document.getElementById('target2').sdrag(null, null, 'vertical'); // the #target2 will move vertically only
```




Additional constraints on the movement
--------------------------------------------

Another common problem that we have when dealing with dragging is: how far can the target be dragged?

You can use the **fix** argument of the onDrag callback.

Fix is basically an array that let you override the value of the dragged target.


The following example displays an horizontal green bar with a red cursor in the middle.
You can drag the cursor horizontally only, from 10% of the screen width, and up to 90% of the screen width.




```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script src="simpledrag.js"></script>

    <style type="text/css">

        .line{
            background: green;
            width: 100%;
            height: 100px;
        }

        .cursor{
            background: red;
            width: 2%;
            height: 100px;
            position: relative;
            margin: 0 auto;
            /**
            * Note: Although it's tempting to set the left property,
            * don't do it, as the current version of sdrag will not handle it as you would expect (a jumpy cursor)
            */

        }
    </style>

</head>

<body>
<div class="line">
    <div class="cursor" id="cursor"></div>
</div>


<script>


    // The script below constrains the target to move horizontally between a left and a right virtual boundaries.
    // - the left limit is positioned at 10% of the screen width
    // - the right limit is positioned at 90% of the screen width
    var leftLimit = 10;
    var rightLimit = 90;

    document.getElementById('cursor').sdrag(function (el, pageX, startX, pageY, startY, fix) {
        if (pageX < window.innerWidth * leftLimit / 100) {
            fix.pageX = window.innerWidth * leftLimit / 100;
        }
        if (pageX > window.innerWidth * rightLimit / 100) {
            fix.pageX = window.innerWidth * rightLimit / 100;
        }
    }, null, 'horizontal');


</script>

</body>
</html>
```



Making the phpMyAdmin's resize pane style
-----------------------------------------


The following code is a prototype of the resize pane widget that we have in phpMyAdmin.

It uses flexbox.

The sdrag code is pushed to a good amount of complexity.

To be honest, I found the code by accident, so be sure to check if it works in your browser first (I checked that it worked successfully in firefox 50, chrome 54 and safari 10.0.1).






```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="simpledrag.js"></script>

    <style type="text/css">

        html, body {
            height: 100%;
        }

        .panes-container {
            display: flex;
            width: 100%;
            overflow: hidden;
        }

        .left-pane {
            width: 18%;
            background: #ccc;
        }

        .panes-separator {
            width: 2%;
            background: red;
            position: relative;
            cursor: col-resize;
        }

        .right-pane {
            flex: auto;
            background: #eee;
        }

        .panes-container,
        .panes-separator,
        .left-pane,
        .right-pane {
            margin: 0;
            padding: 0;
            height: 100%;
        }

    </style>

</head>

<body>

<div class="panes-container">
    <div class="left-pane" id="left-pane">
        <p>I'm the left pane</p>
        <ul>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
            <li><a href="#">Item 3</a></li>
        </ul>
    </div>
    <div class="panes-separator" id="panes-separator"></div>
    <div class="right-pane" id="right-pane">
        <p>And I'm the right pane</p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium at cum cupiditate dolorum, eius eum
            eveniet facilis illum maiores molestiae necessitatibus optio possimus sequi sunt, vel voluptate. Asperiores,
            voluptate!
        </p>
    </div>
</div>


<script>


    var leftPane = document.getElementById('left-pane');
    var rightPane = document.getElementById('right-pane');
    var paneSep = document.getElementById('panes-separator');

    // The script below constrains the target to move horizontally between a left and a right virtual boundaries.
    // - the left limit is positioned at 10% of the screen width
    // - the right limit is positioned at 90% of the screen width
    var leftLimit = 10;
    var rightLimit = 90;


    paneSep.sdrag(function (el, pageX, startX, pageY, startY, fix) {

        fix.skipX = true;

        if (pageX < window.innerWidth * leftLimit / 100) {
            pageX = window.innerWidth * leftLimit / 100;
            fix.pageX = pageX;
        }
        if (pageX > window.innerWidth * rightLimit / 100) {
            pageX = window.innerWidth * rightLimit / 100;
            fix.pageX = pageX;
        }

        var cur = pageX / window.innerWidth * 100;
        if (cur < 0) {
            cur = 0;
        }
        if (cur > window.innerWidth) {
            cur = window.innerWidth;
        }


        var right = (100-cur-2);
        leftPane.style.width = cur + '%';
        rightPane.style.width = right + '%';

    }, null, 'horizontal');


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


- 2.2.0 - 2016-11-20

    - Added fix.skipX and fix.skipY keys

- 2.1.0 - 2016-11-20

    - Added direction argument to constrain movement horizontally or vertically
    - Added fix option to the onDrag callback


- 2.0.0 - 2016-09-02

    Added SVGElement support arguments (tested in firefox 48 and chrome 53).

- 1.0.1 - 2016-09-02

    Added SVGElement support (tested in firefox 48 and chrome 53).

- 1.0.0 - 2016-09-02

    Initial commit








