"use client"; // Indica que este é um Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Adiciona o useRouter
import Image from 'next/image'; // Adicione esta linha no início do arquivo
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Cria uma instância do router

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registro bem-sucedido!');
        setError('');
        // Redireciona para a página de login
        router.push('/login');
      } else {
        setError(data.message || 'Erro ao registrar.');
        setMessage('');
      }
    } catch (err) {
      setError('Erro ao registrar.');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="register-content">
        <div className="form-container">
          <Image
            src="/img/logo3.png" // Substitua pelo caminho da logo
            alt="Logo"
            width={300}
            height={150}
            className="logo"
          />
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Senha:
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </label>
            <button type="submit">Registrar</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </div>
        <div className="image-side">
          <Image
            src="/img/boa2.jpg" // Substitua pelo caminho da imagem ao lado
            alt="Side Image"
            width={600}
            height={600}
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

        .register-content {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          padding: 20px;
          gap: 20px;
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
          border-radius: 8px;
        }

        label {
          margin-bottom: 15px;
          width: 100%;
        }

        input {
          margin-top: 5px;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 50px;
          box-sizing: border-box;
          background-color: #B7B2B1;
          width: 100%;
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
          margin-top: 10px;
        }

        button:hover {
          background-color: #B7B2B1;
        }

        .error-message {
          color: #d9534f;
          margin: 10px 0;
          font-size: 14px;
          text-align: center;
        }

        .success-message {
          color: #28a745;
          margin: 10px 0;
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
