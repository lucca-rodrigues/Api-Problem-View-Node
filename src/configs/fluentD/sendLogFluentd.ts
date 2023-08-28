import { logger as fluentdLogger } from "./fluentd";
import { Request } from "express";

const os = require("os");

interface ILogger {
  tag?: string;
  funcName?: string;
  request?: Request;
  message: any;
}

class Logger {
  emit({ tag, funcName, request, message }: ILogger) {
    const host = os.hostname() ?? "localhost";
    const tagName = tag ?? "INFO";

    const logTemplate = {
      hostname: `${host}`,
      module: "resource",
      funcName: funcName || request?.method || "",
      levelname: tagName,
      created: new Date().getTime().toString(),
      process: "13",
      thread: "139708970239744",
      processName: "MainProcess",
      pathName: "/opt/frst/app/./api.problem.views.frstfalconi.com",
      levelno: "20",
      stack_trace: "None",
      message: message,
    };

    return fluentdLogger.emit(tagName, logTemplate);
  }
}

/** @description
 *  this class needs two params to generate log
 * @param tag - Tag is the type identifier, your options are: INFO, ERROR, WARNING. Default value is INFO.
 * @param funcName - This param is the logged function or class name
 * @param request - Request is required if you log is http request in controllers
 * @param message - Message is the information logged.
 */
export const logger = new Logger();
