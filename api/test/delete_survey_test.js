const assert = require('assert');
const Survey = require('../models/survey');

describe('Delete surveys', () => {
  let survetTest;
  beforeEach((done) => {
    newSurvey.survey = JSON.stringify(newSurvey.survey);
    Survey.saveSurvey(newSurvey).then((Response) => {
      assert.notEqual(Response, null);
      survetTest = Response;
      done();
    });
  });

  it('delete a survey', (done) => {
    const queryConfiguration = {
      query: { surveyId: survetTest.nextCount - 1 },
      command: { $set: { delete: true } },
    };
    Survey.deleteSurvey(queryConfiguration).then((response) => {
      assert.equal(response.delete, true);
      assert.equal(typeof response, 'object');
      assert.notEqual(response, false);
      done();
    });
  });
});

const newSurvey = {
  survey: {
    pages: [
      {
        name: 'formulario',
        elements: [
          {
            type: 'radiogroup',
            name: 'question2',
            choices: ['item1', 'item2', 'item3'],
          },
          {
            type: 'checkbox',
            name: 'question3',
            choices: ['item1', 'item2', 'item3'],
          },
          {
            type: 'dropdown',
            name: 'question4',
            choices: ['item1', 'item2', 'item3'],
          },
          {
            type: 'text',
            name: 'question1',
          },
          {
            type: 'text',
            name: 'question5',
          },
          {
            type: 'checkbox',
            name: 'question6',
            choices: ['item1', 'item2', 'item3'],
          },
          {
            type: 'radiogroup',
            name: 'question7',
            choices: ['item1', 'item2', 'item3'],
          },
          {
            type: 'dropdown',
            name: 'question8',
            choices: ['item1', 'item2', 'item3'],
          },
          {
            type: 'comment',
            name: 'question9',
          },
          {
            type: 'rating',
            name: 'question10',
          },
        ],
      },
    ],
  },
  surveyName: 'ventas',
};
