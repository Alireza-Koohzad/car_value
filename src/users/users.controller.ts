import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService : UsersService){}

    @Post('signup')
    async createUser (@Body() body : CreateUserDto) {
        const user = await this.userService.create(body.email , body.password); 
        console.log(user);
        return user
        
    } 

    @Get(':id')
     async findUser(@Param('id') id : string){
        const user =  await this.userService.findOne(parseInt(id))
        console.log(user);
        return user;
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
