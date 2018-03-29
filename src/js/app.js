;(function ($, window, document, undefined) {

    /**
     * Get a param from location.search
     * 
     * @param {String} name 
     * @returns {Mixed}
     */
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    /**
     * Update contact us message value
     * 
     * @returns {void}
     */
    function handleFormInjection () {
        var textarea = document.querySelector('textarea#message');

        if (!textarea || !window.location.search.length) {
            return;
        }

        textarea.value = `I would like to book onto ${getUrlParameter('course')} on ${getUrlParameter('day')} starting at ${getUrlParameter('time')} with ${getUrlParameter('associate')}`;
    }

    /**
     * Add Box shadow to header when scroll past 100
     * 
     * @param {Object} event
     * @returns {void}
     */
    function addBoxShadow(event) {
        $("#headercontainer").css({
            boxShadow: window.scrollY > 100 ? "0 1px 3px rgba(0, 0, 0, 0.15)" : "none"
        })
    }

    /**
     * Toggle collapsable element
     * 
     * @param {Object} event 
     */
    function toggleCollapse(event) {
        var id = $(this).data('toggle')
        var $element = $(id)

        if (!$element.length) {
            console.error(id + ' Not found cannot toggle');
            return false;
        }

        $element.toggle(0);

        return false;
    }

    /**
     * Toggle an accordion item
     * 
     * @param {Object} event 
     */
    function toggleAccordion(event) {
        if (event.target == $(this).find('.btn')[0] || event.target == $(this).find('.btn')[0]) {
            return;
        }
        $(this).toggleClass('active');
        $(this).next().slideToggle("slow");
        return false;
    }

    /**
     * Defer Styles
     */
    function loadDeferredStyles() {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
    }

    /**
     * Display an emergency alert
     * 
     * @param {jQuery} alert 
     */
    function emergencyAlert(alert) {
        if (!alert.length || sessionStorage.getItem('emergency') === 'true') {
            return;
        }

        toastr.options.closeButton = true;
        toastr.options.timeOut = 0; // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 0; // How long the toast will display after a user hovers over it

        toastr.options.onCloseClick = function () {
            sessionStorage.setItem('emergency', 'true');
        }

        toastr.warning(alert.html());
    }

    $(function () {

        // Init
        //
        handleFormInjection();
        addBoxShadow();
        emergencyAlert($('#emergency'));

        // Events
        //
        $('[data-toggle]').on('click', toggleCollapse);
        $(".activities .activity, .accordion .accordion__header").on('click', toggleAccordion);
        $(window).on('scroll', addBoxShadow);
        if (window.location.pathname === '/search/') {
            $('#search-button-toggle').on('click', function () {
                $('#search-query').focus();
            })
        }

    });

    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    if (raf) {
        raf(function() { 
            window.setTimeout(loadDeferredStyles, 0);
        });
    } else {
        window.addEventListener('load', loadDeferredStyles);
    }

})(jQuery, window, document);