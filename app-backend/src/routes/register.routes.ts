import { Router } from 'express';
import { register } from '../controller/register.controller';

const registerRoutes = Router();

registerRoutes.post('/', register);

export default registerRoutes;
