import express from 'express';
import validate from '../../middlewares/validate';
import { postValidation } from '../../validations';
import { postController } from '../../controllers';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(postValidation.createPost), postController.createPost)
  .get(validate(postValidation.getPosts), postController.queryPosts);

router.route('/:postId').get(validate(postValidation.getPost), postController.getPostById);
router
  .route('/:postId/reco')
  .post(auth('reco'), validate(postValidation.createReco), postController.createReco);

export default router;
