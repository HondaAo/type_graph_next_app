import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs"
import { redis } from "./redis";
import { sendEmail } from "./utils/sendEmail";
import { v4 } from 'uuid'
import { forgotPasswordPrefix } from "./types";
import { Host } from "./entity/Host";
import { UploadImage } from "./utils/cloudnary";

export const resolvers: IResolvers = {
    Query: {
        me: (_, __, { req }) => {
            if(!req.session.userId){
                return null;
            }
            return User.findOne(req.session.userId);
        },
        listingPost: async(_, { id }) => {
           const host = await Host.findOne(id)
           if(host){
               return host
           }else {
               return null
           }
        },
        searchPost: async(_, { input }) => {
            let hosts: Host[] = []
            try{
            const allSites = await Host.find()
            for( let i=0; i < allSites.length; i++){
                for( let x=0; x < allSites[i].tags.length; x++){
                    if(allSites[i].tags[x] === input ){
                        hosts.push(allSites[i])
                    }
                }
            }
            return hosts
           }catch(err){
               console.log(err)
               return `Error: ${err.message}`
           }
        }
    },
    Mutation: {
        register: async(_, {name, email, password, type}) => {
            const userEXists = await User.findOne({ where: { email } })
            console.log(name)
            if(userEXists){
                return false
            }
            const hashedPassword = await bcrypt.hash(password, 10) 
            User.create({
                name,
                email,
                password: hashedPassword,
                type
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
        },
        createPost: async(_, {input: { images, name, country, city, address, comment, price, beds, postalcode, amenities, reviews, tags}}, { req }) => {
           try {
            const imageUrls = await UploadImage(images)
             const host = await Host.create({
                images: imageUrls ,
                user_id: req.session.userId, 
                name,
                country, 
                city, 
                address, 
                comment, 
                price, 
                beds, 
                postalcode,
                amenities, 
                reviews, 
                tags
             }).save()
            return "Registerd";
           }catch(err){
             console.error(err)
             return `Error: ${err.message}`
           }
           
        },
        deletePost: async(_, { id }) => {
            try{
            const host = await Host.findOne(id)
            host.remove()
            return `Successufly removed from list.`
           } catch(err){
               console.error(err)
               return `Error: ${err.message}`
           }
        }
    }
}