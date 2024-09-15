import User from '@/models/User';
import connectMongo from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, senha } = await req.json();
    await connectMongo();

    if (!email || !senha) {
      return new Response(JSON.stringify({ message: 'Todos os campos são necessários.' }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Usuário não encontrado.' }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Senha incorreta.' }), { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return new Response(JSON.stringify({ message: 'Erro ao fazer login.' }), { status: 500 });
  }
}
