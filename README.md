# Projeto Módulo 2 - Aprimoramento do Dashboard Bancário

Dashboard bancário criado para o módulo de Angular II, com base na entrega do primeiro módulo.
Para este projeto foram implementados melhorias com a utilização de:
- Rotas
- Signal
- Control flow
- Guards
- Views
- Autenticação jwt 

Foi utilizado o padrão CSR - Client-Side Rendering.

## Funcionalidades do Projeto

#### Layout do projeto
O layout é composto de menu lateral, header e a área de conteúdo. As informações e opções no header dependem de usuário logado e com token ativo.

![alt text](/public/assets/img/image-7.png)

#### Login
Formulário de login com verificação de e-mail e senha e rotas configuradas com uma guard, para que sejam acessadas somente por um usário logado na aplicação.

![alt text](/public/assets/img/image-6.png)

#### Dashboard
É a primeira página renderizada na home. Possui cards com os totais de gastos e despesas por mês, um resumo com as últimas transações do extrato e a possibilidade de carregar os dados de fatura do cartão de crédito. 

Nesta página foram utilizados pipes para formatação dos tipos de valores e o deferrable view para carregar os dados do cartão.

![alt text](/public/assets/img/image-7.png)

O projeto também tem a possibilidade de selecionar entre os idiomas pt-BR e pt-PT.

![alt text](/public/assets/img/image-8.png)

#### Extrato
Na tela de extrato, aparecem todas as transações realizadas e a opção de adicionar uma nova transação. Nesta funcionalidade foram aplicadas as operações de criar, ler, editar e excluir. É possível navegar carregando parâmetros entre as telas e também foi utilizado o recurso de paginação. 

![alt text](/public/assets/img/image-9.png)

Para a ação de exclusão, há uma caixa de diálogo para confirmação da ação e para as ações de criar e editar há uma caixa de diálogo informando o sucesso da transação..
![alt text](/public/assets/img/image-10.png)


#### Transferências

Na tela de transferência aparecem as transferências realizadas e a opção para realizar uma nova transferência. Quando a transferência é confirmada, ela é listada também no extrato da conta, como uma saída.
![alt text](/public/assets/img/image-11.png)


## Como utilizar

Inicie o servidor Json para carregar o mockup do banco de dados

```bash
npm run start-server
```

Inicie a aplicação

```bash
ng serve
```

Abra no navegador o link  `http://localhost:4200/`. 