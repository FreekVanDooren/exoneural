import data from "./data/task2.json";

import {config} from 'dotenv'
import {insertTasks} from "@/schedule/repository";

config()

insertTasks(data)
    .then(() => process.exit(0))
