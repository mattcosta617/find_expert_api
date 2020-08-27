const router = require('express').Router();
const ctrl = require('../controllers/expert');
const authRequired = require('../middleware/authRequired');

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;