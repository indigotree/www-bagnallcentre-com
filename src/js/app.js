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
        var textarea = $('textarea#message');

        if (!textarea.length && !window.location.search.length) {
            return;
        }

        textarea.val(
            'I would like to book onto ' + getUrlParameter('course') + ' on ' +
            getUrlParameter('day') + ' starting at ' + getUrlParameter('time') +
            ' with ' + getUrlParameter('associate')
        );

    }

    $(function () {

        handleFormInjection();

        $(".products .one-col-class, .productsmobile .one-col-class").click(function() {
            var $content = $(this).next("div")
            if ($content.is(":visible")) {
                $content.slideUp("slow");
            } else {
                $(this).parent().find('.productdescription').slideUp("slow");
                $content.slideToggle("slow");
            }
        });

    });

})(jQuery, window, document);