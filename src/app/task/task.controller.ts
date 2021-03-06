import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Delete,
    UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
//
import { GetUser } from '../common/decorator/user.decorator';
import { User } from '../user/user.entity';
import { CreateTaskDto, CreateTaskWithSchedulerDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard(), RolesGuard)
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@GetUser() user: User, @Body() taskScheduler: CreateTaskWithSchedulerDto) {
        return this.taskService.create(user, taskScheduler.task, taskScheduler.scheduler)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
        return this.taskService.update(id, task)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getTask(@Param('id') id: string) {
        return this.taskService.getTask(id)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    //@Roles('expert')
    async getTasks(@GetUser() user: User) {
        return this.taskService.getTasks(user)
            .then((tasks: Task[]) => {
                return {
                    data: tasks.map((task: Task) => {
                        return this.getITask(task);
                    })
                }
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.taskService.delete(id)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getITask(task: Task): ITask {
        return {
            id: task.id,
            companyId: task.company.id,
            description: task.description,
            comments: task.comments,
            ipAddress: task.ipAddress,
            lat: task.lat,
            lon: task.lon,
            pieces: task.pieces,
            taskDate: task.taskDate,
            transType: task.description,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            scheduler: task.sheduler
        };
    }
}
