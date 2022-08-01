import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseInterceptors } from '@nestjs/common';
import { get } from 'http';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService : UsersService , private authService : AuthService){}

    @Get('whoami')
    whoAmI(@Session() session : any){
        return this.userService.findOne(session.userId);
    }

    @Post('signout')
    signout(@Session() session : any){
        session.userId = null;
    }

    @Post('signup')
    async signup (@Body() body : CreateUserDto , @Session() session : any) {
        const user =await  this.authService.signup(body.email , body.password);
        session.userId = user.id;
        return user;        
    } 


    @Post('signin')
    async signin (@Body() body : CreateUserDto , @Session() session : any) {
        const user = await this.authService.signin(body.email , body.password);        
        session.userId = user.id;
        return user;

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
