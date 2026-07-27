async function buscarEndereco() {
    const cep = document.getElementById('cepInput').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    // 1. VALIDAÇÃO PRÉVIA: Checa apenas se tem 8 dígitos
    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
    }

    try {
        // 2. CONSUMO DA API: Busca os dados e converte para JSON
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        // Checa se a API informou que o CEP não existe
        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        // 3. EXIBIÇÃO NO FRONT-END: Preenche a tela
        document.getElementById('rua').textContent = dados.logradouro || "N/A";
        document.getElementById('bairro').textContent = dados.bairro || "N/A";
        document.getElementById('cidade').textContent = `${dados.localidade} - ${dados.uf}`;

        resultadoDiv.classList.remove('hidden');

    } catch (erro) {
        // Captura falha de conexão ou rede caindo
        alert("Erro de conexão. Verifique sua internet ou tente mais tarde.");
    }
}