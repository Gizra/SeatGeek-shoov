'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://seatgeek.com';

describe('Live testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .webdrivercss(testName, {
        name: 'homepage',
        exclude:
          [
            '.c1 ul a',
            '.c2 a',
            '#nearby-events a',
          ],
        remove:
          [
            '.footer-cell.whats-hot a'
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the mlb tickets page',function(done) {
    client
      .url(baseUrl + '/mlb-tickets')
      .webdrivercss(testName, {
        name: 'mlb-tickets',
        exclude:
          [
            '.team-list .team-list-item',
            '.static-nav-panel-link',
          ],
        remove:
          [
            '.footer-cell.whats-hot a'
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });
});
