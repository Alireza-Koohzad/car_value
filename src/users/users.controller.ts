import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post('signup')
    async createUser (@Body() body : CreateUserDto) {
        await this.userService.create(body.email , body.password); 
    } 

    @Get(':id')
     async findUser(@Param('id') id : string){
        return await this.userService.findOne(parseInt(id))
    }

    @Get()
     async findAll(@Query('email') email : string){
        
        return await this.userService.find(email);
        
    }

    @Patch(':id')
    async updateUser(@Param('id') id :string , @Body() body : updateUserDto){
        await this.userService.update(parseInt(id) , body);
    }


    @Delete(':id')
    async deleteUser(@Param('id') id : string){
        await this.userService.remove(parseInt(id));
    }

}
