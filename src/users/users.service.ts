import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ROLE } from './types/user-role.enum';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

//will be a singleton
@Injectable()
export class UsersService {
    constructor(private usersRepository : UsersRepository) {}

    public getAllUsers(filter: GetUserFilterDto) : Promise<User[]>{
        return this.usersRepository.getAllUsers(filter);
    }

    public async getUserById(id: string){
        const user = await this.usersRepository.getUserById(id);

        //this piece does not work
        if(!user){
            throw new NotFoundException(`User with ID ${id} not found`);
            
        }
        return user;
        
    }

    public async deleteUserById(id: string): Promise<void>{
        const user = await this.usersRepository.delete(id);
        if(user.affected === 0){

            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    public createUser(user: CreateUserDto) : Promise<User>{
        return this.usersRepository.createUser(user);
    }

    public async putUserById(id: string, userInfo: UpdateUserDto) {
        const user = await this.getUserById(id);
        return this.usersRepository.save({ ...user, ...userInfo });
      }
}
