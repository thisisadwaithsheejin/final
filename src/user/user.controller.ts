import { Body, Controller,Delete,Get ,Param,Post, Put } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        ) {}
     /**
     * Retrieves all users
     * @returns Promise<User[]> list of all users
     */
    @Get()
    async getAllUser(): Promise<User[]> {
        //Retrieves all users
        const users = await this.userService.findAll();
        return users;
    }
    /**
     * create a user 
     * @param user user CreateUserDto The user data to be created
     * @returns {Promise<User>} The created user
     */
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        const createdUser = await this.userService.create(user);
        return createdUser;
    }
    /**
     * Retrieves a user by ID
     * @param id id string The ID of the user to retrieve
     * @returns Promise<User> The user with the specified ID
     */
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        // Retrieve a user by its ID from the UserService
        return this.userService.findById(id);
    }
    /**
     * Update a user by ID
     * @param id string ID of the user to update
     * @param user UpdateUserDto The updated user data
     * @returns Promise<User> the updated user
     */
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userService.updateById(id,user);
        return updatedUser;
    }
    /**
     * Delete a user by ID
     * @param id string The ID of the user to delete
     * @returns {Promise<User>} The deleted user
     */
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.userService.deleteById(id);
        return deletedUser;
    }
}
