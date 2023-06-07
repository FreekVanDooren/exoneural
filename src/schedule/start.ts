import cron from 'node-cron'
import {config} from 'dotenv'
import {task} from "./task";

config()

console.log('Task scheduler started')

/**
 * Triggers every 15 seconds.
 */
cron.schedule("*/15 * * * * *", task)
