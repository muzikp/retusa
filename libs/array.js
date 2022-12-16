Array.prototype.sum = function() {
    var t = this.clone().name();
    debugger;
    return this.reduce((a,b) => a+b);
}

Array.prototype.count = function() {
    return this.length;
}

Array.prototype.avg = function() {
    return this.sum()/this.count()
}

Array.prototype.asc = function(self) {
    if(self) return this.sort((a,b) => a - b);
    else return new Array(...this).sort((a,b) => a - b);
}

Array.prototype.desc = function(self) {
    if(self) {
        return this.sort((a,b) => b - a);
    } else return new Array(...this).sort((a,b) => b - a);
}

Array.prototype.min = function(){
    if(this.length == 0) return null;
    else if(this.length == 1) return this[0];
    else return this.asc()[0];
}

Array.prototype.max = function(){
    if(this.length == 0) return null;
    else if(this.length == 1) return this[0];
    else return this.desc()[0];
}

module.exports = Array;