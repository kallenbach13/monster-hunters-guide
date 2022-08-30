const { check, validationResult } = require('express-validator')

const validateSignUp = [
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    check('first_name').not().isEmpty().isLength({max: 100}),
    check('last_name').not().isEmpty().isLength({max: 100}),
    check('address1').not().isEmpty().isLength({max: 100}),
    check('address2').isLength({max: 100}),
    check('postcode').not().isEmpty().isLength({max: 10}),
    check('city').not().isEmpty().isLength({max: 100}),
    check('country').isLength({max: 100})
    , (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
}]

const validateLogin = [
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100})
    , (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
}]

const validateGetMonsters = [
    check('id').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validatePostMonster = [
    check('name').not().isEmpty().isLength({max: 100}),
    check('description').not().isEmpty(),
    check('type').not().isEmpty().isLength({max: 100}),
    check('danger_level').not().isEmpty().isInt(),
    check('powers').not().isEmpty(),
    check('weaknesses').not().isEmpty(),
    check('image_url_one').isLength({max: 100}),
    check('image_url_two').isLength({max: 100})
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validatePutMonster = [
    check('id').not().isEmpty().isInt(),
    check('name').not().isEmpty().isLength({max: 100}),
    check('description').not().isEmpty(),
    check('type').not().isEmpty().isLength({max: 100}),
    check('danger_level').not().isEmpty().isInt(),
    check('powers').not().isEmpty(),
    check('weaknesses').not().isEmpty(),
    check('image_url_one').isLength({max: 100}),
    check('image_url_two').isLength({max: 100})
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validateDeleteMonster = [
    check('id').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

module.exports = {
    validateGetMonsters,
    validatePostMonster,
    validatePutMonster,
    validateDeleteMonster
}
