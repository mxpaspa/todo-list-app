process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let List = require('..models');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

describe('Task Routes ', () => {
  before.each(() => {
    // populate the database with a list
    const testList = new List({});
  });

  describe('GET/tasks', () => {
    before(() => {});
  });
});
