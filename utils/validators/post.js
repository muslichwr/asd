const { body, check } = require("express-validator");

const validatePost = [
    check('image')
    .custom((value, {req}) => {
        if (req.method === 'POST' & !req.file) {
            throw new Error('Image is Required!');
        }

        return true;
    }),
    body('title').notEmpty().withMessage('Title is Required!'),
    body('content').notEmpty().withMessage('Content is Required!'),
];

module.exports = {validatePost}