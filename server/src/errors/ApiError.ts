export default class ApiError extends Error {
  message: string
  status: number

  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, 404)
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, 401)
  }
}
