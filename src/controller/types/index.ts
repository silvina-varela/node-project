/* Este archivo exporta los diferentes tipos de respuestas que puede devolver el controlador */

/**
 * Basic JSON response for controllers
 */
export type BasicResponse = {
    message: string
}

/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
    error: string,
    message: string
}