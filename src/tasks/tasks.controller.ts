import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

        if(Object.keys(filterDto).length){

            return this.tasksService.getTaskWithFilter(filterDto);

        }else{

            return this.tasksService.getAllTasks();

        }

    }

    @Get('/:id')
    GetById(id: string): Task {

        return this.tasksService.getTaskById(id);

    }

    @Post()
    createTask(dto : CreateTaskDto): Task {

        return this.tasksService.createTask(dto.title, dto.description);

    }

    @Delete('/:id')
    DeleteTask(id: string): void {

        return this.tasksService.deleteTaskById(id);

    }

    @Patch('/:id/status')
    UpdateTaskStatus(@Param('id') id: string, @Body('status') updateTaskDto: UpdateTaskDto): Task {

        var task =  this.tasksService.updateTaskStatus(id, updateTaskDto.status);

        return task;

    }
}
