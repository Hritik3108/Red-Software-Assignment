const Survey = require('../model/survey.model');

const createSurvey = async (req, res) => {
    const {questions} = req.body;
    // console.log("question", questions)
    const newSurvey = new Survey({
        createdBy: req.user._id,
        questions:[...questions]
    });
    
    // console.log("new survey", newSurvey)
    // console.log("new survey question", newSurvey.questions)
    await newSurvey.save();

    res.status(201).json(newSurvey);
};

const getSurveyQuestions = async (req, res) => {
    console.log('surveyId',req.params.id)
    const survey = await Survey.findById(req.params.id).populate('questions');

    if (!survey) {
        return res.status(404).json({message: 'Survey not found'});
    }

    res.status(200).json(survey);
};

const takeSurvey = async (req, res) => {
    const {surveyId,answers} = req.body;
    const survey = await Survey.findById(surveyId);

    if (!survey){
        return res.status(404).json({message:'Survey not found'});
    }

    survey.responses.push({
        userId:req.user._id,
        answers
    });
    await survey.save();
    res.status(200).json({message:'Survey taken'});
};

const getSurveyResults = async (req, res) => {
    const survey = await Survey.findById(req.params.id).populate('responses.userId', 'username');
    if (!survey) {
        return res.status(404).json({message: 'Survey not found' });
    }
    res.status(200).json(survey);
};

module.exports = {createSurvey,getSurveyQuestions,takeSurvey,getSurveyResults};