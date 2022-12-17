class VectorValueError extends Error {
    constructor(msg, data){
        super(...arguments);
        this.name = "";
        this.data = data;
    }
}

class ArgumentError extends Error {
    constructor(msg, sender) {
        super(msg);
        this.data = sender;
        this.name = "";
        this.message = msg;
    }
}

class Empty {
    constructor(message) {
        this.default = message || "";
    }
}

module.exports = {
    VectorValueError: VectorValueError,
    ArgumentError: ArgumentError,
    Empty: Empty
}