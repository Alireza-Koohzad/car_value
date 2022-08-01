import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "./users.service";
@Injectable()
export class AuthService {

    constructor(private userService : UsersService){};

    async signup(email : string  , password : string){
        //check exist email
        const user = await this.userService.find(email);
        if(user){
            new BadRequestException("this user has  already exist");
        }

        //hashing password
        const hashPassword = await bcrypt.hash(password , 10);        
        
        //create new user
        const newUser = await this.userService.create(email , hashPassword);
        
        return newUser;
    }


    async signin(){

    }



}