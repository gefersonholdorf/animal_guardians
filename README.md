## 🛡️ Guardiões dos Animais

## Descrição do Projeto
O Guardiões dos Animais é um sistema inovador e simples, criado para permitir que qualquer pessoa denuncie maus-tratos a animais. Ele facilitará o envio de denúncias com fotos, garantindo um fluxo de informação seguro e eficiente para ONGs, autoridades e outros usuários interessados na proteção animal.

## Problema
Maus-tratos contra animais são uma realidade comum, mas muitas vezes as denúncias são difíceis de fazer ou não chegam às autoridades competentes. Além disso, a falta de um sistema unificado para coleta e organização dessas denúncias impede uma ação rápida e eficaz.

## Requisitos Funcionais
- RF-01 - Cadastro de Usuários
  
  - [X] - O sistema deve permitir o cadastro de usuários comuns e moderadores
  - [X] - O cadastro deve exigir nome, e-mail, senha e telefone
  - [ ] - O usuário deve receber um e-mail de confirmação após o cadastro
        
- RF-02 - Autenticação e Autorizacão
  - [X] - O sistema deve permitir login via JWT
  - [ ] - Moderadores e ONGs terão permissões diferenciadas

- RF-03 - Cadastro de Denúncias
  - [ ] - Usuários devem poder cadastrar denúncias informando localização e descrição
  - [ ] - Fotos (upload via Multer)
  - [ ] - O status inicial da denúncia deve ser "Pendente"
  - [ ] - A denúncia será revisada por um moderador

- RF-04 - Moderação das Denúncias
  - [ ] - Moderadores podem aprovar ou recusar denúncias
  - [ ] - A decisão será registrada no histórico da denúncia
  - [ ] - Um e-mail automático será enviado ao denunciante informando a decisão

- RF-05 - Dashboard para ONGs e Autoridades
  - [ ] - Organizações terão acesso a um painel para ver denúncias aprovadas
  - [ ] - Poderão filtrar por localização, tipo de animal e gravidade

- RF-06 - Uso de Cache
  - [ ] - Consultas frequentes serão armazenadas no Redis para melhorar a performance
  - [ ] - Denúncias aprovadas terão cache para rápida visualização

## Requisitos Não Funcionais
Desempenho: Respostas rápidas com uso de cache (Redis)
Segurança: Senhas armazenadas com hash seguro
Escalabilidade: Estruturado para suportar alto número de denúncias

## Regras de Negócio
  - [ ] - Somente moderadores podem aprovar ou rejeitar denúncias
  - [ ] - Usuários comuns podem visualizar apenas suas próprias denúncias
  - [ ] - ONGs têm acesso apenas a denúncias aprovadas e filtradas por área de atuação
  - [ ] - Denúncias recusadas não ficam públicas
