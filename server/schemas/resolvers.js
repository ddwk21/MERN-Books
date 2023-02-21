const { User } = require('../models')
const {signToken} = require('../utils/auth')
const {AuthenticationError} = require('apollo-server-express')

const resolvers = {

    Query: {
        me: async(parent, args, context) => {
            if(context.user) {
                return(await User.findOne({_id:context.user._id}).populate('savedBooks'))
            }
        }
    },
    Mutation: {
        login: async(parent, {email,password} ,context,info) =>{
            const user = await User.findOne({email})

            if(user == undefined){
                throw new AuthenticationError(`Couldn't find User`)
            }

            const pwYes = await user.isCorrectPassword(password)

            if(!pwYes){
                throw new AuthenticationError(`Bad Password`)
            }

            const token = signToken(user)

            return {user, token}
        },

        addUser: async (parent,args,context,info) => {
            const user = await User.create(args)
            const token = signToken(user)

            return{user, token}
        },

        saveBook: async (parent, {input}, context, info) => {
            if(context.user) {
                const savingUser = await User.findByIdAndUpdate(
                    {id: context.user._id},
                    {$addToSet: {savedBooks:input}},
                    {new:true}
                )
                return savingUser
            }
        },
        removeBook: async(parent,{bookId},context,info) => {
            if(context.user) {
                const removingUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks:bookId}},
                    {new:true} 
                )
                return removingUser
            }
        }
    },
}

module.exports = resolvers