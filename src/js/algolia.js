;(function ($, window, document, undefined) {

    /* Algolia */
    $(document).ready(function() {

        $('#search-results').each(function() {

            var search = instantsearch({
                appId: '58GE0JP7ZR',
                apiKey: '4d6787f6d3cecf80aed0dedd34fd5fa9',
                indexName: 'the_bagnall_centre',
                searchFunction: function(helper) {
                    if (helper.state.query === '') {
                        $('#latest-statements').show();
                        $('#search-results').hide();
                    } else {
                        $('#latest-statements').hide();
                        $('#search-results').show();
                        helper.search();
                    }
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
                    empty: 'No results',
                    item:
                        '<a class="summary-card" href="/{{objectID}}">' +
                            '{{title}}' +
                        '</a>'
                }
            }));

            search.start();

        });

    });

})(jQuery, window, document)