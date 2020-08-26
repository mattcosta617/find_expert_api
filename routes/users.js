const router = require('express').Router();
const ctrl = require('../controllers/user')

router.get('/', ctrl.index); // <----- Not supposed to use this route
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/verify', ctrl.verify);

module.exports = router;
