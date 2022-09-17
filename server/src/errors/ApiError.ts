export default class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super()
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, 404)
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, 401)
  }
}
