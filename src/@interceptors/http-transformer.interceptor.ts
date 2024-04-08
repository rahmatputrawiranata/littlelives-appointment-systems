import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface HttpResponseInterface<T> {
  status: boolean;
  statusCode: number;
  message?: string;
  response: T;
}

@Injectable()
export class HttpTransformerInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data: HttpResponseInterface<any>) => {
        response.status(data.statusCode);
        return {
          status: data.status,
          status_code: data.statusCode,
          response: data.response,
        };
      }),
    );
  }
}
