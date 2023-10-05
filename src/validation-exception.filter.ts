import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const validationErrors = exception.getResponse() as ValidationError[];
      
      const messages = (Object.keys(validationErrors)[0] == "message") ? validationErrors : validationErrors.map((error) => {
          const constraints = error.constraints;
          if (constraints)
            return constraints[Object.keys(constraints)[0]];
        });

      // Revisar
      // const messages = validationErrors.map((error) => {
      //   const constraints = error.constraints;
      //   if (constraints)
      //     return constraints[Object.keys(constraints)[0]];
      // });

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Solicitud Inválida',
        message: messages,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Error interno del servidor',
        message: 'Algo salio mal.',
      });
    }
  }
}