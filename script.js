let total = 0;
let itens = [];

// === Adiciona itens ao carrinho ===
function adicionarAoCarrinho(nome, preco) {
    itens.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

// === Atualiza o carrinho visualmente ===
function atualizarCarrinho() {
    const lista = document.getElementById("lista-itens");
    const totalElem = document.getElementById("total");

    lista.innerHTML = "";

    itens.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
    });

    totalElem.textContent = total.toFixed(2);
}

// === Máscara automática de telefone ===
function mascararTelefone(input) {
    let valor = input.value.replace(/\D/g, "");
    if (valor.length > 10) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (valor.length > 5) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
        valor = valor.replace(/^(\d*)/, "($1");
    }
    input.value = valor;
}

// === Finaliza pedido ===
function finalizarPedido() {
    if (itens.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    if (!nome) return alert("Por favor, informe o seu nome completo.");
    if (!telefone) return alert("Por favor, informe o telefone para contato.");
    if (!endereco) return alert("Por favor, informe o endereço de entrega.");

    // === Monta mensagem do pedido ===
    let resumo = "🍗 *Pedido - Galeteria do Júnior*\n\n";
    resumo += `👤 *Cliente:* ${nome}\n`;
    resumo += `📱 *Telefone:* ${telefone}\n`;
    resumo += `📍 *Endereço:* ${endereco}\n\n`;
    resumo += "🧾 *Itens do Pedido:*\n";

    itens.forEach(item => {
        resumo += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });

    resumo += `\n💰 *Total:* R$ ${total.toFixed(2)}\n`;
    if (observacoes) resumo += `\n📝 *Observações:* ${observacoes}\n`;
    resumo += "\nObrigado pelo pedido! 😋";

    // === Salva os dados no navegador ===
    localStorage.setItem("nomeCliente", nome);
    localStorage.setItem("telefoneCliente", telefone);
    localStorage.setItem("enderecoCliente", endereco);

    const mensagem = encodeURIComponent(resumo);
    const telefoneLoja = "5598985343385";

    window.open(`https://api.whatsapp.com/send?phone=${telefoneLoja}&text=${mensagem}`, "_blank");
}

// === Restaura dados salvos (nome, telefone, endereço) ===
window.addEventListener("DOMContentLoaded", () => {
    const nome = localStorage.getItem("nomeCliente");
    const telefone = localStorage.getItem("telefoneCliente");
    const endereco = localStorage.getItem("enderecoCliente");

    if (nome) document.getElementById("nome").value = nome;
    if (telefone) document.getElementById("telefone").value = telefone;
    if (endereco) document.getElementById("endereco").value = endereco;
});
