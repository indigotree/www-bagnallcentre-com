
var TimeControl = createClass({

    componentDidMount: function () {
        document.body.addEventListener('mousedown', this.closeTimeControl);
    },

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeTimeControl);
    },

    getInitialState: function() {
        return {
            open: false,
            date: moment(this.props.value)
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
            month: 1,
            day: 1,
            hour: this.state.date.hour(),
            minute: this.state.date.minutes(),
            second: 000,
            millisecond: 000
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
      return h('input', { type: 'text', value: value ? value.join(', ') : '', onChange: this.handleChange });
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