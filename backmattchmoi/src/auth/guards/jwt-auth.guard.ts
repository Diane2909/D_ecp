import { ExecutionContext, Injectable, Module } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user.id && !request.user.userId) {
      request.user.userId = request.user.id;
    }
    return super.canActivate(context);
  }
}
