import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){


    }
    @Get()
    public getAllUsers(@Query() filter: GetUserFilterDto){
        return this.usersService.getAllUsers(filter);
    }

    @Get('/:id')
    public getUserById(@Param('id') id: string){
        return this.usersService.getUserById(id);
    }

    @Delete('/:id')
    public deleteUserById(@Param('id') id: string){
        return this.usersService.deleteUserById(id);
    }

    @Post()
    public createUser(@Body() body: CreateUserDto) : Promise<User> {
        return this.usersService.createUser(body);
    }
    
    @Put('/:id')
    public updateUser(@Param('id') id,  @Body() body: UpdateUserDto) : Promise<User>{
        return this.usersService.putUserById(id, body);
    }
}
