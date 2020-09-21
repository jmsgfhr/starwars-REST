# StarWars-REST

StarWars-REST é uma API de registro de planetas da franquia Star Wars desenvolvida em [Node.js](https://nodejs.org/).

## Modo de Instalação

Use [git](https://git-scm.com/) para baixar e o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar

```bash
git clone https://github.com/jmsgfhr/starwars-REST.git
npm install
```

## Modo de Uso

Na pasta raiz do programa use o código abaixo:

```bash
npm start
```

## Rotas

As rotas disponiveis são:

```bash
# GET

localhost:8080/planets
localhost:8080/planets/:name
localhost:8080/planets/:id

# POST

localhost:8080/planet

# PUT

localhost:8080/planet/:id/update

# DELETE

localhost:8080/planet/:id/delete
```