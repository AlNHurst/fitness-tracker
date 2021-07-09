const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./htmlRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;