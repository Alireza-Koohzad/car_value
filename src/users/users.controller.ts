import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post('signup')
    async createUser (@Body() body : CreateUserDto) {
        await this.userService.create(body.email , body.password); 
    } 

    @Get(':id')
     async findUser(@Param('id') id : number){
        return await this.userService.findOne(id)
    }

    @Get()
     async findAll(@Query('email') email : string){
        
        return await this.userService.find(email);
        
    }

    @Patch(':id')
    async updateUser(@Param('id') id :number , @Body() body : any){
        await this.userService.update(id , body);
    }


}
