'use strict';

let nock   = require('nock');
let cmd    = require('../../../commands/config/get');
let expect = require('chai').expect;

describe('config:get', function() {
  beforeEach(() => cli.mockConsole());

  it('gets a config var', function() {
    let api = nock('https://api.heroku.com:443')
      .get('/apps/myapp/config-vars')
      .reply(200, {'LANG': 'en_US.UTF-8', 'RACK_ENV': 'production'});
    return cmd.run({app: 'myapp', args: {key: 'RACK_ENV'}, flags: {}})
    .then(() => expect(cli.stdout).to.equal('production\n'))
    .then(() => api.done());
  });
});
