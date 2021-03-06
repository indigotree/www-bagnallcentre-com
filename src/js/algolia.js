;(function (window, document, undefined) {

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
    document.addEventListener('DOMContentLoaded', function(event) {

        var searchQuery = document.getElementById('search-query');

        if (!searchQuery) {
            return;
        }

        var search = instantsearch({
            appId: '2KW6TV0X05',
            apiKey: 'd6345af46064ac8259f317d8fadc78f4',
            indexName: 'the_bagnall_centre',
            searchParameters: {
                query: getUrlParameter('s')
            },
            searchFunction: function(helper) {
                document.getElementById('searched-for').innerText = helper.state.query;
                helper.search();
            }
        });

        search.addWidget(instantsearch.widgets.searchBox({
            container: '#search-query',
            placeholder: "Search",
            autofocus: true,
            poweredBy: true
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
                    '<div class="search-result">' + 
                        '<h2>' + 
                            '<a href="{{ url }}" class="search-result__link">' +
                                '{{ title }}' + 
                            '</a>' +
                        '</h2>' +
                        '<p class="search-result__description">{{ content }}</p>' + 
                    '</div>'
            }
        }));

        search.start();

    });

})(window, document)