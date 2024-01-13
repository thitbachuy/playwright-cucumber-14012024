import { transports, format,  } from "winston";

export function options(scenarioName: string) {
    
    return {
        level: 'info',
        format: format.combine(
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
        ),
        transports: [
            new transports.File({
                filename: `test-results/logs/${scenarioName}/log.log`,
            }),
            new transports.Console()
        ]
    }
};