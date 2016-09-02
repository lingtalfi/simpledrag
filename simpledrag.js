(function () {

    /**
     * THIS OBJECT WILL ONLY WORK IF your target is positioned relative or absolute,
     * or anything that works with the top and left css properties (not static).
     *
     * Howto:
     * document.getElementById('my_target').sdrag();
     *
     * document.getElementById('my_target').sdrag(onDrag, null);
     * document.getElementById('my_target').sdrag(null, onStop);
     * document.getElementById('my_target').sdrag(onDrag, onStop);
     *
     * Both onDrag and onStop callback take the following arguments:
     *
     * - el, the currentTarget element (#my_target in the above examples)
     * - pageX: the mouse event's pageX property (horizontal position of the mouse compared to the viewport)
     * - startX: the distance from the element's left property to the horizontal mouse position in the viewport.
     *                  Usually, you don't need to use that property; it is internally used to fix the undesirable
     *                  offset that naturally occurs when you don't drag the element by its top left corner
     *                  (for instance if you drag the element from its middle).
     * - pageY: the mouse event's pageX property (horizontal position of the mouse compared to the viewport)
     * - startY: same as startX, but for the vertical axis (and element's top property)
     *
     */

    // simple drag
    function sdrag(onDrag, onStop) {
        var startX = 0;
        var startY = 0;
        var el = this;
        var dragging = false;

        function move(e) {
            el.style.left = (e.pageX - startX ) + 'px';
            el.style.top = (e.pageY - startY ) + 'px';
            onDrag && onDrag(el, e.pageX, startX, e.pageY, startY);
        }

        function startDragging(e) {
            if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
                dragging = true;
                var left = el.style.left ? parseInt(el.style.left) : 0;
                var top = el.style.top ? parseInt(el.style.top) : 0;
                startX = e.pageX - left;
                startY = e.pageY - top;
                window.addEventListener('mousemove', move);
            }
            else {
                throw new Error("Your target must be an html element");
            }
        }

        this.addEventListener('mousedown', startDragging);
        window.addEventListener('mouseup', function (e) {
            if (true === dragging) {
                dragging = false;
                window.removeEventListener('mousemove', move);
                onStop && onStop(el, e.pageX, startX, e.pageY, startY);
            }
        });
    }

    Element.prototype.sdrag = sdrag;
})();