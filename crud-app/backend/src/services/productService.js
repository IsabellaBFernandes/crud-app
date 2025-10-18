const supabase = require('../config/supabase');

class ProductService {
  /**
   * Buscar todos os produtos
   */
  async getAllProducts() {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }

    return data;
  }

  /**
   * Buscar produto por ID
   */
  async getProductById(id) {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Erro ao buscar produto: ${error.message}`);
    }

    return data;
  }

  /**
   * Criar novo produto
   */
  async createProduct(productData) {
    const { nome, descricao, preco, estoque } = productData;

    // Validação básica
    if (!nome || preco === undefined || estoque === undefined) {
      throw new Error('Nome, preço e estoque são obrigatórios');
    }

    const { data, error } = await supabase
      .from('produtos')
      .insert([{ nome, descricao, preco, estoque }])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar produto: ${error.message}`);
    }

    return data;
  }

  /**
   * Atualizar produto existente
   */
  async updateProduct(id, productData) {
    const { nome, descricao, preco, estoque } = productData;

    const updateData = {};
    if (nome !== undefined) updateData.nome = nome;
    if (descricao !== undefined) updateData.descricao = descricao;
    if (preco !== undefined) updateData.preco = preco;
    if (estoque !== undefined) updateData.estoque = estoque;

    const { data, error } = await supabase
      .from('produtos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar produto: ${error.message}`);
    }

    return data;
  }

  /**
   * Deletar produto
   */
  async deleteProduct(id) {
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar produto: ${error.message}`);
    }

    return { message: 'Produto deletado com sucesso' };
  }
}

module.exports = new ProductService();
