// ==========================================================
// 1. MOBILE MENU TOGGLE
// ==========================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}


// ==========================================================
// 2. SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
// ==========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fechar o menu mobile após o clique para melhor UX
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});


// ==========================================================
// 3. FADE-IN ANIMATION ON SCROLL (INTERSECTION OBSERVER)
// ==========================================================
const observerOptions = {
    // Começa a animar quando 10% do elemento está visível
    threshold: 0.1, 
    // Garante que o elemento não está coberto pela navbar fixa
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Se quiser que a animação só aconteça uma vez:
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observa todos os elementos com a classe .fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


// =========================================================================
// CÓDIGO DO WHATSAPP - COLE ESTE BLOCO NO FINAL DO SEU ARQUIVO script.js
// =========================================================================

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // 1. Coletar os dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const servicoElement = document.getElementById('servico');
    // Pega o texto da opção selecionada (ex: "Fisioterapia Ortopédica")
    const servico = servicoElement.options[servicoElement.selectedIndex].textContent; 
    const mensagem = document.getElementById('mensagem').value.trim();

    // 2. Montar a mensagem completa
    let textoMensagem = `Olá, gostaria de agendar uma avaliação.`;
    textoMensagem += `\n\n*Dados de Contato:*`;
    textoMensagem += `\nNome: ${nome || 'Não Informado'}`;
    textoMensagem += `\nTelefone: ${telefone || 'Não Informado'}`;
    textoMensagem += `\nE-mail: ${email || 'Não Informado'}`;
    textoMensagem += `\nServiço de Interesse: ${servico.includes('Selecione') ? 'Não Selecionado' : servico}`;
    
    if (mensagem) {
        textoMensagem += `\n\n*Mensagem:* ${mensagem}`;
    }

    // 3. Codificar a mensagem para a URL
    const textoCodificado = encodeURIComponent(textoMensagem);

    // 4. Definir o número de destino e montar a URL final
    const numeroWhatsapp = '5583986574753'; 
    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${textoCodificado}`;

    // 5. Abrir o WhatsApp (em uma nova aba)
    window.open(urlWhatsapp, '_blank');
 
    // Opcional: Mostrar a mensagem de sucesso
    const formSuccess = document.getElementById('form-success');
    formSuccess.classList.remove('hidden');
});

// Adiciona um evento para remover a mensagem de sucesso se o usuário mudar algo no formulário
document.getElementById('contact-form').addEventListener('input', function() {
    document.getElementById('form-success').classList.add('hidden');
});
