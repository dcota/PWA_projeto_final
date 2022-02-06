# PWA_projeto_final

Projeto final da UC de Programação Web Avançada

OBJETIVO: Desenvolver um projeto full-stack composto por um front-end em SPA com Vue JS, uma API de back-end em NodeJS e uma base de dados MongoDB Atlas.

TEMA: sistema de inscrições de alunos no clube de programação e robótica de uma escola.

FUNCIONALIDADES: 
FRONT-END
> Sistema de autenticação (login) para alunos e professores (nível admin)
> Formulário de pedido de inscrição no clube
> Página de administração acessível aos professores autenticados com o nível 'admin' para confirmação das incrições ou rejeição das mesmas, bem como visualização dos alunos inscritos, remover alunos, editar ou ver detalhe.
> Sistema de criação de notificações que podem ser enviadas por email, publicadas na página de notícias ou ambas as opções escolhidas pelo professor no momento da criação da notificação.

BACK-END
> Autenticação com JSON web token, com armazenamento de dados de autenticação para os pedidos de admin e proteção de rotas com vuex
> Registo de pedidos de instrição de alunos, edição, remoção e alteração de alunos.
> Registo de notificações
> Sistema de envio de emails com notificações para todos os alunos que as subscreveram.

TRABALHOS FUTUROS:
> Implementação das restantes vistas
> Implementar as funções de edição, detalhes e remover para os administradores
> Implementar vista para os alunos quando autenticados verem os seus detalhes de conta e alterar.

ESTUTURA:
> 1.Prototipagem: contém o protótipo do projeto
> 2.Front-end: contém todos os ficheiros do front-end da aplicação desenvolvida em Vue JS e Vuex
> 3.Back-end: contém todos os ficheiros da API de back-end desenvolvida em Node JS com exceção da pasta node_modules e private, esta contendo as credenciais de autenticação na base de dados MongoDB Atlas

ENDPOINTS:

App disponível em: https://pwa.duartecota.com

API de pack-end disponível em: https://cprob-api.herokuapp.com



Duarte Cota @2022
