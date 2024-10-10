# Trabalho T1 - Programação Web

Este projeto foi desenvolvido para a disciplina de Programação Web no semestre de 2024.2 da Universidade Federal de Santa Catarina (UFSC).
O projeto tem o intuito de criar uma interface web para que professores possam liberar salas , que possuem fechaduras eletrônicas, por meio de um app. Nesse projeto pude abranger um pouco de todos os meus conhecimentos web que desenvolvi tanto na disciplina quando por curiosidade e conta própria. Desde a criação da API, integração com o frontend até a utilização do app Insomnia para testar as minhas rotas e do banco de dados MondoDB, que nunca havia trabalhado antes. 

## Descrição

Caso seja do seu interesse ler o descritivo do trabalho. Tudo o que deveria ter sido feito, o que foi feito a mais, os requisitos e o enunciado se encontram no documento: [Disciplinas.pdf](../docs/Disciplinas.pdf).

## Estrutura do Projeto

- `/docs`: Documentação do projeto.
- `/api`: Contém todo o Backend do projeto.
- `/web`: Possui a interface gráfica completa.
- `/simula_fechadura`: Arquivos já disponibilizados pelo professor, para simular fechaduras reais.

## Como Executar

1. Navegue até o diretório `web` e inicie o projeto Vue:
    ```sh
    cd web
    npm install
    npm run serve
    ```
    Isso abrirá o ambiente de desenvolvimento do Vue. 

2. Em outra shell, volte um diretório e acesse `api`:
    ```sh
    cd ../api
    npm install
    cp .env.example .env
    ```
    Substitua as variáveis de ambiente no arquivo `.env` conforme necessário e então execute:
    ```sh
    node server.js
    ```

3. Para finalizar, abra várias shells, acesse o diretório `simula_fechadura` e execute o comando:
    ```sh
    cd ../simula_fechadura
    node fechadura.js <nome_fechadura> <senha_fechadura>
    ```
    Isso adicionará uma fechadura no WebSocket e permitirá que a aplicação seja testada por completo.


## Tecnologias Utilizadas

- HTML
- CSS
- Vue.js
- JavaScript
- Node.js
- MongoDB (banco de dados)

## Autor

Augusto Daleffe
