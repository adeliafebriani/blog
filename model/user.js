const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const userSchema = new moongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			trim: true,
			default: '',
		},
		lastName: {
			type: String,
			trim: true,
			default: '',
		},
		password: {
			type: String,
		},
		bio: {
			type: String,
			trim: true,
			default: null,
		},
	},
	{ 
        timestamps: true 
    },
);

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: mongoose.Schema.ObjectId,
            required: true,
            // ref: 'User',
        },
        like: {
            type: Number,
            default: 0,
        },
        comments: {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment',
        },
    },
);

const commentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		article: {
			type: mongoose.Schema.ObjectId,
			ref: 'Article',
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model('User', userSchema);
const Article = mongoose.model('Article', articleSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
	User,
	Article,
	Comment,
};
