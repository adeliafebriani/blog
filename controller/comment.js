const { Comment } = require('../model/user');
const Joi = require('joi');

const createCommentValidationSchema = Joi.object({
	articleId: Joi.string().required('articleId is required'),
	content: Joi.string().required('comment is required'),
});

const createComment = async (req, res) => {
	try {
		const { articleId, content } = req.body;
		const userId = req.id;
		const { error } = await createCommentValidationSchema.validateAsync({ articleId, content });

		if (error) {
			const message = error.details[0].message;
			const err = new Error(message);
			err.statusCode = 400;
			throw err;
		}

		const comment = await Comment.create({ content, user: userId, article: articleId });

		res.json({
			message: 'comment created successfully',
			succeeded: true,
			data: comment,
		});
	} catch (error) {
		const message = error?.message;
		const statusCode = error?.statusCode;
		res.status(statusCode ?? 400).json({
			message,
			succeeded: false,
			data: null,
		});
	}
};

const getComment = async (req, res) => {
	const { pageNumber, pageSize } = req.query;

	const page = pageNumber || 1;
	const size = pageSize || 10;
	const limit = size;
	const skip = (page - 1) * limit;

	try {
		const comments = await Comment.find({})
			.sort({ updatedAt: -1 })
			.populate({
				path: 'user',
				select: ['_id', 'email', 'firstName', 'lastName'],
			})
			.populate({
				path: 'article',
				select: '_id title author',
				populate: {
					path: 'author',
					select: '_id email firstName lastName',
				},
			})
			.skip(skip)
			.limit(limit)
			.exec();

		const totalCount = await Comment.countDocuments().exec();

		res.status(200).json({
			message: 'article  successfully retrieved',
			succeeded: true,
			data: comments,
			totalCount,
			pageSize: size,
			pageNumber: page,
		});
	} catch (error) {
		const message = error?.message;
		const statusCode = error?.statusCode;
		res.status(statusCode ?? 400).json({
			message,
			succeeded: false,
			data: null,
		});
	}
};

module.exports = { createComment, getComment };