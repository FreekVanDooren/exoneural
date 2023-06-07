import {task} from "./task";
import {config} from 'dotenv'

config()

const cliDate = process.argv[2]
const input = Date.parse(cliDate)

if (Number.isNaN(input)) {
    console.error(`Unparseable date: ${cliDate}`)
    process.exit(1)
}
task(new Date(input)).then(() => process.exit(0))
