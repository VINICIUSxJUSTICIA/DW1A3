document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('cadastro-form');
	const result = document.getElementById('result');

	form.addEventListener('submit', function (event) {
    	event.preventDefault();
    	const nome = document.getElementById('nome');
    	const email = document.getElementById('email');
    	const telefone = document.getElementById('telefone');
    	const cpf = document.getElementById('cpf');
    	const senha = document.getElementById('senha');

    	let valid = true;

    	// Validação do CPF
    	if (!validateCPF(cpf.value)) {
        	cpf.classList.add('invalid');
        	valid = false;
    	} else {
        	cpf.classList.remove('invalid');
    	}

    	// Outras validações
    	if (nome.value === '') {
        	nome.classList.add('invalid');
        	valid = false;
    	} else {
        	nome.classList.remove('invalid');
    	}

    	if (telefone.value === '' || !validateTelefone(telefone.value)) {
        	telefone.classList.add('invalid');
        	valid = false;
    	} else {
        	telefone.classList.remove('invalid');
    	}

    	if (email.value === '' || !validateEmail(email.value)) {
        	email.classList.add('invalid');
        	valid = false;
    	} else {
        	email.classList.remove('invalid');
    	}

    	// Validação da senha (por exemplo, deve ter no mínimo 6 caracteres)
    	if (senha.value.length < 6) {
        	senha.classList.add('invalid');
        	valid = false;
    	} else {
        	senha.classList.remove('invalid');
    	}

    	if (valid) {
        	result.textContent = 'Formulário enviado com sucesso!';
    	} else {
        	result.textContent = 'Por favor, corrija os campos inválidos.';
    	}
	});

	function validateCPF(cpf) {
    	cpf = cpf.replace(/[^\d]+/g, '');
    	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    	let soma = 0, resto;
    	for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    	resto = (soma * 10) % 11;
    	if (resto === 10 || resto === 11) resto = 0;
    	if (resto !== parseInt(cpf.substring(9, 10))) return false;
    	soma = 0;
    	for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    	resto = (soma * 10) % 11;
    	if (resto === 10 || resto === 11) resto = 0;
    	if (resto !== parseInt(cpf.substring(10, 11))) return false;
    	return true;
	}

	function validateTelefone(telefone) {
    	const regex = /^\(\d{2}\)\s\d{4}-\d{4}$/;
    	return regex.test(telefone);
	}

	function validateEmail(email) {
    	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    	return regex.test(email);
	}

	// Máscara para o CPF
	document.getElementById('cpf').addEventListener('input', function (event) {
    	let value = event.target.value.replace(/\D/g, '');
    	if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    	if (value.length > 7) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    	if (value.length > 11) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    	event.target.value = value;
	});

	// Máscara para o telefone
	document.getElementById('telefone').addEventListener('input', function (event) {
    	let value = event.target.value.replace(/\D/g, '');
    	if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    	if (value.length > 6) value = value.replace(/^(\(\d{2}\))\s(\d{4})(\d)/, '$1 $2-$3');
    	event.target.value = value;
	});
});
