const router = require("express").Router();
const controller = require('../controllers/commentController');

router.route('/')
  .post(controller.createOne)
  .get(controller.getAll);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;