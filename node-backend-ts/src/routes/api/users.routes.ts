import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();
// api/users
routes
  .route('/signup')
  .post(controllers.create);

// authentication
routes.route('/login').post(controllers.authenticate);

export default routes;
