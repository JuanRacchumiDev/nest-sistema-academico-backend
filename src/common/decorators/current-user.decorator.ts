import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export interface AuthenticatedUser {
    id: string
    name?: string
    email?: string
}

export const currentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },

    // (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    //     const request = ctx.switchToHttp().getRequest()
    //     const user = request.user as AuthenticatedUser
    //     return data ? user?.[data] : user;
    // }
)