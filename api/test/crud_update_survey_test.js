const assert = require('assert');
const rp = require('request-promise');
const { Client } = require('node-rest-client');
const { hasOwnProperty } = require('../services/repository');

const {
  newSurvey, SurveyNoSurveyName, example, SurveyWithName,
} = require('./payload_mock');

const client = new Client();

const options = {
  method: 'POST',
  uri: 'http://localhost:3000/',

  json: true, // Automatically stringifies the body to JSON
};

const args = {
  headers: { 'Content-Type': 'application/json' },
};

// eslint-disable-next-line no-undef
describe('CRUD Update Surveys', () => {
  // insert a survey for test
  let survey;
  // eslint-disable-next-line no-undef
  beforeEach((done) => {
    options.body = example;
    rp(options).then((res) => {
      survey = res;
      done();
    });
  });

  it('update a survey', (done) => {
    const { surveyId } = survey.response;
    args.data = SurveyWithName;
    client.put(`http://localhost:3000/${surveyId}`, args, (data, res) => {
      const { response } = data;
      const {
        survey, surveyName, createdAt, updatedAt, surveyId,
      } = response;
      assert.equal(response.hasOwnProperty('survey'), true);
      assert.equal(response.hasOwnProperty('surveyName'), true);
      assert.equal(response.hasOwnProperty('createdAt'), true);
      assert.equal(response.hasOwnProperty('updatedAt'), true);
      assert.equal(response.hasOwnProperty('surveyId'), true);

      assert.equal(typeof survey, 'string');
      assert.equal(typeof surveyName, 'string');
      assert.equal(typeof createdAt, 'string');
      assert.equal(typeof updatedAt, 'string');
      assert.equal(typeof surveyId, 'number');
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('Fail to update a survey', (done) => {
    options.body = SurveyNoSurveyName;
    rp(options)
      .then(() => {})
      .catch((error) => {
        const [errorSurveyName] = error.error.errors;
        assert.equal(hasOwnProperty(error, 'error'), true);
        assert.equal(error.error.hasOwnProperty('errors'), true);
        assert.equal(error.statusCode, 422);
        assert.equal(errorSurveyName.param, 'surveyName');
        assert.equal(errorSurveyName.location, 'body');
        assert.equal(errorSurveyName.msg, 'Invalid value');
        done();
      });
  });

  // TODO: failure to update a survey, no surveys were found
});
