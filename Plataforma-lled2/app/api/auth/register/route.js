import User from '@/models/User';
import connectMongo from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { nome, email, senha } = await req.json();
    await connectMongo();

    if (!nome || !email || !senha) {
      return new Response(JSON.stringify({ message: 'Todos os campos são necessários.' }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Usuário já existe.' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(senha, 12);
    const newUser = new User({ nome, email, senha: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ success: true, token }), { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return new Response(JSON.stringify({ message: 'Erro ao registrar usuário.' }), { status: 500 });
  }
}
