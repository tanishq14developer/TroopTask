import type { PipeTransform } from '@nestjs/common';
import {
    applyDecorators,
    Param,
    ParseUUIDPipe,
    SetMetadata,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';
import {
    ApiBearerAuth,
    ApiSecurity,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import type { RoleType } from '../constants';
import { AuthUserInterceptor } from '../interceptors/auth-user-interceptor.service';
import { AuthGuard } from './../guards/auth.guard';
import { RolesGuard } from './../guards/roles.guard';

export function Auth(
    roles: RoleType[] = [],
    options?: Partial<{ public: boolean }>,
): MethodDecorator {
    const isPublicRoute = options?.public;

    return applyDecorators(
        SetMetadata('roles', roles),
        UseInterceptors(AuthUserInterceptor),
        UseGuards(AuthGuard({ public: isPublicRoute }), RolesGuard),
        ApiBearerAuth(),
        ApiSecurity('jwt'),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function UUIDParam(
    property: string,
    ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
    return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
