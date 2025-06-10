// A função principal que inicializa um carrossel específico
function initializeCarousel(carouselContainer) {
    // Seleciona os elementos DENTRO do contêiner do carrossel atual
    var carr = carouselContainer.querySelector('.carrousel');
    var next = carouselContainer.querySelector('.next');
    var prev = carouselContainer.querySelector('.prev');
    var circles = carouselContainer.querySelectorAll('.circles .circle');
    var circlesLength = circles.length;
    var currentCircle = circles[0]; // Assume que o primeiro círculo é o ativo inicial
    var counter = 0;
    var items = carouselContainer.querySelectorAll('.carrousel div.slide');
    var itemsLength = items.length;
    var current = items[0]; // Assume que o primeiro slide é o atual inicial
    var myVar; // Variável para o setInterval

    // Verifica se todos os elementos necessários foram encontrados antes de prosseguir
    if (!carr || !next || !prev || items.length === 0) {
        console.warn("Carrossel incompleto ou elementos não encontrados no container:", carouselContainer);
        return; // Sai da função se não houver elementos suficientes
    }

    // Função para avançar/retroceder o slide
    function slide(direction) {
        // Remove classes 'current' e 'active' do slide e círculo anteriores
        if (current) current.classList.remove('current');
        if (currentCircle) currentCircle.classList.remove('active');

        counter = counter + direction;

        // Lógica para loop nos slides
        if (direction === -1 && counter < 0) {
            counter = itemsLength - 1;
        }
        if (direction === 1 && counter >= itemsLength) { // Corrigi para >= itemsLength
            counter = 0;
        }

        // Atualiza os elementos 'current' e 'currentCircle'
        current = items[counter];
        currentCircle = circles[counter];

        // Adiciona classes 'current' e 'active' ao slide e círculo novos
        current.classList.add('current');
        currentCircle.classList.add('active');
        // console.log("Slide Called! Current index:", counter);
    }

    // Event listeners para os botões de navegação
    next.addEventListener('click', function() {
        slide(1);
        clearInterval(myVar); // Limpa o autoplay ao clicar manualmente
        sliding(); // Reinicia o autoplay
    });

    prev.addEventListener('click', function() {
        slide(-1);
        clearInterval(myVar); // Limpa o autoplay ao clicar manualmente
        sliding(); // Reinicia o autoplay
    });

    // Event listeners para os círculos de navegação
    circles.forEach((circle, index) => {
        circle.addEventListener('click', function() {
            if (counter !== index) { // Só muda se não for o slide atual
                clearInterval(myVar); // Limpa o autoplay
                slide(index - counter); // Calcula a direção para ir ao slide clicado
                sliding(); // Reinicia o autoplay
            }
        });
    });


    // Função para iniciar o autoplay
    function sliding() {
        // Limpa qualquer intervalo existente antes de iniciar um novo
        clearInterval(myVar);
        myVar = setInterval(function() {
            slide(1);
        }, 5000); // Muda a cada 5 segundos
    }

    // Event listeners para parar/iniciar autoplay no hover
    carr.addEventListener('mouseover', function() {
        // console.log("Mouseover! Clearing interval.");
        clearInterval(myVar);
    });

    carr.addEventListener('mouseleave', function() {
        // console.log("Mouseleaved! Starting sliding.");
        sliding();
    });

    // Inicialização do carrossel
    showInitialState(); // Garante que o estado inicial esteja correto

    function showInitialState() {
        // Remove 'current' de todos os slides e 'active' de todos os círculos
        items.forEach(item => item.classList.remove('current'));
        circles.forEach(circle => circle.classList.remove('active'));

        // Adiciona 'current' e 'active' ao primeiro slide e círculo
        if (items[0]) items[0].classList.add('current');
        if (circles[0]) circles[0].classList.add('active');
        current = items[0];
        currentCircle = circles[0];
        counter = 0; // Reseta o contador para o início
    }

    // Inicia o autoplay assim que o carrossel é inicializado
    sliding();
}

// Quando o DOM estiver completamente carregado, inicialize todos os carrosséis
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os contêineres de carrossel (o .character-carousel-container do seu HTML)
    const allCarouselContainers = document.querySelectorAll('.character-carousel-container');

    // Itera sobre cada contêiner e inicializa um carrossel para ele
    allCarouselContainers.forEach(container => {
        initializeCarousel(container);
    });
});