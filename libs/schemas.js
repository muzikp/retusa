const number = {
    type: "number",
    title: "WdQY",
    examples: [13.075, -14, 0]
}

const integer = {
    type: "integer",
    title: "DQnl",
    examples: [12, 0, -3]
}

const uint = {
    name: "uint",
    type: "integer",
    title: "IrhN",
    examples: [0, 10]
}


const string = {
    name: "string",
    type: "string",
    title: "RFGF",
    examples: ["Hello", "Lorem ipsum dolor sit amet..."]
}

const boolean = {
    name: "boolean",
    type: "boolean",
    title: "XPGc",
    examples: [true, false]
}

const frequencyTable = {
    name: "frequencyTable",
    type: "table",
    children: [
        {
            type: "any",
            name: "v",
            title: "ZVbP"
        },
        {
            type: integer,
            name: "f",
            title: "mXpR"
        },
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
}

const frequencyOrderEnum = {
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
}

module.exports = {
    number: number,
    integer: integer,
    uint: uint,
    string: string,
    boolean: boolean,
    frequencyTable: frequencyTable,
    frequencyOrderEnum: frequencyOrderEnum
}