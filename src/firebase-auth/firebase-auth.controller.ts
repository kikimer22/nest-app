import { Controller, Get, Post } from "@nestjs/common";

@Controller("auth")
export class FirebaseAuthController {

  constructor() {
  }

  @Post("signUp")
  async signUp() {
  }

  @Post("login")
  async login() {
  }

  @Get("logout")
  async logout() {
  }

}
