import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post('signup')
    createUser (@Body() body : CreateUserDto) {
        this.userService.create(body.email , body.password); 
    } 

    @Get(':id')
     async findUser(@Param('id') id : number){
        return await this.userService.findOne(id)
    }

    @Get()
     async findAll(@Query('email') email : string){
        
        return await this.userService.find(email);
        
    }




}
