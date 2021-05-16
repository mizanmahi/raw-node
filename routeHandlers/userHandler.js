// handling user related routes

// dependencies
const data = require("../lib/data");

//scafolding
const handler = {};

handler.userHandler = (requestProperties, cb) => {
  if (requestProperties.method === "post") {
    handler._user[requestProperties.method](requestProperties, cb);
    return;
  }
  if (requestProperties.method === "get") {
    handler._user[requestProperties.method](requestProperties, cb);
    return;
  }
  if (requestProperties.method === "put") {
    handler._user[requestProperties.method](requestProperties, cb);
    return;
  }
  if (requestProperties.method === "delete") {
    handler._user[requestProperties.method](requestProperties, cb);
    return;
  }

  cb(405, { message: "invalid method" });
};

handler._user = {};

handler._user.post = (requestProperties, cb) => {
  // validating user input
  let { firstName, lastName, password, phone, tosAgreement } =
    requestProperties.body;
  firstName =
    typeof firstName === "string" && firstName.trim().length > 0
      ? firstName.trim()
      : false;
  lastNmae =
    typeof lastName === "string" && lastName.trim().length > 0
      ? lastName.trim()
      : false;
  password =
    typeof password === "string" && password.length > 5 ? password : false;
  phone = typeof phone === "string" && phone.length === 11 ? phone : false;
  tosAgreement = typeof tosAgreement === "boolean" && tosAgreement;

  if (firstName && lastNmae && phone && password && tosAgreement) {
    const user = {
      firstName,
      lastName,
      password,
      phone,
      tosAgreement,
    };
    console.log(user);
    // make sure data doesnt already exist
    data.read("users", phone, (err, udata) => {
      if (err) {
        //  creatng user
        data.create("users", phone, user, (err) => {
          if (!err) {
            cb(200, { message: "User was created !" });
          } else {
            cb(400, { message: "Error creating new user!" });
          }
        });
      } else {
        cb(400, { message: "User may alrady exist!" });
      }
    });
  } else {
    cb(400, {message: "Invalid inputs"});
  }
};

handler._user.get = (requestProperties, cb) => {
  let { phone } = requestProperties.queryObj;
  phone = typeof phone === "string" && phone.length === 11 ? phone : false;
  if (phone) {
    data.read("users", phone, (err, data) => {
      if (!err) {
        const user = { ...JSON.parse(data) };
        console.log(data);
        delete user.password;
        cb(200, user);
      }
    });
  } else {
    cb(404, { message: "user not found!" });
  }
};

handler._user.put = (requestProperties, cb) => {
  let { firstName, lastName, password, phone } = requestProperties.body;
  phone = typeof phone === "string" && phone.length === 11 ? phone : false;
  firstName =
    typeof firstName === "string" && firstName.trim().length > 0
      ? firstName.trim()
      : false;
  lastNmae =
    typeof lastName === "string" && lastName.trim().length > 0
      ? lastName.trim()
      : false;
  password =
    typeof password === "string" && password.length > 5 ? password : false;
  if (phone) {
      data.read("users", phone, (err, udata) => {  
          if (!err) {
              const user = { ...JSON.parse(udata) };
              console.log(user);
        if (firstName) {
          user.firstName = firstName;
        }
        if (lastName) {
          user.lastName = lastName;
        }
        if (password) {
          user.password = password;
        }
        data.update("users", phone, user, err => {
            if(!err){
                cb(200, {message: "User was updated sucsessfully!"})
            }
        })
      } else {
        cb(400, { message: "Invalid Credential, try again!" });
      }
    });
  } else {
    cb(400, { message: "Invalid Credential, try again!" });
  }
};

handler._user.delete = () => {};

module.exports = handler;
