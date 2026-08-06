export function success(res, data, statusCode = 200) {
    res.status(statusCode).json({ success: true, data });
}
export function fail(res, message, statusCode = 400, code = "BAD_REQUEST") {
    res.status(statusCode).json({
        success: false,
        error: { code, message },
    });
}
//# sourceMappingURL=apiResponse.js.map