import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as admin from 'firebase-admin';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      project_id: process.env.FIREBASE_PROJECT_ID
    } as Partial<admin.ServiceAccount>),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

export default admin;
bootstrap();
