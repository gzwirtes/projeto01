// const http = require('http'); // CommonJS = require -> não se utiliza mais
import http from 'node:http'; // ESModules | import/export atualmente se utiliza | node:http prefixo node: para importar módulos nativos do Node.js
import { json } from './middlewares/json.js'; // Importa o middleware json para processar requisições JSON
import { routes } from './middlewares/routes.js'; // Importa as rotas definidas no middleware routes

// Rotas para ..
// criar usuários
// listagem de usuários
// edição de usuários
// deleção de usuários

// GET - buscar um recurso do back-end
// POST - criar um recurso no back-end
// PUT - atualizar um recurso no back-end
// PATCH - atualizar parcialmente um recurso no back-end
// DELETE - deletar um recurso do back-end

// Cabeçalhos (headers) (Requisição/resposta) => Metadados - informações adicionais sobre a requisição ou resposta

// HTTP Status Code

// 1. Informational responses (100 – 199)
// 2. Successful responses (200 – 299)
// 3. Redirection messages (300 – 399)
// 4. Client error responses (400 – 499)
// 5. Server error responses (500 – 599)

const users = []; // Array para armazenar usuários

const server = http.createServer(async (request, response) => {
	const { method, url } = request; // Desestruturação do objeto request para obter o método e a URL da requisição

	await json(request, response)

	const route = routes.find(route => {
		return route.method === method && route.path === url; // Verifica se o método e a URL da requisição correspondem a alguma rota definida
	});

	if (route ) {
		return route.handler(request, response); // Se a rota for encontrada, chama o handler correspondente
	}

	return response.writeHead(404).end(); // Resposta do servidor
})

server.listen(3333)