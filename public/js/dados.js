
const { listarDados } = require('../../database/db.js'); // Substitua pelo caminho correto para arquivo1.js


async function main() {
  const dados = await listarDados();
  console.log(dados)
}

main()
