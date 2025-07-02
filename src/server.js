// const http = require('http'); // CommonJS = require -> não se utiliza mais
import http from 'node:http'; // ESModules | import/export atualmente se utiliza | node:http prefixo node: para importar módulos nativos do Node.js
import { json } from './middlewares/json.js'; // Importa o middleware json para processar requisições JSON
import { routes } from './middlewares/routes.js'; // Importa as rotas definidas no middleware routes
import { extractQWueryParams } from './utils/extract-query-params.js';

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

// Query Parameters (Parâmetros de consulta) => Informações adicionais na URL, geralmente após o símbolo de interrogação (?), como ?search=nome
// Route Parameters (Parâmetros de rota) => Identificadores dinâmicos na URL
// Request Body (Corpo da requisição) => Dados enviados na requisição, geralmente em formato JSON, como { "name": "Diego", "email": "diego@email.com.br"}

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
		return route.method === method && route.path.test(url); // Verifica se o método e a URL da requisição correspondem a alguma rota definida
	});

	if (route ) {
		const routeParams = request.url.match(route.path); // Extrai os parâmetros da rota usando a regex definida na rota

		// console.log(extractQWueryParams(routeParams.groups.query)); // Extrai os parâmetros de consulta da URL

		const { query, ...params } = routeParams.groups

		request.params = params
		request.query = query ? extractQWueryParams(query) : {}// Extrai os parâmetros de consulta da URL e os adiciona ao objeto request

		return route.handler(request, response); // Se a rota for encontrada, chama o handler correspondente
	}

	return response.writeHead(404).end(); // Resposta do servidor
})

server.listen(3333)