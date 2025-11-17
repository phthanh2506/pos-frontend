export default class Logger {

    private static buildLogMessage(message: string): string {
        return '[LOG] ' + message;
    }

    static log(message: any) {
        if (import.meta.env.VITE_DEV_MODE === 'true') {
            console.log(Logger.buildLogMessage(message));
        }
    }

    static error(message: string) {
        if (import.meta.env.VITE_DEV_MODE === 'true') {
            console.error(Logger.buildLogMessage(message));
        }
    }
}