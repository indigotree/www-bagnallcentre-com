;(function (window, document, undefined) {

    if (window.location.hash) {
        setTimeout(function () {
            window.scrollTo(0, 0)
        }, 1)
    }

    Math.easeInOutQuad = function (time, start, change, duration) {
        time /= duration / 2
        if (time < 1) {
            return change / 2 * time * time + start
        }
        time--

        return -change / 2 * (time * (time - 2 ) - 1) + start
    }

    function OriginScroller(options) {
        this.settings = this.extend({
            speed: 1250,
            selector: '[data-scroll], a',
            scrollingElement: document.documentElement,
            offset: 120
        }, options)
        this.events()
    }

    OriginScroller.prototype.extend = function (obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                obj[key] = src[key]
            }
        }

        return obj
    }

    OriginScroller.prototype.events = function () {
        var anchors = document.querySelectorAll(this.settings.selector)

        if (window.location.hash) {
            var hash = this.getHash(window.location.hash)
            var elem = document.getElementById(hash.substr(1))

            if (elem) {
                this.scrollTo(this.settings.scrollingElement, elem.offsetTop - this.settings.offset, this.settings.speed)
            }
        }

        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i]
            var hash = this.getHash(anchor)
            if (hash.length) {
                var elem = document.getElementById(hash.substr(1))
                anchor.addEventListener('click', this.scrollEvent.bind(this))
            }

        }
    }

    OriginScroller.prototype.scrollEvent = function (event) {
        event.preventDefault()
        var hash = this.getHash(event.srcElement)
        var elem = document.getElementById(hash.substr(1))
        
        this.scrollTo(this.settings.scrollingElement, elem.offsetTop - this.settings.offset, this.settings.speed)
    }

    OriginScroller.prototype.scrollTo = function (element, to, duration) {
        var start = element.scrollTop
        var change = to - start
        var currentTime = 0
        var increment = 20

        var animateScroll = function () {
            currentTime += increment

            var val = Math.easeInOutQuad(currentTime, start, change, duration)

            element.scrollTop = val

            if (currentTime < duration) {
                setTimeout(animateScroll, increment)
            }
        }

        animateScroll()
    }

    OriginScroller.prototype.getHash = function (element) {
        var url = element

        if (typeof element !== 'string') {
            url = element.tagName === 'A' ? element.href : element.getAttribute('data-scroll')
        }

        var hash = new RegExp('#(.*)$', 'g')
        var matches = url.match(hash)

        if (url[0] === '#' || url.indexOf(window.location.hostname) !== -1 && matches) {
            return matches[0]
        }

        return false
    }

    window.OriginScroller = OriginScroller

    new OriginScroller()

})(window, document)