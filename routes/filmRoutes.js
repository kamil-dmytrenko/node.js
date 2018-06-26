const router = require("express").Router();
const controller = require('../controllers/filmsController');

router.route('/')
  .post(controller.createOne)
  .get(controller.getAll);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;