import { Post, PostStatus, User } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a Post
 * @param {Object} PostBody
 * @returns {Promise<Post>}
 */
const createPost = async (
  question: string,
  categoriesIds: number[],
  user?: User
): Promise<Post> => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const newPost = await prisma.post.create({
    data: {
      question,
      userId: user.id,
      Categories: { connect: categoriesIds.map((c) => ({ id: c })) }
    }
  });
  return newPost;
};

const queryPosts = async <Key extends keyof Post>(options: {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: 'asc' | 'desc';
}): Promise<Pick<Post, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      Categories: true,
      reco: {
        select: {
          content: true,
          createdBy: {
            select: {
              name: true,
              id: true
            }
          }
        }
      },
      createdBy: {
        select: {
          name: true
        }
      },
      question: true,
      createdAt: true
    },
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return posts as unknown as Pick<Post, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Post, Key> | null>}
 */
const getPostById = async <Key extends keyof Post>(id: number): Promise<Pick<Post, Key> | null> => {
  return prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      Categories: true,
      reco: {
        select: {
          content: true,
          createdBy: {
            select: {
              name: true,
              id: true
            }
          }
        }
      },
      createdBy: {
        select: {
          name: true
        }
      },
      question: true,
      createdAt: true
    }
  }) as Promise<Pick<Post, Key> | null>;
};

const createReco = async (postId: number, content: string, user?: User): Promise<Post | null> => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const [_, updatedPost] = await prisma.$transaction([
    prisma.reco.create({
      data: {
        content,
        userId: user.id,
        parentPostId: postId
      }
    }),
    prisma.post.update({
      where: {
        id: postId
      },
      data: {
        status: PostStatus.ANSWERED
      }
    })
  ]);

  return updatedPost;
};

export default {
  createPost,
  queryPosts,
  getPostById,
  createReco
};
