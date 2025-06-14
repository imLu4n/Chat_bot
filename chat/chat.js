const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const btn = document.getElementById("send-btn");
let primeiraMensagemEnviada = false;

function adicionarMensagemAoChat(remetente, mensagem, tipo) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", tipo);
    
    const textElement = document.createElement("p");
    textElement.innerHTML = mensagem;

    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function enviarMensagem() {
    const mensagemDoUsuario = input.value.trim();
    if (!mensagemDoUsuario) return;

    if (!primeiraMensagemEnviada) {
        const bemVindoElemento = document.querySelector(".bem-vindo");
        if (bemVindoElemento) bemVindoElemento.remove();
        primeiraMensagemEnviada = true;
    }

    adicionarMensagemAoChat("Você", mensagemDoUsuario, "user");
    input.value = "";

    const loaderId = addChaoticOrbitLoader();

    const requestBody = {
        prompt: mensagemDoUsuario,
        service: "merlin-v1",
        clientid: "NBbE5kHDmT",
        projectid: "6pz1qm2kzfes4vcrnv8xos",
        tracking: "Teste da API de 3 de Janeiro",
        websearch: false
    };

    try {
        const response = await fetch('https://stec.cx/saturn/single.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer uBeEOmoGh6'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
        }

        const dados = await response.json();
        if (dados.error) {
            throw new Error(`Erro da API: ${dados.error}`);
        }

        removeChaoticOrbitLoader(loaderId);
        
        // Extração correta do conteúdo sem "response":
        let respostaLimpa = dados.response ? dados.response.replace(/^\{"response":"|"\}$/g, "").replace(/\n/g, "<br>").replace(/\*\*/g, "").replace(/\\/g, "") : "Sem resposta da API";
        
        adicionarMensagemAoChat("Assistente", respostaLimpa, "bot");
    } catch (erro) {
        console.error("❌ Erro:", erro);
        removeChaoticOrbitLoader(loaderId);
        adicionarMensagemAoChat("Assistente", "Ocorreu um erro ao enviar a mensagem. Tente novamente.", "bot");
    }
}

btn.addEventListener("click", enviarMensagem);
input.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        enviarMensagem();
    }
});

function addChaoticOrbitLoader() {
    const loaderId = `loader-${Date.now()}`;
    const loaderDiv = document.createElement("div");
    loaderDiv.classList.add("message", "bot");
    loaderDiv.id = loaderId;
    loaderDiv.innerHTML = `<p>⏳ Carregando...</p>`;
    chatBox.appendChild(loaderDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return loaderId;
}

function removeChaoticOrbitLoader(loaderId) {
    const loaderDiv = document.getElementById(loaderId);
    if (loaderDiv) loaderDiv.remove();
}

const bemVindoElemento = document.querySelector(".bem-vindo");
const mensagemBoasVindas = 
    "👋 Bem-vindo ao LexBot!<br>" +
    "📜 Sou um assistente jurídico pronto para esclarecer suas dúvidas sobre leis, direitos e regulamentos.<br>" +
    "✍️ Digite sua pergunta no chat e eu responderei da melhor forma possível.";

bemVindoElemento.innerHTML = "";
digitarTextoHTML(bemVindoElemento, mensagemBoasVindas, 10);

function digitarTextoHTML(elemento, texto, velocidade) {
    let index = 0;
    function digitar() {
        if (index < texto.length) {
            elemento.innerHTML = texto.slice(0, index + 1);
            index++;
            setTimeout(digitar, velocidade);
        } else {
            elemento.style.borderRight = "none"; 
        }
    }
    digitar();
}

const profilePicInput = document.getElementById('profile-pic-input');
const profilePic = document.getElementById('profile-pic');

const imagemSalva = localStorage.getItem("imagemPerfil");
if (imagemSalva) {
  profilePic.src = imagemSalva;
}

profilePicInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      profilePic.src = base64;
      localStorage.setItem("imagemPerfil", base64); 
    };
    reader.readAsDataURL(file);
  }
});
