import { Router } from 'express';
import { login } from '../controller/login.controller';

const loginRoutes = Router();

loginRoutes.post('/', login);

export default loginRoutes;
