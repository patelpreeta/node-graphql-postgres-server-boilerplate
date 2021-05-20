const createErrorResponse = (ex, res) => {
	const { statusCode = 400, message } = ex;
	return res.status(statusCode).json({
		status: 'FAIL',
		statusCode,
		message
	});
};

module.exports = {
	createErrorResponse
};
