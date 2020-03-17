import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log('Before...');
        const req = context.switchToHttp().getRequest();
        console.log('=>', 'req.method', req.method);
        console.log('=>', 'req.url', req.url);
        console.log('=>', 'req.body', req.body);
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                console.log(`共计耗时... `, Date.now() - now, 'ms');
                const res = context.switchToHttp().getResponse();
                console.log('<=', 'req.method', req.method);
                console.log('<=', 'req.url', req.url);
                console.log('<=', 'res.status', res.statusCode);
            }),
        );
    }
}
