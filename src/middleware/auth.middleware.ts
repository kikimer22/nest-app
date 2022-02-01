import { HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import admin from "../main";
import { UsersService } from "../users/users.service";

export interface RequestModel extends Request {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {
  }

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new HttpException({ message: "missing auth header" }, HttpStatus.BAD_REQUEST);
      }
      const tokenString = this.usersService.clearToken(authorization);
      try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(tokenString);
        console.log(decodedToken);
        next();
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    } catch (err) {
      throw new HttpException({ message: "invalid token" }, HttpStatus.UNAUTHORIZED);
    }
  }

}
