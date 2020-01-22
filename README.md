# DigitalLab - Francisco Borges
Um pequeno projeto para testar minhashabilidades como programador.

## Instruções Gerais - Endpoints

1. PUT (Params: url, alias): http://cliente-api-shortner.surge.sh/#/api-shortner
2. PUT (Params: alias): http://cliente-api-shortner.surge.sh/#/api/shortner/:alias
3. GET: http://cliente-api-shortner.surge.sh/#/ver/top10

## Cliente

http://cliente-api-shortner.surge.sh/#/

## Diagramas de Sequência

### 1 - Diagrama de Sequência de uma requisição PUT sem CUSTOM ALIAS
![Short URL](https://i.imgur.com/hkiZ1XT.png)

1. O Usuario chama a API passando a URL que deseja encurtar e um parametro opcional **CUSTOM_ALIAS**
    1. Caso o **CUSTOM_ALIAS** já exista, um erro especifico ```{ERR_CODE: 001, Description:CUSTOM ALIAS ALREADY EXISTS}``` deve ser retornado.
    2. Toda URL criada sem um **CUSTOM_ALIAS** deve ser reduzida a um novo alias, **você deve sugerir um algoritmo para isto e o porquê.**
    
2. O Registro é colocado em um repositório (*Data Store*)
3. É retornado para o cliente um resultado que contenha a URL encurtada e outros detalhes como
    1. Quanto tempo a operação levou
    2. URL Original

### 2 - Diagrama de Sequência de uma requisição PUT Com CUSTOM ALIAS
![Short URL](https://i.imgur.com/hkiZ1XT.png)

### 3 - Retrieve URL
![Retrieve URL](https://i.imgur.com/7qiySca.png)

1. Usuario chama a API passando a URL que deseja acessar
    1. Caso a **URL** não exista, um erro especifico ```{ERR_CODE: 002, Description:SHORTENED URL NOT FOUND}``` deve ser retornado.
2. O Registro é lido de um repositório (*Data Store*)
3. Esta tupla ou registro é mapeado para uma entidade de seu projeto
3. É retornado para o cliente um resultado que contenha a URL final, a qual ele deve ser redirecionado automaticamente

## Escolha do Algoritmo
O algoritmo sugerido para reduzir a URL a um novo ALIAS é o Lempel–Ziv–Welch(LZW)
Motivos pela escolha deste algoritmo:
	1. Ser "lossless", ou seja, não há perda de dados durante a compressão;
	2. Algoritmo Universal, já reconhecido;
	3. Fácil implementação;
	4. Eficiente em casos onde há muita repetição;

## Stack Tecnológico

Backend: Node + Express
Frontend: Vue + Quasar
Banco de dados: Firebase RealTime Database

## Bonus Points

1. Crie um *endpoint* que mostre as dez *URL's* mais acessadas 
2. Crie um *client* para chamar sua API
3. Faça um diagrama de sequencia da implementação feita nos casos de uso (Dica, use o https://www.websequencediagrams.com/)
4. Crie sua infra de forma automatica (https://www.chef.io/ , https://www.ansible.com/ https://www.terraform.io/)
