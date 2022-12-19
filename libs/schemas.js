var $ = require("./locale").call;
const $schema = "http://json-schema.org/draft-04/schema#";

class Schema {}

class Entity {
    constructor(config){
        for(let k of Object.keys(config)) {
            var value;
            switch (k) {
                case "title":
                    value = $(config[k])
                    break;
                default:
                    value = config[k];
                    break;
            }
            Object.defineProperty(this, k, {
                writable: false,
                enumerable: false,
                value: value
            });
        }
    }
    markdown() {
        return toMD(this);
    }
}

function toMD(o) {
    var md = "";
    if(["table", "object"].indexOf(o.type) <0) {
        md += `**${$(o.title)}**`
    } else {
        if(o.type == "object") {
            md += `**${$("qumN")}**`;

        }
        else if(o.type == "table") {
            md += `**${$("qumN")}**`;

        }
    } 
}

var int = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "integer",
    "default": 0,
    "title": "Root Schema",
    "examples": [
        1
    ]
}

const any = new Entity({
    type: "any",
    title: "FxzE",
    example: [13.075, -14, 0]
})

const number = new Entity({
    type: "number",
    title: "WdQY",
    example: [13.075, -14, 0]
})

const integer = new Entity({
    type: "number",
    title: "DQnl",
    example: [12, 0, -3]
})

const uint = new Entity({
    name: "uint",
    type: "number",
    title: "IrhN",
    example: [0, 10]
})

const zeroToOneInc = new Entity({
    type: number,
    title: "OQnL",
    example: [0, 0.15, 1]
})

const string = new Entity({
    name: "string",
    type: "string",
    title: "RFGF",
    example: ["Hello", "Lorem ipsum dolor sit amet..."]
})

const boolean = new Entity({
    name: "boolean",
    type: "boolean",
    title: "XPGc",
    examples: [true, false]
})

const correlationCoefficient = new Entity({
    type: number,
    title: "GBcE",
    description: "IPcj",
    example: [0.78, -0.91, 1]
})

const frequencyTable = new Entity({
    name: "frequencyTable",
    type: "table",
    title: "dYJK",
    children: [
        new Entity({
            type: any,
            name: "v",
            title: "ZVbP"
        }),
        new Entity({
            type: integer,
            name: "f",
            title: "mXpR"
        }),
    ],
    example: [
        {
            v: "C",
            f: 12
        },
        {
            v: "A",
            f: 8
        },
        {
            v: "B",
            f: 7
        }
    ]
})

const histogramTable = new Entity({
    name: "histogramTable",
    type: "table",
    children: [
        {
            type: number,
            name: "from",
            title: "jbqY"
        },
        {
            type: number,
            name: "to",
            title: "GlDV"
        },
        {
            type: string,
            name: "i",
            title: "VyzG"
        },
        {
            type: uint,
            name: "n",
            title: "eHkc"
        },
        {
            type: uint,
            name: "nc",
            title: "Dwuz"
        },
        {
            type: zeroToOneInc,
            name: "p",
            title: "iDVx"
        },
        {
            type: zeroToOneInc,
            name: "pc",
            title: "oIyG"
        },
    ],
    example: [{"from":16,"to":18.771609312622935,"i":"16.0 - 18.0","n":3,"nc":3,"p":0.13636363636363635,"pc":0.13636363636363635},{"from":18.771609312622935,"to":21.54321862524587,"i":"19.0 - 21.0","n":9,"nc":12,"p":0.4090909090909091,"pc":0.5454545454545454},{"from":21.54321862524587,"to":24.314827937868806,"i":"22.0 - 24.0","n":7,"nc":19,"p":0.3181818181818182,"pc":0.8636363636363635},{"from":24.314827937868806,"to":27.08643725049174,"i":"25.0 - 27.0","n":2,"nc":21,"p":0.09090909090909091,"pc":0.9545454545454545},{"from":27.08643725049174,"to":29.858046563114677,"i":"28.0 - 29.0","n":1,"nc":22,"p":0.045454545454545456,"pc":0.9999999999999999}]
})

const frequencyOrderEnum = new Entity({
    name: "order",
    type: "enum",
    title: "gZCx",
    values: [
        {
            key: 1, 
            title: "AUbD"
        },
        {
            key: 2, 
            title: "WSJH"
        },
        {
            key: 3, 
            title: "dkxz"
        },
        {
            key: 4, 
            title: "vJCU"
        }
    ]
})

const pearsonR = new Entity({
    type: "object",
    children: {
        r: correlationCoefficient
    }
})

module.exports = {
    number: number,
    integer: integer,
    uint: uint,
    string: string,
    boolean: boolean,
    frequencyTable: frequencyTable,
    histogramTable: histogramTable,
    frequencyOrderEnum: frequencyOrderEnum
}