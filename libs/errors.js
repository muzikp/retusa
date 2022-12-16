class VectorValueError extends Error {
    constructor(msg, data){
        super(...arguments);
        this.name = "";
        this.data = data;
    }
}

class ArgumentError extends Error {
    constructor(msg, data){
        super(...arguments);
        this.name = "";
        this.data = data;
    }
}

module.exports = {
    VectorValueError: VectorValueError,
    ArgumentError: ArgumentError
}