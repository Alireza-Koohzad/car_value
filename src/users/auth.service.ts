import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "./users.service";
@Injectable()
export class AuthService {

    constructor(private userService : UsersService){};

    async signup(email : string  , password : string){
        //check exist email
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException("this user has  already exist");
        }
        //hashing password
        const hashPassword = await bcrypt.hash(password , 10);        
        
        //create new user
        const newUser = await this.userService.create(email , hashPassword);
        
        return newUser;
    }


    async signin(email : string , password : string){
        const [user] = await this.userService.find(email);
        if(!user)
            throw new NotFoundException("this user does not exist in system!");
        
        const isMatch = await bcrypt.compare(password , user.password);
        console.log(isMatch);
        
        if(!isMatch){
            throw new BadRequestException("password is wrong !");

        }

        console.log("GG");
        
        return user;    
    }



}