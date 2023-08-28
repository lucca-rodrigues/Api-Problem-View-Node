import axios from "axios";
import { NextFunction, Request, Response } from "express";

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.bearer;
  const providerToken = req.headers.provider;

  try {
    if (!token || !providerToken) {
      return res.status(401).send({
        error: "Tokens not found, please insert valid token to continue",
      });
    }

    const authApi = process.env.AUTH_SERVICE;
    const response = await axios.post(
      `${authApi}/api/v1/auth`,
      {
        provider_token: providerToken,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 201) {
      return next();
    }
  } catch (error) {
    return res.status(500).send({
      error: "Internal server error, this is invalid or expired token",
    });
  }
}
