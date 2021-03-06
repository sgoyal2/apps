const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //retain post by handle/avatar in event user deletes their profile
    fullName: {
        type: String
    },
    avatar: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    likes: [
        {user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }}
    ],
    comments: [
        {user: {
            type:Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            required: true
        },
        handle: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Post = mongoose.model('post', PostSchema);