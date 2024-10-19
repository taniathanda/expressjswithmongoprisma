const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);// /categories
router.get('/create', categoryController.getCreateCategory); // /categories/create
router.post('/create', categoryController.postCreateCategory);
router.get('/edit/:id', categoryController.getEditCategory);
router.post('/edit/:id', categoryController.postEditCategory);
router.post('/delete/:id', categoryController.postDeleteCategory);

module.exports = router;