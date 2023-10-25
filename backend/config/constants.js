/* HTTP status code constant starts */
module.exports.SERVER_ERROR_HTTP_CODE = 412;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_CREATED_HTTP_CODE = 201;
module.exports.SERVER_UPDATED_HTTP_CODE = 204;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_INTERNAL_ERROR_HTTP_CODE = 500;
module.exports.SERVER_BAD_REQUEST_HTTP_CODE = 400;
module.exports.SERVER_UNAUTHORIZED_HTTP_CODE = 401;
module.exports.SERVER_FORBIDDEN_HTTP_CODE = 403;
module.exports.SERVER_NO_CONTENT_HTTP_CODE = 204;
module.exports.SERVER_PARTIAL_CONTENT_HTTP_CODE = 206;
module.exports.SERVER_MOVED_PERMANENTLY_HTTP_CODE = 301;
module.exports.SERVER_FOUND_HTTP_CODE = 302;
module.exports.SERVER_SEE_OTHER_HTTP_CODE = 303;
module.exports.SERVER_NOT_MODIFIED_HTTP_CODE = 304;
module.exports.SERVER_TEMPORARY_REDIRECT_HTTP_CODE = 307;
module.exports.SERVER_PERMANENT_REDIRECT_HTTP_CODE = 308;
module.exports.SERVER_BAD_GATEWAY_HTTP_CODE = 502;
module.exports.SERVER_SERVICE_UNAVAILABLE_HTTP_CODE = 503;
module.exports.SERVER_GATEWAY_TIMEOUT_HTTP_CODE = 504;
module.exports.SERVER_HTTP_VERSION_NOT_SUPPORTED_HTTP_CODE = 505;
/* Additional HTTP status code constants */

/* Route related constants starts */
module.exports.USER_REGISTRATION_OK = 'User registration successful.';
module.exports.USER_REGISTRATION_FAILED = 'User registration unsuccessful.';
module.exports.USER_LOGIN_OK = 'User logged in.';
module.exports.USER_LOGIN_FAILED = 'User not found.';
module.exports.USER_FOUND = 'Users founds.';
module.exports.USER_CREATED = 'User Created Successfully.';
module.exports.USER_UPDATED = 'User Updated Successfully.';
module.exports.USER_DELETED = 'User Deleted Successfully.';
module.exports.ALREADY_USER_DELETED = 'No User Deleted';
module.exports.CUSTOMER_CREATED = "Customer Created Successfully";
module.exports.CUSTOMER_UPDATED = "Customer Updated Successfully";
module.exports.CUSTOMER_DELETED = "Customer Deleted Successfully";
module.exports.CUSTOMER_FOUND = "Customers found"
module.exports.CUSTOMER_CREATED_FAILED = "Customer creation failed";
module.exports.CUSTOMER_UPDATED_FAILED = "Customer Update failed";
module.exports.CUSTOMER_DELETED_FAILED = "Customer deletion failed";
module.exports.CUSTOMER_NOT_FOUND = "Customer not found";


/* Validation related  constants starts */
module.exports.PASSWORD_NOT_FOUND = 'password can\'t be empty.';
module.exports.USERNAME_NOT_FOUND = 'User name can\'t be empty.';
module.exports.USERLASTNAME_NOT_FOUND = 'User last name can\'t be empty.';
module.exports.USERID_NOT_FOUND = 'User Id can\'t be empty.';
module.exports.EMAIL_NOT_FOUND = 'Email can\'t be empty.';
module.exports.GENDER_NOT_FOUND = 'Gender can\'t be empty.';
module.exports.PASSWORD_NOT_FOUND = 'Password can\'t be empty.';
module.exports.USER_NOT_FOUND = 'User does not exits.';
module.exports.FIELD_EMPTY = 'All fields are required.';
/* CRUD related constants for Jobs starts */
module.exports.JOB_CREATED = 'Job created successfully.';
module.exports.JOB_CREATION_FAILED = 'Job creation failed.';
module.exports.JOB_UPDATED = 'Job updated successfully.';
module.exports.JOB_UPDATE_FAILED = 'Job update failed.';
module.exports.JOB_DELETED = 'Job deleted successfully.';
module.exports.JOB_DELETE_FAILED = 'Job deletion failed.';
module.exports.JOB_NOT_FOUND = 'Job not found.';
module.exports.JOB_FOUND = 'Jobs founds.';
module.exports.JOB_ALREADY_EXISTS = 'Job already exists.';
/* CRUD related constants for Jobs ends */



/* General Errors  constants start */
module.exports.ROUTE_NOT_FOUND = 'You are at wrong place. Shhoooo...';
module.exports.SERVER_ERROR_MESSAGE = 'Something bad happend. It\'s not you, it\'s me.';