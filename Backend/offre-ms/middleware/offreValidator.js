const { check,validationResult } = require('express-validator');

exports.validateAddOffre = [
    check('titre')
    .notEmpty()
    .withMessage('titre is required'),

    check('description')
    .notEmpty()
    .withMessage('description is required'),

    check('image')
    .isEmail()
    .withMessage('image is required'),

    check('dateDebut')
    .isEmail()
    .withMessage('dateDebut is required'),

    check('dateFin')
    .isEmail()
    .withMessage('dateFin is required'),

    check('category')
    .isEmail()
    .withMessage('category is required'),

    check('postedBy')
    .isEmail()
    .withMessage('postedBy is required'),
    
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}
