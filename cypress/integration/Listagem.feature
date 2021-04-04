#language: pt
Funcionalidade: Listagem

    Como usuário,
    Desejo acessar a listagem
    Para visualizar meus dados de cadastro.

    Cenario: Listagem sem registros
        Dado que o site não possui registros
        Quando acessar a listagem
        Entao devo visualizar a listagem vazia

    Cenario: Listagem com apenas um registro
        Dado que o site possui apenas um registro
        Quando acessar a listagem
        Entao devo visualizar apenas um registro