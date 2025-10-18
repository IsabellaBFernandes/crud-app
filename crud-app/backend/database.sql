-- Script SQL para criar a tabela de produtos no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela produtos
CREATE TABLE IF NOT EXISTS produtos (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Criar índice para melhorar performance de buscas por nome
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON produtos(nome);

-- Criar função para atualizar automaticamente o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
CREATE TRIGGER update_produtos_updated_at
  BEFORE UPDATE ON produtos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo (opcional)
INSERT INTO produtos (nome, descricao, preco, estoque) VALUES
  ('Notebook Dell', 'Notebook Dell Inspiron 15, Intel Core i5, 8GB RAM, 256GB SSD', 3499.99, 15),
  ('Mouse Logitech', 'Mouse sem fio Logitech MX Master 3', 399.90, 50),
  ('Teclado Mecânico', 'Teclado Mecânico RGB, Switch Blue', 299.00, 30),
  ('Monitor LG 24"', 'Monitor LG 24" Full HD IPS', 899.00, 20),
  ('Webcam Full HD', 'Webcam Logitech C920 Full HD 1080p', 499.90, 25);

-- Verificar dados inseridos
SELECT * FROM produtos ORDER BY id;
