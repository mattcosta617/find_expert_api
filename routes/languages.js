const router = require('express').Router();
const ctrl = require('../controllers/languages');
const authRequired = require('../middleware/authRequired');

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.post('/', authRequired, ctrl.create);
router.put('/:id', authRequired, ctrl.update);
router.delete('/:id', authRequired, ctrl.destroy);

module.exports = router;