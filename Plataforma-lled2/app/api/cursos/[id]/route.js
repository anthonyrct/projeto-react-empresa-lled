import { CursoController } from '../../../controllers/CursoController';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      // Obtém um curso pelo ID
      return CursoController.obterCurso(req, res, id);
    case 'PUT':
      // Atualiza um curso pelo ID
      return CursoController.atualizarCurso(req, res, id);
    case 'DELETE':
      // Deleta um curso pelo ID
      return CursoController.removerCurso(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} não permitido`);
  }
}
