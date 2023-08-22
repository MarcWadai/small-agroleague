import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { postService } from '../services';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { question, categoriesId } = req.body;
  const post = await postService.createPost(question, categoriesId, req.user as User);
  res.status(httpStatus.CREATED).send(post);
});

const queryPosts = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const post = await postService.queryPosts(options);
  res.status(httpStatus.CREATED).send(post);
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.getPostById(Number(req.params.postId));
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(post);
});

const createReco = catchAsync(async (req: Request, res: Response) => {
  const { content } = req.body;
  const post = await postService.createReco(Number(req.params.postId), content, req.user as User);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(post);
});

export default {
  createPost,
  queryPosts,
  getPostById,
  createReco
};
