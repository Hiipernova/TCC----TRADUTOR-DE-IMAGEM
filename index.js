// Função para criar a camada de película
function createOverlay() {
    // Criar um elemento <div> para a película
    var overlay = document.createElement('div');
    
    // Estilizar a película
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.5)'; // Cor preta com 50% de opacidade
    overlay.style.zIndex = '9999'; // Garante que a película esteja no topo de tudo
    
    // Adicionar a película ao corpo da página
    document.body.appendChild(overlay);

    // Traduzir um texto de exemplo quando a camada de película é criada
    translateText('Hello', 'en', 'pt', function(translatedText) {
        // Exibir o texto traduzido na camada de película
        var textNode = document.createTextNode(translatedText);
        overlay.appendChild(textNode);
    });
}

// Função para traduzir o texto usando a API do Google Translate
function translateText(text, sourceLang, targetLang, callback) {
    // Substitua 'YOUR_API_KEY' pelo seu próprio chave de API do Google Translate
    var apiKey = 'YOUR_API_KEY';
    var url = 'https://translate.googleapis.com/$discovery/rest?version=v3' + apiKey;
    url += '&q=' + encodeURI(text);
    url += '&source=' + sourceLang;
    url += '&target=' + targetLang;

    // Realizar uma solicitação GET para a API do Google Translate
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var translatedText = response.data.translations[0].translatedText;
            callback(translatedText);
        }
    };
    xhr.send();
}

// Chamar a função para criar a película quando a página estiver completamente carregada
window.onload = function() {
    createOverlay();
};
