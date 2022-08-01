import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptors implements NestInterceptor {
    constructor(private userService : UsersService){};

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const {session} = request;
        if(session.userId){
            const user = await this.userService.findOne(session.userId);        
            request.currentUser  = user;
        }
        return next.handle();
    }


}