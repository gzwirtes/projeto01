import { Readable, Transform, Writable, Duplex } from 'node:stream';

class OneToHundredStream extends Readable {
	index = 1

	_read() {
		const i = this.index++;

		setTimeout(() => {
			if (i > 100) {
				this.push(null); // Indica que não há mais dados a serem lidos
			} else {
				const buf = Buffer.from(String(i)); // Converte o número para uma string e depois para um buffer
				this.push(buf); // Envia o buffer para o consumidor do stream
			}
		}, 1000);
	}
}

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const transformedChunk = Number(chunk.toString()) * -1; // Transforma o número recebido em seu inverso
		callback(null, Buffer.from(String(transformedChunk)));
	}
}

class MultiplyByTenStream extends Writable
{
	_write(chunk, enconcoding, callback) {
		console.log(chunk.toString() * 10); // Multiplica o número recebido por 10 e exibe no console
		callback(); // Chama o callback para indicar que a escrita foi concluída
	}
}


new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream()); // Cria uma instância do stream de leitura e o conecta