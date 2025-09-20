import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserDetailController } from "./controllers/user/UserDetailController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// User
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new UserDetailController().handle);

export { router };
