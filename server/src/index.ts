import  { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { createConnection } from 'typeorm'
import {resolvers} from './resolvers'
import { typeDefs } from './types'
import * as session from "express-session"
import "dotenv/config"
import { redis } from './redis'
import * as connectRedis from 'connect-redis'
import 'dotenv'

const startServer = async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }: any) => ({ req })
    });

    await createConnection();
      
    const app = express();

    const RedisStore = connectRedis(session);

    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "redis",
            secret: "secret",
            resave: false,
            saveUninitialized: false,
            cookie: {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 1000 * 60 * 60 * 24 * 7 * 365
            }
        })
    )
      
    server.applyMiddleware({ app ,
      cors: {
          credentials: true,
          origin: "http://localhost:3000"
      }
    });
      
      
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

startServer();

