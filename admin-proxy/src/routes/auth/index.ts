import express, { NextFunction, Request, Response, Router } from "express";
import passport from "../../middleware/auth/passport";
import { authController } from "../../controllers/auth";
import authorize from "../../middleware/auth/authorize";

const authRouter = Router();
authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));
authRouter.get(
  "/me",
  authorize(),
  (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== 'production') console.log(req.user);
    res.json(req.user);
  },
);

// Google Oauth Consent Screen
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google Oauth Callback Route
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  authController.authCallback,
);

// Logout Route
authRouter.get(
  "/logout", 
  authorize(),
  authController.logout);

// Magic Token Route only for development
if (process.env.NODE_ENV === "development") {
  authRouter.post("/magic", authController.magicToken);
}

export default authRouter;
