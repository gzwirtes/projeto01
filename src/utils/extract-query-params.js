export function extractQWueryParams(url) {
  const queryString = url.split('?')[1]; // Extrai a parte da query string da URL
  if (!queryString) return {}; // Se não houver query string, retorna um objeto vazio

  return Object.fromEntries(
	queryString.split('&').map(param => {
	  const [key, value] = param.split('='); // Divide cada parâmetro em chave e valor
	  return [key, decodeURIComponent(value)]; // Retorna um array com a chave e o valor decodificado
	})
  );
}