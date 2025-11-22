import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FailureResponseTransformer } from './core/exception-filters/failure-exception';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SuccessResponseTransformer } from './core/interceptor/success-response-interceptor';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './modules/auth/Guards/jwt-guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const config = app.get(ConfigService);

  app.useGlobalFilters(new FailureResponseTransformer());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new SuccessResponseTransformer(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const PORT = config.get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
