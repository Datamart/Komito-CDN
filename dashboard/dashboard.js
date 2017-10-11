/**
 * @fileoverview Common JavaScript functions for Komito Analytics dashboard.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/analytics/devguides/reporting/core/v4/
 */

(function() {
  /**
   * List of Google Analytics API client Ids.
   * @const {!Array.<string>}
   */
  var GA_CLIENT_IDS = ['916578379838-563l731n53m74teqmq98v2p7ngrva4r7'];

  /**
   * List of events dimensions.
   * @const {!Array.<string>}
   * @see https://developers.google.com/analytics/devguides/reporting/core/dimsmets
   */
  var EVENTS_DIMENSIONS = ['eventCategory', 'eventAction', 'eventLabel'];

  /**
   * List of events metrics.
   * @const {!Array.<string>}
   * @see https://developers.google.com/analytics/devguides/reporting/core/dimsmets
   */
  var EVENTS_METRICS = ['totalEvents', 'uniqueEvents',
                        'sessionsWithEvent', 'eventsPerSessionWithEvent'];
                        // 'eventValue', 'avgEventValue', 'sessions',

  /** @const {number} */ var EVENTS_DIMENSIONS_LENGTH = EVENTS_DIMENSIONS.length;
  /** @const {number} */ var EVENTS_CATEGORY_INDEX = 0;
  /** @const {number} */ var EVENTS_ACTION_INDEX = 1;
  /** @const {number} */ var EVENTS_LABEL_INDEX = 2;
  /** @const {number} */ var EVENTS_TOTAL_INDEX = EVENTS_DIMENSIONS_LENGTH;
  /** @const {number} */ var EVENTS_UNIQUE_INDEX = EVENTS_DIMENSIONS_LENGTH + 1;
  /** @const {number} */ var EVENTS_SESSIONS_INDEX = EVENTS_DIMENSIONS_LENGTH + 2;
  /** @const {number} */ var EVENTS_PER_SESSIONS_INDEX = EVENTS_DIMENSIONS_LENGTH + 3;

  /**
   * List of social dimensions.
   * @const {!Array.<string>}
   * @see https://developers.google.com/analytics/devguides/reporting/core/dimsmets
   */
  var SOCIAL_DIMENSIONS = ['socialInteractionNetwork', 'socialInteractionAction' //,
                           // 'socialInteractionNetworkAction', 'socialInteractionTarget',
                           //'socialEngagementType'
                          ];

  /**
   * List of social metrics.
   * @const {!Array.<string>}
   * @see https://developers.google.com/analytics/devguides/reporting/core/dimsmets
   */
  var SOCIAL_METRICS = ['socialInteractions', 'uniqueSocialInteractions',
                        'socialInteractionsPerSession']; // 'sessions',

  /** @const {number} */ var SOCIAL_DIMENSIONS_LENGTH = SOCIAL_DIMENSIONS.length;
  /** @const {number} */ var SOCIAL_NETWORK_INDEX = 0;
  /** @const {number} */ var SOCIAL_ACTION_INDEX = 1;
  /** @const {number} */ var SOCIAL_INTERACTIONS_INDEX = SOCIAL_DIMENSIONS_LENGTH;
  /** @const {number} */ var SOCIAL_UNIQUE_INDEX = SOCIAL_DIMENSIONS_LENGTH + 1;
  /** @const {number} */ var SOCIAL_PER_SESSIONS_INDEX = SOCIAL_DIMENSIONS_LENGTH + 2;

  /**
   * List of widgets Ids.
   * @const {!Array.<string>}
   */
  var WIDGETS = ['events-scroll', 'events-outbound', 'events-cta',
                 'events-download', 'events-form', 'events-print',
                 'events-video', 'events-other',
                 'social-pageview', 'social-outbound', 'social-other'];

  /**
   * @const {string}
   */
  var NO_DATA = 'No data';

  /**
   * @const {number}
   */
  var MAX_ROWS = 5;

  /**
   * Initializes dashboard.
   * @see https://developers.google.com/analytics/devguides/reporting/embed/v1/core-methods-reference#ready
   * @private
   */
  function init_() {
    window['gapi'] = window['gapi'] || {};
    window['gapi']['analytics'] = {
      'q': [],
      'ready': function(callback) { window['gapi']['analytics']['q'].push(callback); }
    };

    var script = document.createElement('SCRIPT');
    var fs = document.getElementsByTagName('SCRIPT')[0];
    script.src = 'https://apis.google.com/js/platform.js';
    fs.parentNode.insertBefore(script, fs);
    script.onload = function() { window['gapi']['load']('analytics'); };

    window['gapi']['analytics']['ready'](onReady_);
  }

  /**
   * Queues a callback function to be invoked as soon as the Embed API library is fully loaded.
   * @see https://developers.google.com/analytics/devguides/reporting/embed/v1/core-methods-reference#ready
   * @see https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference#auth-methods
   * @private
   */
  function onReady_() {
    var auth = window['gapi']['analytics']['auth'];
    var clientId = GA_CLIENT_IDS[Math.floor(Math.random() * GA_CLIENT_IDS.length)];
    var body = document.body;

    auth['on']('signIn', function() {
      body.classList.remove('is-needingAuthorization');
      body.classList.add('is-authorized');
      document.getElementById('header-sign-out').onclick = function() { auth['signOut'](); }

      initViewSelector_();
      console.log('onReady_:', auth['getUserProfile']());
    });

    auth['on']('signOut', function() {
      body.classList.remove('is-authorized');
      body.classList.add('is-needingAuthorization');
    });

    auth['once']('needsAuthorization', function() {
      console.log('[ERROR]', 'once.needsAuthorization', arguments);
    });

    auth['once']('error', function() {
      console.log('[ERROR]', 'once.error', arguments);
    });

    auth['authorize']({
      'container': 'embed-api-auth-container',
      'userInfoLabel': '',
      'clientid': clientId + '.apps.googleusercontent.com'
    });
  }

  /**
   * Initializes Google Analytics View Selector.
   * @see https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference#viewselector
   * @private
   */
  function initViewSelector_() {
      var viewId = null;
      var selector = new window['gapi']['analytics']['ViewSelector'](
          {'container': 'view-selector'});
      selector['on']('change', function(ids) {viewId=ids;});
      selector['execute']();

      document.getElementById('run-button').onclick = function() {
        queryReports_(viewId);
      }
  }

  /**
   * @param {string} viewId The Google Analytics View Id.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
   * @private
   */
  function queryReports_(viewId) {
    var endDate = new Date;
    var startDate = new Date;
    startDate.setMonth(startDate.getMonth() - 1);

    document.getElementById('reports').style.display = 'block';
    setWidgetsContent_('Loading...');
    otherEvents_ = {};
    otherSocial_ = {};

    window['gapi']['client']['request']({
      'path': '/v4/reports:batchGet',
      'root': 'https://analyticsreporting.googleapis.com/',
      'method': 'POST',
      'body': {
        'reportRequests': [{
          'viewId': viewId,
          'dateRanges': [{
            'startDate': startDate.toISOString().slice(0, 10),
            'endDate': endDate.toISOString().slice(0, 10)
          }],
          'metrics': EVENTS_METRICS.map(function(name){return {'expression': 'ga:' + name}}),
          'dimensions': EVENTS_DIMENSIONS.map(function(name){return {'name': 'ga:' + name}})
        }, {
          'viewId': viewId,
          'dateRanges': [{
            'startDate': startDate.toISOString().slice(0, 10),
            'endDate': endDate.toISOString().slice(0, 10)
          }],
          'metrics': SOCIAL_METRICS.map(function(name){return {'expression': 'ga:' + name}}),
          'dimensions': SOCIAL_DIMENSIONS.map(function(name){return {'name': 'ga:' + name}})
        }]
      }
    })['then'](displayResults_, function(response) {
      var error = response && response['result'] && response['result']['error'];
      if (error) {
        alert(error['message'] || error);
        setWidgetsContent_(NO_DATA);
      }
      console.log('[ERROR]', response);
    });
  }

  /**
   * Sets the same content for all widgets.
   * @param {string} content The content to set.
   * @private
   */
  function setWidgetsContent_(content) {
    WIDGETS.forEach(function(name) { setWidgetContent_(name, content); });
  }

  /**
   * Sets widget content.
   * @param {string} name The widget name.
   * @param {string} content The content to set.
   * @private
   */
  function setWidgetContent_(name, content) {
    /** @type {Element} */ var widget = document.getElementById('report-' + name);

    if (widget && widget.lastElementChild) {
      widget.lastElementChild.innerHTML = content;
    } else {
      console.log('[ERROR] Could not find widget "' + name +'".');
    }
  }

  /**
   * @param {!Object} response The response object.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#response-body
   * @private
   */
  function displayResults_(response) {
    setWidgetsContent_(NO_DATA);

    var reports = response['result'] && response['result']['reports'];
    if (reports) {
      reports.forEach(function(report) {
        var dimension = report['columnHeader']['dimensions'][0];
        if ('ga:' + EVENTS_DIMENSIONS[0] === dimension) {
          renderEventsReports_(report);
        } else if ('ga:' + SOCIAL_DIMENSIONS[0] === dimension) {
          renderSocialReports_(report);
        } else {
          console.log('[WARN] UNKNOWN REPORT TYPE:', report);
        }
      });
    }
  }

  /**
   * Renders reports.
   * @param {!Object} report The report object.
   * @param {string} type The report type.
   * @param {function(string, Array):boolean} iterator The widget iterator.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#Report
   * @private
   */
  function renderReports_(report, type, iterator) {
    /** @type {!Object.<string, Array>} */ var tables = {};
    /** @type {Array} */ var rows = report['data']['rows'];
    /** @type {boolean} */ var isEvents = 'events' === type;
    var index = isEvents ? EVENTS_CATEGORY_INDEX : SOCIAL_ACTION_INDEX;

    rows && rows.forEach(function(row) {
      var dimension = row['dimensions'][index].split(':')[0];
      tables[dimension] = tables[dimension] || [];
      tables[dimension].push([].concat(row['dimensions'], row['metrics'][0]['values']));
    });

    Object.keys(tables).forEach(function(dimension) {
      if (!iterator(dimension, tables[dimension])) {
        (isEvents ? otherEvents_ : otherSocial_)[dimension] = tables[dimension];
      }
    });

    renderOther_(isEvents);
  }

  /**
   * Renders Events reports.
   * @param {!Object} report The report object.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#Report
   * @private
   */
  function renderEventsReports_(report) {
    renderReports_(report, 'events', function(key, data) {
      /** @type {boolean} */ var result = true;

      if ('scroll' === key) renderScrollEventsWidget_(data);
      else if ('outbound' === key) renderOutboundEventsWidget_(data);
      else if ('cta' === key) renderCtaEventsWidget_(data);
      else if ('download' === key) renderDownloadEventsWidget_(data);
      else if ('form' === key) renderFormEventsWidget_(data);
      else if ('print' === key) renderPrintEventsWidget_(data);
      else if ('video' === key) renderVideoEventsWidget_(data);
      else result = false;

      return result;
    });
  }

  /**
   * Renders Social reports.
   * @param {!Object} report The report object.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#Report
   * @private
   */
  function renderSocialReports_(report) {
    renderReports_(report, 'social', function(key, data) {
      /** @type {boolean} */ var result = true;

      if ('pageview' === key) renderSocialPageviewsWidget_(data);
      else if ('outbound' === key) renderSocialOutboundWidget_(data);
      else result = false;

      return result;
    });
  }

  /**
   * Converts camelCase text to human-readable text.
   * @param {string} text Text to convert.
   * @return {string} Converted text.
   * @private
   */
  function toLabel_(text) {
    /** @type {string} */ var first = text.charAt(0);
    first = first != first.toUpperCase() ? first.toUpperCase() : '';
    return (first + text.replace(/([A-Z])/g, ' $1').slice(1)).replace(/[\_\-]/g, ' ');
  }

  function aggregateBy_(data, column) {
    /** @type {!Object.<string, !Array>} */ var map = {};

    data.forEach(function(row) {
      /** @type {string} */ var dimension = row[column];
      map[dimension] = map[dimension] || ['', dimension, '', 0, 0, 0, 0];

      row.forEach(function(value, index) {
        if (index >= EVENTS_DIMENSIONS_LENGTH) {
          map[dimension][index] += +value;
        }
      });
    });

    return Object.values(map);
  }

  /**
   * Renders scroll events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderScrollEventsWidget_(data) {
    /** @type {number} */ var index = 1; // Sort index.
    /** @type {!Array.<!Object>} */ var columns = ['Depth'].concat(EVENTS_METRICS.map(function(name) {
      return {'label': toLabel_(name), 'type': 'number', 'name': name, 'width': '14%'}
    }));

    renderWidget_(data, 'events-scroll', index, columns, function(row, callback) {
      /** @type {number} */ var value = parseInt(row[EVENTS_LABEL_INDEX], 10);
      if (value >= 25 && value <= 100) {
        value = +row[EVENTS_TOTAL_INDEX];
        callback(value, [
            row[EVENTS_LABEL_INDEX],
            value,
            row[EVENTS_UNIQUE_INDEX],
            row[EVENTS_SESSIONS_INDEX],
            (+row[EVENTS_PER_SESSIONS_INDEX]).toFixed(2)
        ]);
      }
    });
  }

  /**
   * Renders CTA events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderCtaEventsWidget_(data) {
    /** @type {number} */ var index = 2; // Sort index.
    /** @type {!Array.<!Object>} */ var columns = [
      {'label': 'Category', 'width': '10%'},
      {'label': 'Action', 'width': '20%'}
    ].concat(EVENTS_METRICS.map(function(name) {
      return {'label': toLabel_(name), 'type': 'number', 'name': name, 'width': '10%'};
    }));

    renderWidget_(data, 'events-cta', index, columns, function(row, callback) {
      /** @type {number} */ var value = +row[EVENTS_TOTAL_INDEX];
      callback(value, [
          row[EVENTS_CATEGORY_INDEX].slice(4), // 'cta:'
          row[EVENTS_ACTION_INDEX].slice(0, 50),
          value,
          row[EVENTS_UNIQUE_INDEX],
          row[EVENTS_SESSIONS_INDEX],
          (+row[EVENTS_PER_SESSIONS_INDEX]).toFixed(2)
      ]);
    });
  }

  /**
   * Renders outbound events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderOutboundEventsWidget_(data) {
    renderAggregatedEventWidget_(data, 'Domain', 'events-outbound');
  }

  /**
   * Renders download events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderDownloadEventsWidget_(data) {
    renderAggregatedEventWidget_(data, 'File', 'events-download');
  }

  /**
   * Renders print events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderPrintEventsWidget_(data) {
    renderAggregatedEventWidget_(data, 'Page', 'events-print');
  }

  /**
   * Renders forms events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderFormEventsWidget_(data) {
    /** @type {number} */ var index = 3; // Sort index.
    /** @type {!Array.<!Object>} */ var columns = [
      {'label': 'Form', 'width': '10%'},
      {'label': 'Field', 'width': '10%'},
      {'label': 'Type', 'width': '10%'}
    ].concat(EVENTS_METRICS.map(function(name) {
      return {'label': toLabel_(name), 'type': 'number', 'name': name, 'width': '10%'};
    }));

    renderWidget_(data, 'events-form', index, columns, function(row, callback) {
      /** @type {number} */ var value = +row[EVENTS_TOTAL_INDEX];
      /** @type {!Array} */ var field = row[EVENTS_LABEL_INDEX].split(':');
      callback(value, [
          row[EVENTS_ACTION_INDEX],
          field[0],
          field[1],
          value,
          row[EVENTS_UNIQUE_INDEX],
          row[EVENTS_SESSIONS_INDEX],
          (+row[EVENTS_PER_SESSIONS_INDEX]).toFixed(2)
      ]);
    });
  }

  /**
   * Renders video events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderVideoEventsWidget_(data) {
    /** @type {!Object.<string, !Array>} */ var map = {};

    data.forEach(function(row) {
      /** @type {string} */ var dimension = row[0] + '-' + row[1];
      map[dimension] = map[dimension] || [row[0], row[1], '', 0, 0, 0, 0];

      row.forEach(function(value, index) {
        if (index >= EVENTS_DIMENSIONS_LENGTH) {
          map[dimension][index] += +value;
        }
      });
    });

    data = Object.values(map);

    /** @type {number} */ var index = 2; // Sort index.
    /** @type {!Array.<!Object>} */ var columns = [
      {'label': 'Type', 'width': '15%'},
      {'label': 'Action', 'width': '15%'}
    ].concat(EVENTS_METRICS.map(function(name) {
      return {'label': toLabel_(name), 'type': 'number', 'name': name, 'width': '10%'};
    }));

    renderWidget_(data, 'events-video', index, columns, function(row, callback) {
      /** @type {number} */ var value = +row[EVENTS_TOTAL_INDEX];
      /** @type {!Array} */ var field = row[EVENTS_LABEL_INDEX].split(':');
      callback(value, [
          row[EVENTS_CATEGORY_INDEX].slice(6), // video:
          row[EVENTS_ACTION_INDEX],
          value,
          row[EVENTS_UNIQUE_INDEX],
          row[EVENTS_SESSIONS_INDEX],
          (+row[EVENTS_PER_SESSIONS_INDEX]).toFixed(2)
      ]);
    });
  }

  /**
   * Renders print events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @param {string} column The aggregated column name.
   * @param {string} widget The widget Id.
   * @private
   */
  function renderAggregatedEventWidget_(data, column, widget) {
    /** @type {number} */ var index = 1; // Sort index.
    /** @type {!Array.<!Object>} */ var columns = [column].concat(EVENTS_METRICS.map(function(name) {
      return {'label': toLabel_(name), 'type': 'number', 'name': name, 'width': '14%'};
    }));

    data = aggregateBy_(data, EVENTS_ACTION_INDEX);
    renderWidget_(data, widget, index, columns, function(row, callback) {
      /** @type {number} */ var value = +row[EVENTS_TOTAL_INDEX];
      callback(value, [
          row[EVENTS_ACTION_INDEX],
          value,
          row[EVENTS_UNIQUE_INDEX],
          row[EVENTS_SESSIONS_INDEX],
          (+row[EVENTS_PER_SESSIONS_INDEX]).toFixed(2)
      ]);
    });
  }

  /**
   * Renders social pageviews widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderSocialPageviewsWidget_(data) {
    renderSocialWidget_('pageview', data);
  }

  /**
   * Renders social outbounds widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderSocialOutboundWidget_(data) {
    renderSocialWidget_('outbound', data);
  }

  function renderSocialWidget_(widget, data) {
    /** @type {number} */ var index = 1; // Sort index.
    /** @type {!Array.<!Object>} */ var columns =  ['Network'].concat(SOCIAL_METRICS.map(function(name) {
      return {'label': toLabel_(name), 'name': name, 'width': '14%', 'type': 'number'}
    }));

    renderWidget_(data, 'social-' + widget, index, columns, function(row, callback) {
      /** @type {number} */ var value = +row[SOCIAL_INTERACTIONS_INDEX];
      callback(value, [
          row[SOCIAL_NETWORK_INDEX],
          value,
          row[SOCIAL_UNIQUE_INDEX],
          (+row[SOCIAL_PER_SESSIONS_INDEX]).toFixed(2)
      ]);
    });
  }

  function renderWidget_(data, widget, index, columns, iterator, opt_comparator) {
    /** @type {!Array.<Array>} */ var filtered = [];
    /** @type {number} */ var max = 0;
    /** @type {number} */ var total = 0;
    /** @type {string} */ var container = 'report-' + widget + '-table-container';
    /** @type {!Object} */ var options =  {'footer': false};
    /** @type {boolean} */ var isEvents = !widget.indexOf('events');

    data.forEach(function(row) {
      iterator(row, function(value, row) {
        if (row) {
          max = Math.max(max, value);
          total += value;
          filtered.push(row);
        }
      });
    });

    filtered.sort(opt_comparator || function(a, b) {
      return b[index] - a[index];
    });

    filtered.forEach(function(row) {
      row.push(getBar_(row[index], max, total));
    });

    columns.push({
      'label': '% ' + toLabel_((isEvents ? EVENTS_METRICS : SOCIAL_METRICS)[0]),
      'name': 'presents', 'width': '30%'
    });

    setWidgetContent_(widget, '<div id="' + container + '"></div>');

    (new charts.DataTable(container)).draw(
        [columns].concat(filtered.slice(0, MAX_ROWS)), options);
  }

  function getBar_(value, max, total) {
    /** @type {number} */ var presents = value / total * 100;
    /** @type {number} */ var padding = 20;
    /** @type {number} */ var width = value / max * 100 - padding;

    if (0 >= width) {
      width = presents;
    }

    return '<div class="bar">' +
           '<span style="width:' + Math.max(1, width) + '%"></span>' +
           presents.toFixed(2) + '%</div>';
  }

  function renderOther_(isEvents) {
    var map = isEvents ? otherEvents_ : otherSocial_;
    var type = isEvents ? 'events' : 'social';
    var container = 'report-' + type + '-other';
    var cell = document.getElementById(container).lastElementChild;
    var dimensions = Object.keys(map);

    setWidgetContent_(type + '-other', dimensions.length ? '' : NO_DATA);

    dimensions.forEach(function(dimension) {
      var suffix = dimension.toLowerCase().replace(/\W+/g, '-');
      var parent = cell.appendChild(document.createElement('DIV'));
      parent.className = 'kmt-parameter';

      parent.appendChild(document.createElement('H4')).innerHTML = toLabel_(dimension);
      var div = parent.appendChild(document.createElement('DIV'));
      div.id = container + '-' + suffix + '-table-container';

      var data = map[dimension];
      var widget = type + '-other-' + suffix;

      /** @type {number} */ var index = isEvents ? 3 : 2; // Sort index.
      /** @type {!Array.<!Object>} */ var columns = [].concat(
        (isEvents ? EVENTS_DIMENSIONS : SOCIAL_DIMENSIONS).map(function(name) {
          return {'label': toLabel_(name)};
        }),
        (isEvents ? EVENTS_METRICS : SOCIAL_METRICS).map(function(name) {
          return {'label': toLabel_(name), 'type': 'number', 'name': name, 'width': '10%'};
        }));

      columns.shift();
      renderWidget_(data, widget, index, columns, function(row, callback) {
        var index = isEvents ? EVENTS_PER_SESSIONS_INDEX : SOCIAL_PER_SESSIONS_INDEX;
        row[index] = (+row[index]).toFixed(2);
        row.shift();
        index = isEvents ? EVENTS_TOTAL_INDEX : SOCIAL_INTERACTIONS_INDEX;
        callback(+row[index - 1], row);
      });
    });
  }

  /**
   * @type {!Object.<string, Object>}
   * @private
   */
  var otherEvents_ = {};

  /**
   * @type {!Object.<string, Object>}
   * @private
   */
  var otherSocial_ = {};

  // Initializing dashboard.
  init_();
})();
