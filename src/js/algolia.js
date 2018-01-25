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

    /* Algolia */
    $(document).ready(function() {


        $('#search-results').each(function() {

            var search = instantsearch({
                appId: '58GE0JP7ZR',
                apiKey: '4d6787f6d3cecf80aed0dedd34fd5fa9',
                indexName: 'the_bagnall_centre',
                searchParameters: {
                    query: getUrlParameter('s')
                },
                searchFunction: function(helper) {
                    $('#searched-for').text(helper.state.query);
                    helper.search();
                }
            });

            search.addWidget(instantsearch.widgets.searchBox({
                container: '#search-query',
                placeholder: "Search",
                autofocus: true,
                poweredBy: false
            }));

            search.addWidget(instantsearch.widgets.infiniteHits({
                container: '#search-results',
                autoHideContainer: true,
                transformData: function(data) {
                    if (data.quote) {
                        data.quote = data.quote.replace(/<(\/)?a[^>]*>/g, '<$1span>');
                    }

                    return data;
                },
                templates: {
                    empty: '<h2>No results</h2>',
                    item:
                        '<div class="result-row">' + 
                            '<a href="{{ url }}">' +
                                '<h2>{{ title }}</h2>' +
                                '<p>{{ content }}</p>' + 
                            '</a>' +
                        '</div>'
                }
            }));

            search.start();

        });

        // getUrlParameter('s')
        $('#search-query').on('keyup', function() {
            
        });

    });

})(jQuery, window, document)