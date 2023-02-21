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
        login: async(parent, {})
    }
}