import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');

  // app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  
  app.use(
    cors({origin: process.env.FRONT_URL, credentials: true}),
    cookieParser(),
  );


  await app.listen(4000);
}
bootstrap();


/* shouldnt we disconnect prisma at the end ?

.finally(async () ==> {
  await prisma.disconnnect()
})


*/