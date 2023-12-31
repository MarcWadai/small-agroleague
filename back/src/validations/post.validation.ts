import Joi from 'joi';

const createPost = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    categoriesId: Joi.array().items(Joi.number().integer())
  })
};

const getPosts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.number().integer()
  })
};

const createReco = {
  params: Joi.object().keys({
    postId: Joi.number().integer()
  }),
  body: Joi.object().keys({
    content: Joi.string().required()
  })
};

export default {
  createPost,
  getPosts,
  getPost,
  createReco
};
