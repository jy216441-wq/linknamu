type LogFields = Record<string, unknown>;

function format(level: string, message: string, fields?: LogFields): string {
  const payload = fields ? ` ${JSON.stringify(fields)}` : "";
  return `[${level}] ${message}${payload}`;
}

export function info(message: string, fields?: LogFields): void {
  console.info(format("info", message, fields));
}

export function warn(message: string, fields?: LogFields): void {
  console.warn(format("warn", message, fields));
}

export function error(message: string, fields?: LogFields): void {
  console.error(format("error", message, fields));
}
