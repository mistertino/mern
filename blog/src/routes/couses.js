const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');

router.get('/create', coursesController.create);
router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-action', coursesController.handleFormAction);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/force', coursesController.forceDelete);
router.delete('/:id', coursesController.delete);
router.post('/store', coursesController.store);
router.get('/:slug', coursesController.show);

module.exports = router;
