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
  var SOCIAL_METRICS = ['sessions', 'socialInteractions', 'uniqueSocialInteractions',
                        'socialInteractionsPerSession'];

  /**
   * List of widgets Ids.
   * @const {!Array.<string>}
   */
  var WIDGETS = ['events-scroll', 'events-outbound', 'events-cta',
                 'events-download', 'events-form', 'events-print',
                 'events-video', 'events-other',
                 'social-pageview', 'social-outbound', 'social-other'];

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
    setWidgetsContent_('Loading...');

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
      error && alert(error['message'] || error);
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
    setWidgetsContent_('');

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
   * Renders Events reports.
   * @param {!Object} report The report object.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#Report
   * @private
   */
  function renderEventsReports_(report) {
    var tables = {};
    var rows = report['data']['rows'];
    var other = '';

    rows && rows.forEach(function(row) {
      var category = row['dimensions'][EVENTS_CATEGORY_INDEX].split(':')[0];
      tables[category] = tables[category] || [];
      tables[category].push([].concat(row['dimensions'], row['metrics'][0]['values']));
    });

    Object.keys(tables).forEach(function(category) {
      if ('scroll' === category) renderScrollEventsWidget_(tables[category]);
      else if ('outbound' === category) renderOutboundEventsWidget_(tables[category]);
      else if ('cta' === category) renderCtaEventsWidget_(tables[category]);
      else if ('download' === category) renderDownloadEventsWidget_(tables[category]);
      else if ('form' === category) renderFormEventsWidget_(tables[category]);
      else if ('print' === category) renderPrintEventsWidget_(tables[category]);
      else if ('video' === category) renderVideoEventsWidget_(tables[category]);
      else {
        other += getEventsGrid_(tables[category]);
        console.log('[WARN] UNKNOWN EVENT CATEGORY:', category);
      }
    });

    setWidgetContent_('events-other', other);
    console.log('renderEventsReports_', tables);
  }

  /**
   * Renders Social reports.
   * @param {!Object} report The report object.
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#Report
   * @private
   */
  function renderSocialReports_(report) {
    var tables = {};
    var rows = report['data']['rows'];
    var other = '';

    rows && rows.forEach(function(row) {
      var action = row['dimensions'][1].split(':')[0];
      tables[action] = tables[action] || [];
      tables[action].push([].concat(row['dimensions'], row['metrics'][0]['values']));
    });

    Object.keys(tables).forEach(function(action) {
      if ('pageview' === action) renderSocialPageviewsWidget_(tables[action]);
      else if ('outbound' === action) renderSocialOutboundWidget_(tables[action]);
      else {
        other += getEventsGrid_(tables[action]);
        console.log('[WARN] UNKNOWN SOCIAL ACTION:', action);
      }
    });

    setWidgetContent_('social-other', other);
    console.log('renderSocialReports_', tables);
  }

  /**
   * Gets HTML table markup.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @param {!Array.<string>} dimensions List of dimensions.
   * @param {!Array.<string>} metrics List of metrics.
   * @return {string} Returns HTML table markup.
   * @private
   */
  function getSimpleGrid_(data, dimensions, metrics) {
    return '<table border=1><thead><tr>' +
           '<th>' + dimensions.map(toLabel_).join('</th><th>') + '</th>' +
           '<th>' + metrics.map(toLabel_).join('</th><th>') + '</th>' +
           '</tr></thead><tbody><tr>' + data.map(function(row) {
             return '<td>' + row.join('</td><td>') + '</td>';
           }).join('</tr><tr>') + '</tr></tbody></table>';
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
    return first + text.replace(/([A-Z])/g, ' $1').slice(1);
  }

  /**
   * Gets HTML table markup for Events data grid.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @param {!Array.<string>=} opt_dimensions Optional list of dimensions.
   * @param {!Array.<string>=} opt_metrics Optional list of metrics.
   * @return {string} Returns HTML table markup.
   * @private
   */
  function getEventsGrid_(data, opt_dimensions, opt_metrics) {
    return getSimpleGrid_(
      data, opt_dimensions || EVENTS_DIMENSIONS, opt_metrics || EVENTS_METRICS);
  }

  /**
   * Gets HTML table markup for Social data grid.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @return {string} Returns HTML table markup.
   * @private
   */
  function getSocialGrid_(data) {
    return getSimpleGrid_(data, SOCIAL_DIMENSIONS, SOCIAL_METRICS);
  }

  /**
   * Renders scroll events widget.
   * @param {!Array.<Array.<string>} data List of data rows.
   * @private
   */
  function renderScrollEventsWidget_(data) {
    /** @type {!Array.<Array>} */ var filtered = [];
    /** @type {!Array.<string>} */ var dimensions = ['Depth'];

    data.forEach(function(row) {
      /** @type {number} */ var value = parseInt(row[EVENTS_LABEL_INDEX], 10);

      (value >= 25 && value <= 100) && filtered.push([
        row[EVENTS_LABEL_INDEX],
        row[EVENTS_TOTAL_INDEX],
        row[EVENTS_UNIQUE_INDEX],
        row[EVENTS_SESSIONS_INDEX],
        (+row[EVENTS_PER_SESSIONS_INDEX]).toFixed(2)
      ]);
    });

    filtered.sort(function(a, b) {
      return parseInt(a[0], 10) > parseInt(b[0], 10);
    });

    // setWidgetContent_(
    //     'events-scroll', getEventsGrid_(filtered, dimensions));

    var table = new charts.DataTable('report-events-scroll-table-container');
    table.draw([
      ['Depth'].concat(EVENTS_METRICS.map(function(name) {
        return {'label': toLabel_(name), 'type': 'number', 'name': name}
      }))
    ].concat(filtered), {'footer': false});

    data = [[], []];
    filtered.forEach(function(row) {
      data[0].push(row[0]);
      data[1].push(+row[1]);
    });
    (new charts.DonutChart('report-events-scroll-chart-container')).draw(data);
  }

  function renderOutboundEventsWidget_(table) {
    setWidgetContent_('events-outbound', getEventsGrid_(table));
  }

  function renderCtaEventsWidget_(table) {
    setWidgetContent_('events-cta', getEventsGrid_(table));
  }

  function renderDownloadEventsWidget_(table) {
    setWidgetContent_('events-download', getEventsGrid_(table));
  }

  function renderFormEventsWidget_(table) {
    setWidgetContent_('events-form', getEventsGrid_(table));
  }

  function renderPrintEventsWidget_(table) {
    setWidgetContent_('events-print', getEventsGrid_(table));
  }

  function renderVideoEventsWidget_(table) {
    setWidgetContent_('events-video', getEventsGrid_(table));
  }

  function renderSocialPageviewsWidget_(table) {
    setWidgetContent_('social-pageview', getSocialGrid_(table));
  }

  function renderSocialOutboundWidget_(table) {
    setWidgetContent_('social-outbound', getSocialGrid_(table));
  }

  // Initializing dashboard.
  init_();
})();
