import { LoggerRepository } from '../../domain/repositories/LoggerRepository.ts';

export class ConsoleLogger implements LoggerRepository {
  info(message: string, context?: any): void {
    console.info(`[INFO]: ${message}`, context || '');
  }

  warn(message: string, context?: any): void {
    console.warn(`[WARN]: ${message}`, context || '');
  }

  error(message: string, context?: any): void {
    console.error(`[ERROR]: ${message}`, context || '');
  }
}