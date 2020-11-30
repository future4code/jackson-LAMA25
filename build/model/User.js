"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = exports.User = void 0;
class User {
    constructor(id, name, email, password, role) {
        this.id = id,
            this.name = name,
            this.email = email,
            this.password = password,
            this.role = role;
        if (role.toUpperCase() === USER_ROLES.ADMIN) {
            this.role = role;
        }
        else if (role.toUpperCase() === USER_ROLES.NORMAL) {
            this.role = role;
        }
        else {
            throw new Error("Please send a valid USER_ROLES. Valid values ​​are ADMIN or NORMAL.");
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getHashPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    static toUserModel(object) {
        return new User(object.id, object.name, object.email, object.password, object.role);
    }
}
exports.User = User;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["ADMIN"] = "ADMIN";
    USER_ROLES["NORMAL"] = "NORMAL";
})(USER_ROLES = exports.USER_ROLES || (exports.USER_ROLES = {}));
//# sourceMappingURL=User.js.map