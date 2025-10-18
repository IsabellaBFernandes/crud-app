const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @route   GET /api/products
 * @desc    Listar todos os produtos
 * @access  Public
 */
router.get('/', (req, res) => productController.getAll(req, res));

/**
 * @route   GET /api/products/:id
 * @desc    Buscar produto por ID
 * @access  Public
 */
router.get('/:id', (req, res) => productController.getById(req, res));

/**
 * @route   POST /api/products
 * @desc    Criar novo produto
 * @access  Public
 */
router.post('/', (req, res) => productController.create(req, res));

/**
 * @route   PUT /api/products/:id
 * @desc    Atualizar produto existente
 * @access  Public
 */
router.put('/:id', (req, res) => productController.update(req, res));

/**
 * @route   DELETE /api/products/:id
 * @desc    Deletar produto
 * @access  Public
 */
router.delete('/:id', (req, res) => productController.delete(req, res));

module.exports = router;
