import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

// TODO type 과 enum을 한곳에 모을 필요가 있어보인다.
export type AllowedRoles = keyof typeof UserRole | 'Any';

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
