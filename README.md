# Projeto Módulo 1 - Dashboard Bancário

Dashboard bancário criado para o módulo de Angular I.


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


## Funcionalidades do Projeto

#### Página Inicial
Página inicial com menu lateral, header e um dashboard com o resumo geral da conta. O nome do usuário é renderizado com o dado que vem do Session Storage.

![alt text](image.png)

#### Dashboard
É a primeira página renderizada na home. Possui cards com os totais de gastos e despesas e um resumo com as últimas transações do extrato. Para esta página, foram criadas pipes para sinalizar os valores negativos e mudar a cor, conforme o tipo de transação.

#### Extrato
Na tela de extrato, aparecem todas as transações realizadas e a opção de adicionar uma nova transação. Nesta funcionalidade foram aplicadas as operações de criar, ler, editar e excluir. É possível navegar carregando parâmetros entre as telas.

![alt text](image-1.png)

Para a ação de exclusão, há uma caixa de diálogo para confirmação da ação.
![alt text](image-3.png)

Para as ações de criar e editar há uma caixa de diálogo informando o sucesso da transação.
![alt text](image-2.png)

#### Transferências

Na tela de transferência aparecem as transferências realizadas e a opção para realizar uma nova transferência. Quando a transferência é confirmada, ela é listada também no extrato da conta, como uma saída.
![alt text](image-4.png)

#### Crédito

Na tela de crédito é possível realizar a simulação de empréstimos. Ao digitar os dados no formulário, o sistema retornará todas as informações da simulação.
![alt text](image-5.png)
