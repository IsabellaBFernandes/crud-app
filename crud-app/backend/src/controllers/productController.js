const productService = require('../services/productService');

class ProductController {
  /**
   * GET /api/products
   * Listar todos os produtos
   */
  async getAll(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor', 
        message: error.message 
      });
    }
  }

  /**
   * GET /api/products/:id
   * Buscar produto por ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.status(500).json({ 
        error: 'Erro interno do servidor', 
        message: error.message 
      });
    }
  }

  /**
   * POST /api/products
   * Criar novo produto
   */
  async create(req, res) {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      
      if (error.message.includes('obrigatórios')) {
        return res.status(400).json({ 
          error: 'Dados inválidos', 
          message: error.message 
        });
      }

      res.status(500).json({ 
        error: 'Erro interno do servidor', 
        message: error.message 
      });
    }
  }

  /**
   * PUT /api/products/:id
   * Atualizar produto existente
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.status(500).json({ 
        error: 'Erro interno do servidor', 
        message: error.message 
      });
    }
  }

  /**
   * DELETE /api/products/:id
   * Deletar produto
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.status(500).json({ 
        error: 'Erro interno do servidor', 
        message: error.message 
      });
    }
  }
}

module.exports = new ProductController();
