import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
