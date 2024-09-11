const { createSurvey, getSurveyQuestions, takeSurvey, getSurveyResults } = require('../controllers/survey.controller');
const { isAuthenticatedUser} = require('../middleware/auth')

const express = require('express');
const router =  express.Router();

router.route('/api/createSurvey').post(isAuthenticatedUser,createSurvey);
router.route('/api/getSurveyQuestion/:id').get(isAuthenticatedUser,getSurveyQuestions);
router.route('/api/takeSurvey').post(isAuthenticatedUser,takeSurvey);
router.route('/api/getSurveyResult/:id').get(isAuthenticatedUser,getSurveyResults);

module.exports = router;