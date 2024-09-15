"use client";

import { useEffect, useState } from 'react';
import Header from '../components/headerLogado';

export default function DashboardPage() {
  const [cursos, setCursos] = useState([]);
  const [title, setTitle] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('/api/cursos');
        const data = await response.json();
        if (response.ok) {
          setCursos(data.cursos);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Erro ao buscar cursos.');
      }
    };

    fetchCursos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, descricao, preco }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Curso criado com sucesso!');
        setCursos([...cursos, data.curso]);
        setTitle('');
        setDescricao('');
        setPreco('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao criar curso.');
    }
  };

  return (
    <div className="container">
      <Header></Header>
      <h1>Cadastro de Curso</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </label>
        <label>
          Preço:
          <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        </label>
        <button type="submit">Criar Curso</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <h2>Lista de Cursos</h2>
      <div className="cards-container">
        {cursos.map(curso => (
          <div key={curso._id} className="card">
            <h3>{curso.title}</h3>
            <p>{curso.descricao}</p>
            <p className="price">Preço: R$ {curso.preco}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
      

        h1 {
          font-size: 2em;
          margin-bottom: 20px;
          color: #333;
          text-align:center;
        }

        .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 0 auto; /* Centraliza o formulário horizontalmente */
    padding: 20px;
    width: 100%;
    max-width: 700px; /* Define uma largura máxima para o formulário */
    
   
  }

        label {
          font-weight: bold;
        }

        input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 50px;
          box-sizing: border-box;
          width: 100%;
          background-color: #B7B2B1;
        }

        button {
          padding: 12px;
          background-color: #D6D2D1;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #B7B2B1;
        }

        .error-message {
          color: #dc3545;
          margin: 10px 0;
          font-size: 14px;
        }

        .success-message {
          color: #28a745;
          margin: 10px 0;
          font-size: 14px;
        }
          
      h2{
        text-align:center}

        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .card {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          width: 300px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card h3 {
          margin-top: 0;
          color: #333;
        }

        .card .price {
          font-weight: bold;
          color: #007bff;
        }

        @media (max-width: 768px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
          }
          
          .card {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
