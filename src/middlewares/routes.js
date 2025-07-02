import { Database } from './database.js'; // Importa a classe Database para manipulação de dados
import { randomUUID } from 'node:crypto'; // Importa a função randomUUID do módulo crypto para gerar IDs únicos

const database = new Database(); // Instancia o banco de dados

export const routes = [
	{
		method: 'GET',
		path: '/users',
		handler: (request, response) => {
			const users = database.select('users'); // Seleciona os usuários do banco de dados

			return response.end(JSON.stringify(users)); // Retorna a lista de usuários em formato JSON
		}
	},
	{
		method: 'POST',
		path: '/users',
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
	}
]