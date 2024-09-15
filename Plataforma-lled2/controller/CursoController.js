// Importa o modelo de Curso
const Curso = require('../models/Curso');

// Cria um novo curso
const criarCurso = async (req, res) => {
  try {
    const novoCurso = new Curso(req.body);
    await novoCurso.save();
    return res.status(201).json({ message: 'Curso criado com sucesso!', curso: novoCurso });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar curso.' });
  }
};

// Obtém todos os cursos
const listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar cursos.' });
  }
};

// Obtém um curso por ID
const obterCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    return res.status(200).json(curso);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter curso.' });
  }
};

// Atualiza um curso
const atualizarCurso = async (req, res) => {
  try {
    const cursoAtualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cursoAtualizado) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    return res.status(200).json({ message: 'Curso atualizado com sucesso!', curso: cursoAtualizado });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar curso.' });
  }
};

// Remove um curso
const removerCurso = async (req, res) => {
  try {
    const cursoRemovido = await Curso.findByIdAndRemove(req.params.id);
    if (!cursoRemovido) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    return res.status(200).json({ message: 'Curso removido com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao remover curso.' });
  }
};

module.exports = {
  criarCurso,
  listarCursos,
  obterCurso,
  atualizarCurso,
  removerCurso
};
