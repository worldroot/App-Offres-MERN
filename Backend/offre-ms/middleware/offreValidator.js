const { check,validationResult } = require('express-validator');

exports.validateAddOffre = [
    check('titre')
    .notEmpty()
    .withMessage('titre is required'),

    check('description')
    .notEmpty()
    .withMessage('description is required'),

    check('image')
    .notEmpty()
    .withMessage('image is required'),

    check('dateDebut')
    .notEmpty()
    .withMessage('dateDebut is required'),

    check('dateFin')
    .notEmpty()
    .withMessage('dateFin is required'),
    
];

exports.validateDemande = [
    check('prix')
    .notEmpty()
    .withMessage('prix is required'),

    check('offre')
    .notEmpty()
    .withMessage('offre is required'),    
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}
