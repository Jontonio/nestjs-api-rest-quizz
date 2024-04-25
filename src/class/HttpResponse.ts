export class HttpResponse {
  res_error(statusCode: number, message: string, data?: any) {
    return {
      statusCode,
      message,
      error: true,
      data,
    };
  }

  res_success(statusCode: number, message: string, data?: any) {
    return {
      statusCode,
      message,
      error: false,
      data,
    };
  }
}
