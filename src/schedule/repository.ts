import {getDbInstance} from "@/database/mongodb";
import {Task} from "./model";

const getTasksDb = () => getDbInstance('tasks_app');

export const insertTasks = async (data: Omit<Task, '_id'>[]) => {
    const db = await getTasksDb();
    await db.collection('scheduled_task').insertMany(data);
};
export const findTask = async (secAfterMidnight: number): Promise<Task | null> => {
    const db = await getTasksDb();
    return db.collection<Task>('scheduled_task')
        .findOne({secAfterMidnight});
};
export const updateTaskWith = async (task: Task, fields: Partial<Task>) => {
    const db = await getTasksDb();
    await db.collection<Task>('scheduled_task')
        .updateOne({_id: task._id}, {$set: fields})
};
