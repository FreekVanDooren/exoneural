import {findTask, updateTaskWith} from "./repository";
import {Task} from "./model";

if (process.env.NODE_ENV === 'production') {
    console.debug = () => {
    }
}

const calculateSecondsAfterMidnight = (now: Date) => {
    const midnight = new Date(now).setUTCHours(0, 0, 0, 0);
    return Math.floor((now.getTime() - midnight) / 1000);

};
const executeTask = async (task: Task) => {
    /*
     ...
     Execute task
     ...
    */
    console.log('Payload', task.payload)
    await updateTaskWith(task, {last_executed_at: new Date()})
};

export const task = async (now: Date | "manual" | "init") => {
    if (!(now instanceof Date)) {
        return
    }
    const secAfterMidnight = calculateSecondsAfterMidnight(now);
    console.debug('Searching for scheduled task', {now, secAfterMidnight})
    const task = await findTask(secAfterMidnight);
    if (task) {
        console.debug('Executing', task)
        await executeTask(task)
        console.debug('Execution complete')
    } else {
        console.debug('No scheduled task executed')
    }
};
