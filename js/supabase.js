// Configuração do Supabase
const SUPABASE_URL = 'https://djxlqvakdjsxdkmmbjtc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqeGxxdmFrZGpzeGRrbW1ianRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NzkwNDIsImV4cCI6MjA4MDE1NTA0Mn0.oaSwjrEy7VjMk-a36dYa9vLGW2xhQmCUoMgVu0cPpJ4';

// Inicializar cliente Supabase
// O CDN do Supabase expõe a variável 'supabase' globalmente com o método createClient
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Funções para trabalhar com animais
const animaisDB = {
  // Buscar todos os animais
  async buscarTodos() {
    const { data, error } = await supabaseClient
      .from('animais')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar animais:', error);
      return [];
    }
    return data || [];
  },

  // Buscar animal por ID
  async buscarPorId(id) {
    const { data, error } = await supabaseClient
      .from('animais')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Erro ao buscar animal:', error);
      return null;
    }
    return data;
  },

  // Cadastrar novo animal
  async cadastrar(animal) {
    const { data, error } = await supabaseClient
      .from('animais')
      .insert([animal])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao cadastrar animal:', error);
      throw error;
    }
    return data;
  },

  // Remover animal (quando adotado)
  async remover(id) {
    const { error } = await supabaseClient
      .from('animais')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao remover animal:', error);
      throw error;
    }
  }
};

// Funções para trabalhar com adoções
const adocoesDB = {
  // Cadastrar pedido de adoção
  async cadastrar(adocao) {
    const { data, error } = await supabaseClient
      .from('adocoes')
      .insert([adocao])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao cadastrar adoção:', error);
      throw error;
    }
    return data;
  }
};

