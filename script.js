let total = 0;
let itens = [];

function adicionarAoCarrinho(nome, preco) {
    itens.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

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

function finalizarPedido() {
    if (itens.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const endereco = document.getElementById("endereco").value.trim();
    if (!endereco) {
        alert("Por favor, informe o endereço de entrega.");
        return;
    }

    let resumo = "🍗 *Pedido Galeteria do Júnior*\n\n";
    itens.forEach(item => {
        resumo += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });

    resumo += `\n*Total:* R$ ${total.toFixed(2)}\n`;
    resumo += `\n📍 *Endereço:* ${endereco}\n\nObrigado pelo pedido!`;

    const mensagem = encodeURIComponent(resumo);
    const telefone = "5598985343385";

    window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`, "_blank");
}
