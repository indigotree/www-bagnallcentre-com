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
        $(this).next().slideToggle("slow");
        return false;
    }

    $(function () {

        // Init
        //
        handleFormInjection();
        addBoxShadow();

        // Events
        //
        $('[data-toggle]').on('click', toggleCollapse);
        $(".products .one-col-class, .productsmobile .one-col-class").on('click', toggleAccordion);
        $(window).on('scroll', addBoxShadow);
        if (window.location.pathname === '/search/') {
            $('#search-button-toggle').on('click', function () {
                $('#search-query').focus();
            })
        }

    });

})(jQuery, window, document);