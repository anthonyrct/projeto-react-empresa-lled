'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="login-content">
        <div className="form-container">
          <Image
            src="/img/logo3.png"
            alt="Logo"
            width={300}
            height={150}
            className="logo"
          />
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="image-side">
          <Image
            src="/img/boa.png" // Substitua pelo caminho da imagem desejada
            alt="Side Image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 70vh;
        }

        .login-content {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          padding: 20px;
          gap: 90px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 500px;
          width: 100%;
        }

        .logo {
          margin-bottom: 20px;
        }

        h1 {
          color: #090908;
          text-align: center;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: bold;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 20px;
          background-color: #ffff;
          
       
        }

        input {
          margin-bottom: 15px;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 50px;
          box-sizing: border-box;
          background-color: #B7B2B1;
        }

        button {
          padding: 12px;
          background-color: #D6D2D1;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 16px;
          border-radius: 50px;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #B7B2B1;
        }

        .error-message {
          color: #d9534f;
          margin: 0 0 15px;
          font-size: 14px;
          text-align: center;
        }

        .image-side {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
