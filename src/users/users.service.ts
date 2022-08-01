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
        if(!id) return null;
        const user =  await this.repo.findOne({where : {id}})
        if(!user)
            throw new NotFoundException();
        
        return user;
    }


    async find(email : string){
        const user =  await this.repo.find({where : {email}})
        if(!user)
            throw new NotFoundException();
        
        return user;
    }

    async update(id : number , attrs:Partial<User>){
        const user = await this.repo.findOne({where : {id}});
        if(!user)
            throw new NotFoundException();
        
        Object.assign(user,  attrs);
        return this.repo.save(user);    
    }

    async remove(id : number){
        const user = await this.repo.findOne({where : {id}});
        if(!user)
            throw new NotFoundException();
        
        return await this.repo.remove(user);    
    }


}
