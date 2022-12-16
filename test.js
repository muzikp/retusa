var framework = require("./index");

with (framework) {
    try {
        var age = new ScaleVector(20,19,21,22,21,18,23,22, null);
        debugger;
    } catch(error) {
        debugger;
        console.log("Chyba ve vektoru " + error.data.vector)
    }
    console.log(age.sum());
    debugger;
}