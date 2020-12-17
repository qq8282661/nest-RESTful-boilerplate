import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    const resp = context.switchToHttp().getResponse();
    // console.log(resp);
    return next.handle().pipe(
      map((data) => {
        // console.log('TransformInterceptor.intercept()', data);
        return { code: resp.statusCode, errorMessage: 'success', data };
      }),
    );
  }
}
