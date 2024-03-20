import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        review(_, args) {
            return db.reviews.find( (review) => review.id === args.id)
        },
        game(_, args) {
            return db.games.find( (game) => game.id === args.id)
        },
        author(_, args) {
            return db.authors.find( (author) => author.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games =  db.games.filter((g) => g.id !== args.id)
            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 1000).toString()
            }
            db.games.push(game)
            return game
        }
    }
}

//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers

})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("server ready", 4000)