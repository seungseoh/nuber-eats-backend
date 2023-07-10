import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedRoles } from './role.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    // Reflector 메타데이터 체크
    // Resolver에 Role 이 없으면 Public
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    // 메타데이터에 있는 정보가 유저에 존재하는지 검증
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    console.log(user);
    console.log(roles);
    if (!user) {
      return false;
    }
    // Any는 Public은 아니지만 모든 Role 이 접근 가능하다
    if (roles.includes('Any')) {
      return true;
    }
    return roles.includes(user.role);
  }
}
