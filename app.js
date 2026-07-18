async function buscarEndereco() {
    const cep = document.getElementById('cepInput').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    
    // Limpa resultados anteriores
    resultadoDiv.classList.add('hidden');

    // 1. Boas Práticas: Validação prévia de dados de entrada
    if (cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // 2. Tratamento de Erros: try...catch para capturar falhas de rede ou servidor
    try {
        const resposta = await fetch(url);
        
        // Verifica se a requisição HTTP foi bem-sucedida (Status 200-299)
        if (!resposta.ok) {
            throw new Error("Erro ao conectar com o serviço de CEP.");
        }

        const dados = await resposta.json();

        // Tratamento de erro específico da API do ViaCEP (retorna erro: true se não achar o CEP)
        if (dados.erro) {
            throw new Error("CEP não encontrado na base de dados.");
        }

        // 3. Integração com o front-end
        document.getElementById('rua').textContent = dados.logradouro || "N/A";
        document.getElementById('bairro').textContent = dados.bairro || "N/A";
        document.getElementById('cidade').textContent = `${dados.localidade} - ${dados.uf}`;
        
        resultadoDiv.classList.remove('hidden');

    } catch (erro) {
        // Exibe o erro de forma amigável para o usuário
        alert(`Ocorreu um erro: ${erro.message}`);
    }
}