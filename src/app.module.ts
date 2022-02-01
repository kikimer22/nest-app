import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule]
})
// export class AppModule {}
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "posts", method: RequestMethod.GET },
        { path: "posts/:id", method: RequestMethod.GET },
        { path: "posts/:id", method: RequestMethod.GET },
        { path: "posts/filter/:authorUid", method: RequestMethod.GET },
        { path: "users", method: RequestMethod.ALL },
        { path: "users/:uid", method: RequestMethod.ALL }
      )
      .forRoutes(
        { path: "/**", method: RequestMethod.ALL }
      );
  }
}
