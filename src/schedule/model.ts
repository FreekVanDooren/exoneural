import {ObjectId} from "mongodb";

export type Task = { _id: ObjectId, payload: string, secAfterMidnight: number, last_executed_at?: Date };
