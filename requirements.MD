# História

No My Novel List o usuário pode ver as novels mais populares do momento e criar sua própria lista de novels favoritas.

# Requisitos funcionais

- A aplicação deve ter um sistema de autenticação.
- Qualquer usuário pode ver as novels mais populares do momento e suas respectivas estrelas.
- Qualquer usuário pode ver a biblioteca de novels existentes na aplicação.
- Somente usuários que possuem uma conta podem adicionar novels à sua lista de novels.
- Somente usuários que possuem uma conta podem avaliar as novels com estrelas.

# Regras de negócio

## Autenticação

- Para criar uma conta precisaremos de: "email", "senha" e "nome de usuário".
- Não podemos ter registros com o mesmo email.
- Não podemos ter registros com o mesmo nome de usuário.
- A senha do usuário não pode conter menos de 6 caractéres.

## Novel

- Cada Novel terá as seguintes informações: "Titúlo", "Sinopse", "Capa da novel" e uma "nota em estrelas".
- Cada novel pode receber uma nota individual de 0 à 5 estrelas pelo usuário.
- A nota global de uma Novel será calculada pela média de estrelas dadas pelos usuários.
