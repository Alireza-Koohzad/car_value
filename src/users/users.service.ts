import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private repo : Repository<User>){}

    create(email : string , password : string){
        const user = this.repo.create({email , password});
        
        return this.repo.save(user);
    }

    async findOne(id : number){
        const user =  await this.repo.findOne({where : {id}})
        if(!user)
            throw new NotFoundException();
        
        return user;
    }


}
