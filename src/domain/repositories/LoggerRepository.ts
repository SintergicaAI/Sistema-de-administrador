export interface LoggerRepository {
    info(message: string, context?:never): void;
    warn(message: string, context?:never): void;
    error(message: string, context?:never): void;
}