import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { uuid } from 'uuidv4';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title:string, description:string): Task {

        const task: Task = {
            id: uuid().toString(),
            description,
            status: TaskStatus.OPEN,
            title
        }

        this.tasks.push(task);

        return task;

    }

    getTaskById(id: string): Task {
        return this.tasks.find((x) => x.id === id);
    }

    getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
        const {status, search} = filterDto

        var tasks = this.getAllTasks();

        if(status){

            tasks = tasks.filter(x => x.status === status);

        }

        if(search){

            tasks = tasks.filter(x => x.description.includes(search));
        }

        return tasks;
    }


    deleteTaskById(id: string): void{

        this.tasks.filter(x => x.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {

        var task = this.getTaskById(id);

        task.status = status;

        return task;
    }
}
