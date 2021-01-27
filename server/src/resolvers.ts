import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs"
import { redis } from "./redis";
import { sendEmail } from "./utils/sendEmail";
import { v4 } from 'uuid'
import { forgotPasswordPrefix } from "./types";
export const resolvers: IResolvers = {
    Query: {
        me: (_, __, { req }) => {
            if(!req.session.userId){
                return null;
            }
            return User.findOne(req.session.userId);
        }
    },
    Mutation: {
        register: async(_, {name, email, password}) => {
            const userEXists = await User.findOne({ where: { email } })
            if(userEXists){
                return false
            }
            const hashedPassword = await bcrypt.hash(password, 10) 
            User.create({
                name,
                email,
                password: hashedPassword
            }).save()

            return true
        },
        login: async(_, {email, password}, { req }) => {
            const user = await User.findOne({ where: { email }})
            if(!user){
                return null
            }

            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                return null
            }

            req.session.userId = user.id;

            return user
        },
        forgotPassword: async(_, {email}) => {
            const user = await User.findOne({ where: { email }})
            if(!user){
                return false
            }
            const token = v4();
            redis.set( forgotPasswordPrefix + token, user.id, "ex", 60*60*24);
            await sendEmail(email, `http://localhost:3000/confirm/${token}`)
            return true 
        },
        changePassword: async(_, { token, password }, { req }) => {
            const userId = await redis.get(forgotPasswordPrefix + token)
            if(!userId){
                return null
            }

            const user = await User.findOne(userId)

            if(!user){
                return null
            }

            await redis.del(forgotPasswordPrefix + token )

            user.password = await bcrypt.hash(password, 10)

            await user.save();

            req.session.userId = user.id;
 
            return true;
        }
    }
}