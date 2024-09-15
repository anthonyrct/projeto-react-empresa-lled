// Importa o modelo de Usuário
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registra um novo usuário
const registrarUsuario = async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);
    
    const novoUsuario = new User({ ...req.body, senha: senhaCriptografada });
    await novoUsuario.save();
    
    return res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

// Login de usuário
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }
    
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

// Atualizar dados do usuário
const atualizarUsuario = async (req, res) => {
  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioAtualizado) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.status(200).json({ message: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

// Deletar usuário
const deletarUsuario = async (req, res) => {
  try {
    const usuarioRemovido = await User.findByIdAndRemove(req.params.id);
    if (!usuarioRemovido) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao remover usuário.' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  atualizarUsuario,
  deletarUsuario
};
