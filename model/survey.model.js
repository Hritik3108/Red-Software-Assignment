const mongoose=require('mongoose');

const surveySchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'redUser' },
    questions: [
        {
            questionText: { type: String, required: true },
            options: { type: [Boolean], default: [true, false] }
        }
    ],
    responses: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'redUser' },
            answers: { type: [Boolean], required: true }
        }
    ]
});

const surveyModel = mongoose.model('Survey', surveySchema); 
module.exports = surveyModel;