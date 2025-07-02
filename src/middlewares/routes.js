import { Database } from './database.js'; // Importa a classe Database para manipulação de dados
import { randomUUID } from 'node:crypto'; // Importa a função randomUUID do módulo crypto para gerar IDs únicos
import { buildRoutePath } from '../utils/build-route-path.js'; // Importa a função para construir rotas com parâmetros dinâmicos

const database = new Database(); // Instancia o banco de dados

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/users'),
		handler: (request, response) => {
			const { search } = request.query; // Extrai o parâmetro de consulta 'search' da URL
			// console.log(request.params); // Exibe os parâmetros da rota na console
			// console.log(request.query); // Exibe os parâmetros de consulta na console

			const users = database.select('users',search ?{
				name: search,
				email: search,
			} : null); // Seleciona os usuários do banco de dados

			return response.end(JSON.stringify(users)); // Retorna a lista de usuários em formato JSON
		}
	},
	{
		method: 'POST',
		path: buildRoutePath('/users'),
		handler: (request, response) => {
			const { name, email } = request.body;

			const user = {
				id: randomUUID(), // Gera um ID único para o usuário
				name,
				email,
			};

			database.insert('users', user); // Insere o usuário no banco de dados

			return response.writeHead(201).end(); // Resposta do servidor

			// users.push({
			// 	id: 1,
			// 	name: 'Diego',
			// 	email: 'diego@gmail.com'
			// }); // Adiciona um usuário ao array
		}
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/users/:id'),
		handler: (request, response) => {
			const { id } = request.params; // Extrai o ID do usuário dos parâmetros da rota

			database.delete('users', id); // Deleta o usuário do banco de dados

			return response.writeHead(204).end(); // Resposta do servidor

			// users.push({
			// 	id: 1,
			// 	name: 'Diego',
			// 	email: 'diego@gmail.com'
			// }); // Adiciona um usuário ao array
		}
	},
	{
		method: 'PUT',
		path: buildRoutePath('/users/:id'),
		handler: (request, response) => {
			const { id } = request.params; // Extrai o ID do usuário dos parâmetros da rota
			const { name, email } = request.body; // Extrai os dados do usuário do corpo da requisição

			database.update('users', id,
				{
					name,
					email,
				}
			); // Deleta o usuário do banco de dados

			return response.writeHead(204).end(); // Resposta do servidor

			// users.push({
			// 	id: 1,
			// 	name: 'Diego',
			// 	email: 'diego@gmail.com'
			// }); // Adiciona um usuário ao array
		}
	}
]