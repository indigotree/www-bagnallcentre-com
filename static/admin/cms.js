
var TimeControl = createClass({

    componentDidMount: function () {
        console.log(this.props.onChange('2000-01-01T19:45:00+00:00'));
        document.body.addEventListener('mousedown', this.closeTimeControl);
    },

    componentWillUnmount: function () {
        document.removeEventListener('mousedown', this.closeTimeControl);
    },

    getInitialState: function () {
        return {
            open: false,
            date: this.props.value ? moment(this.props.value).month(0) : moment()
        };
    },

    handleFocus: function (e) {
        this.setState({ open: !this.state.open })
    },

    incrementHour: function (e) {
        e.preventDefault();
        this.setState({
            date: this.state.date.add(1, 'h')
        }, this.handleChange);
    },

    decrementHour: function (e) {
        e.preventDefault();
        this.setState({
            date: this.state.date.subtract(1, 'h')
        }, this.handleChange);
    },

    incrementMinute: function (e) {
        e.preventDefault();
        this.setState({
            date: this.state.date.add(1, 'm')
        }, this.handleChange);
    },

    decrementMinute: function (e) {
        e.preventDefault();
        this.setState({
            date: this.state.date.subtract(1, 'm')
        }, this.handleChange);
    },

    incrementTwelveHours: function (e) {
        e.preventDefault();
        
        this.setState({
            date: this.state.date.add('12', 'h')
        }, this.handleChange)
    },

    decrementTwelveHours: function (e) {
        e.preventDefault();
        this.setState({
            date: this.state.date.subtract('12', 'h')
        }, this.handleChange)
    },

    handleChange: function () {
        var todayDate = moment({
            year: 2000,
            month: 0,
            day: 01,
            hour: this.state.date.hour(),
            minute: this.state.date.minutes(),
            second: 00,
            millisecond: 00
        })
        this.props.onChange(todayDate.format(moment.defaultFormat))
    },

    closeTimeControl: function (e) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.open) {
            this.setState({ open: !this.state.open })
        }
    },

    setWrapperRef: function(node) {
        this.wrapperRef = node;
    },

    render: function () {
        return h('div', { class: 'rdt origin-time-picker-wrapper', ref: this.setWrapperRef },
            h('input', { type: 'text', class: 'nc-controlPane-widget', value: this.state.date.format('h:mm A'), onFocus: this.handleFocus }),
            h('div', { class: 'origin-time-picker ' + (this.state.open ? 'origin-time-picker--open' : '') },
                h('table', {},
                    h('tr', {},
                        h('td', {},
                            h('div', { class: 'rdtCounters' }, 
                                h('div', { class: 'rdtCounter' },
                                    h('span', { class: 'rdtBtn', onClick: this.incrementHour }, '▲'),
                                    h('div', { class: 'rdtCount' }, this.state.date.format('h')),
                                    h('span', { class: 'rdtBtn', onClick: this.decrementHour }, '▼')
                                ),
                                h('div', { class: 'rdtCounterSeparator' }, ':'),
                                h('div', { class: 'rdtCounter' },
                                    h('span', { class: 'rdtBtn', onClick: this.incrementMinute }, '▲'),
                                    h('div', { class: 'rdtCount' }, this.state.date.format('mm')),
                                    h('span', { class: 'rdtBtn', onClick: this.decrementMinute }, '▼')
                                ),
                                h('div', { class: 'rdtCounter' },
                                    h('span', { class: 'rdtBtn', onClick: this.incrementTwelveHours }, '▲'),
                                    h('div', { class: 'rdtCount' }, this.state.date.format('A')),
                                    h('span', { class: 'rdtBtn', onClick: this.decrementTwelveHours }, '▼')
                                ),
                            )
                        )
                    )
                )
            )
        );
    }

})

var TimePreview = createClass({

    render: function () {
        return h('div', {}, 
            h('strong', {}, this.props.field.get('label')),
            h('span', {}, ': ' + moment(this.props.value).format('h:mm A'))
        );
    }

})

CMS.registerWidget('time', TimeControl, TimePreview)


var CategoriesControl = createClass({
    handleChange: function(e) {
      this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
    },
  
    render: function() {
      var value = this.props.value;
      return h('input', { type: 'text', value: value ? value.join(', ') : '', class: 'nc-controlPane-widget', onChange: this.handleChange });
    }
  });
  
  var CategoriesPreview = createClass({
    render: function() {
      return h('ul', {},
        this.props.value.map(function(val, index) {
          return h('li', {key: index}, val);
        })
      );
    }
  });
  
  CMS.registerWidget('categories', CategoriesControl, CategoriesPreview);




CMS.registerPreviewStyle('https://unpkg.com/netlify-cms-yoast-seo@~1.0/dist/main.css');

// Pages
//
CMS.registerPreviewTemplate('pages', createClass({
    render: function () {
        const entry = this.props.entry
        const title = entry.getIn(['data', 'title']) || ''

        YOAST.setContent({
            title: title,
            description: entry.getIn(['data', 'description']) || '',
            keyword: entry.getIn(['data', 'yoast_keyword']) || '',
            text: entry.getIn(['data', 'body']) || '',
            titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
        })

        return h('div', {},
            this.props.widgetFor('body'),
            YOAST.getScoresAsHTML(h)
        );
    }
}));


CMS.registerPreviewTemplate('news', createClass({
    render: function () {
        const entry = this.props.entry
        const title = entry.getIn(['data', 'title']) || ''

        YOAST.setContent({
            title: title,
            description: entry.getIn(['data', 'description']) || '',
            keyword: entry.getIn(['data', 'yoast_keyword']) || '',
            text: entry.getIn(['data', 'body']) || '',
            titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
        })

        return h('div', {},
            this.props.widgetFor('body'),
            YOAST.getScoresAsHTML(h)
        );
    }
}));

CMS.registerPreviewTemplate('therapies', createClass({
    render: function () {
        const entry = this.props.entry
        const title = entry.getIn(['data', 'title']) || ''

        YOAST.setContent({
            title: title,
            description: entry.getIn(['data', 'description']) || '',
            keyword: entry.getIn(['data', 'yoast_keyword']) || '',
            text: entry.getIn(['data', 'body']) || '',
            titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
        })

        return h('div', {},
            this.props.widgetFor('body'),
            YOAST.getScoresAsHTML(h)
        );
    }
}));

CMS.registerPreviewTemplate('whats-on', createClass({
    render: function () {
        const entry = this.props.entry
        const title = entry.getIn(['data', 'title']) || ''

        YOAST.setContent({
            title: title,
            description: entry.getIn(['data', 'description']) || '',
            keyword: entry.getIn(['data', 'yoast_keyword']) || '',
            text: entry.getIn(['data', 'body']) || '',
            titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
        })

        return h('div', {},
            this.props.widgetFor('body'),
            YOAST.getScoresAsHTML(h)
        );
    }
}));



CMS.registerEditorComponent({
    // Internal id of the component
    id: "align",
    // Visible label
    label: "Alignment",
    // Fields the user need to fill out when adding an instance of the component
    fields: [
        {name: 'alignment', label: 'Alignment', widget: 'select', options: ['left', 'center', 'right'], default: 'left'},
        {name: 'content', label: 'Content', widget: 'markdown'}
    ],
    // Pattern to identify a block as being an instance of this component
    pattern: /^{{< align alignment="(.*)" >}}((.|\n)*){{< \/align >}}$/,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {
        alignment: match[1],
        content: match[2]
      };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
        return '{{< align alignment="'+ obj.alignment +'" >}}' + obj.content + '{{< /align >}}';
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
      return (
          '<div style="text-align: ' + obj.alignment + ';">' + obj.content + '</div>'
      );
    }
  });

CMS.registerEditorComponent({
    // Internal id of the component
    id: "room",
    // Visible label
    label: "Room",
    // Fields the user need to fill out when adding an instance of the component
    fields: [
        {name: 'alignment', label: 'Alignment', widget: 'select', options: ['left', 'right'], default: 'left'},
        {name: 'image', label: 'Image', widget: 'image' },
        {name: 'content', label: 'Content', widget: 'markdown'}
    ],
    // Pattern to identify a block as being an instance of this component
    pattern: /^{{< room(left|right) title="(.*)" image="(.*)">}}((.|\n)*){{< \/room(left|right) >}}$/,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {
        alignment: match[1],
        title: match[2],
        image: match[3],
        content: match[4]
      };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
        return '{{< room' + obj.alignment + ' title="' + obj.title + '" image="' + obj.image + '" >}}' + obj.content + '{{< /room' + obj.alignment + ' >}}';
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
      return (
        '<h2>' + obj.title + '</h2>' +
        '<div class="room room--' + obj.alignment + '">' + 
            '<div class="room__thumbnail">' +
                '<img src="/' + obj.image + '" alt="' + obj.title + '">' + 
            '</div>' +
            '<div class="room__description">' +
                obj.content + 
            '</div>' +
        '</div>'
      );
    }
  });