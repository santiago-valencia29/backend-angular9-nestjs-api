import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'
import { AnyExceptionFilter } from './exception-filters/any-exception.filter';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AnyExceptionFilter());
  const corsOptions = {
    origin: [
      'http://localhost:4200',
      'https://angular9.herokuapp.com/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(helmet());
  app.enableCors(); //acceder desde una app angular
  
  // app.use(csurf());
  // app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
