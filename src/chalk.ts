export type TLogger = {
  log(...args: any[]): void;
  info(...args: any[]): void;
  success(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
};

class Logger {
  chalk!: typeof import("chalk").default;
  constructor() {}
  async init() {
    this.chalk = (await import("chalk")).default;
  }
  timeStr() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  }
  colorTime() {
    return `[${this.timeStr()}]`;
  }
  log(...args: any[]) {
    console.log(this.colorTime(), this.chalk.gray("(default)"), ...args);
  }
  info(...args: any[]) {
    console.log(this.colorTime(), this.chalk.blue("(   info)"), ...args);
  }
  success(...args: any[]) {
    console.log(this.colorTime(), this.chalk.green("(success)"), ...args);
  }
  warn(...args: any[]) {
    console.log(this.colorTime(), this.chalk.yellow("(   warn)"), ...args);
  }
  error(...args: any[]) {
    console.log(this.colorTime(), this.chalk.red("(  error)"), ...args);
  }
}

const logger = new Logger();
export default logger;
