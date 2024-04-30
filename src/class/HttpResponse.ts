export class HttpResponse {
  error(statusCode: number, message: string, data?: any) {
    return {
      statusCode,
      message,
      error: true,
      data,
    };
  }

  success(statusCode: number, message: string, data?: any) {
    return {
      statusCode,
      message,
      error: false,
      data,
    };
  }
}
