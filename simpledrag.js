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
     * Both onDrag and onStop callback take the currentTarget element (#my_target in the
     * above examples) as their first argument.
     *
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
            onDrag && onDrag(el);
        }

        function startDragging(e) {
            // only HTMLElement have offsetLeft/offsetTop
            if (e.currentTarget instanceof HTMLElement) {
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
        window.addEventListener('mouseup', function () {
            if (true === dragging) {
                dragging = false;
                window.removeEventListener('mousemove', move);
                onStop && onStop(el);
            }
        });
    }
    HTMLElement.prototype.sdrag = sdrag;
})();