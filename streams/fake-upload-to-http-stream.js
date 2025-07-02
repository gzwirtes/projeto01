import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
	index = 1

	_read() {
		const i = this.index++;

		setTimeout(() => {
			if (i > 5) {
				this.push(null); // Indica que não há mais dados a serem lidos
			} else {
				const buf = Buffer.from(String(i)); // Converte o número para uma string e depois para um buffer
				this.push(buf); // Envia o buffer para o consumidor do stream
			}
		}, 1000);
	}
}

// fetch('http://localhost:3334', {
// 	method: 'POST',
// 	body: new OneToHundredStream(),
// 	duplex: 'half',
// }).then(response => {
// 	response.text().then(data => {
// 		console.log(data)
// 	})
// })

fetch('http://localhost:3334', {
	method: 'POST',
	body: new OneToHundredStream(),
	duplex: 'half',
}).then(response => {
	return response.text()
}).then(data => {
	console.log(data)
})