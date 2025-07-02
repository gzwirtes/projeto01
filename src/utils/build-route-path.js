export function buildRoutePath(path) {
	const routeParametersRegex = /:([a-zA-Z]+)/g; // Regex para capturar parâmetros de rota (ex: :id)
	const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-]+)'); // Substitui os parâmetros de rota por regex
	const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`); // Cria uma regex para a rota completa, incluindo query parameters

	return pathRegex; // Retorna a regex da rota
}