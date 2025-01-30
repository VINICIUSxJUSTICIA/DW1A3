document.addEventListener('DOMContentLoaded', function () { 
    const buscarBtn = document.getElementById('buscar');
    const cepInput = document.getElementById('cep');
    const dadosPre = document.getElementById('dados');
 
    buscarBtn.addEventListener('click', function () {
        let cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
 
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        dadosPre.textContent = 'CEP não encontrado.';
                    } else {
                        dadosPre.textContent = JSON.stringify(data, null, 2);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados:', error);
                    dadosPre.textContent = 'Erro ao buscar os dados.';
                });
        } else {
            dadosPre.textContent = 'Por favor, digite um CEP válido com 8 números.';
        }
    });
 });
 