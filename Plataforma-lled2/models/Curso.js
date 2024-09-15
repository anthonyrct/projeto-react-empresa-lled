import mongoose from 'mongoose';

const CursoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dado ObjectId para referência
    ref: 'User',
    required: true,
  },
});

const Curso = mongoose.models.Curso || mongoose.model('Curso', CursoSchema);

export default Curso;
