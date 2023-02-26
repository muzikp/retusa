//https://gist.github.com/rxaviers/7360908
var $ = require("./locale").call;
var {Schema, ArgumentSchema} = require("./schemas");

var e_yes = "✔️" //":heavy_check_mark:" //":white_check_mark:";
var e_no = "-" // "❌" // ":no_entry_sign:"

function VectorMarkdown(method, level = 1) {
    var wiki = method;
    var _ = `${hash(level)} [${wiki.title.toUpperCase()}](#${wiki.name}): ${$(wiki.name)}${wiki.description ? "\n\n" + wiki.description + (wiki.url ? " " + "[" + $("WLsu") + "](" + wiki.url + ")" : "") : ""}`;
    _ += `\n\n${hash(level + 1)} ${$("oPEt")}\n\n${createVectorMethodConstructor(wiki)}`
    if(wiki.filter) {
        _ += `\n\n${hash(level+1)} ${$("VVSN")}\n\n${wiki.filter}`;
    }
    constructor = createVectorMethodConstructor(wiki);
    if(wiki.arguments?.length > 0) {
        var headers = [$("QUJS"), $("jBGO"), $("dmmV"), $("tGqA"), $("VPYX"), $("pDgb")];
        var values = wiki.arguments.map(function(a){
            return [
                `**${a.name}**`,
                a.title,
                new ArgumentSchema(a.schema).markdown(),
                a.validator,
                a.required ? e_yes : e_no,
                a.default || a.default === 0 || a.default === false ? a.default : "",
            ];
        });
        _ += `\n\n${hash(level+1)} ${$("FRpk")}\n\n${objArrayToTable(headers, values, [1,1,0,1,1,1])}`;
    }
    if(wiki.arguments.find(a => a.enums)) {
        _ += `\n\n${hash(level+1)} ${$("iY0c")}`;
        for(let a of wiki.arguments.filter(a => a.enums)) {
            _ += `\n\n${hash(level+2)} ${a.title}\n\n${objArrayToTable([$("9oHx"),$("bB5f")], a.enums.map(function(r){return [r.key, $(r.value)]}),[1,0])}`;
        }
    }
    if(wiki.applies?.length > 0) {
        _ += `\n\n${hash(level+1)} ${$("NizL")}\n\n${objArrayToTable([$("AfXp"), $("picU")], wiki.applies.map(v => [v.title, v.apply ? e_yes : e_no]), [0,1])}`;
    }
    _ += `\n\n${hash(level+1)} ${$("KxQM")}\n` + new Schema(wiki.returns).markdown();
    if(wiki.example) {
        _ += `\n\n${hash(level+1)} ${$("nzmJ")}\n\n\`\`\`js\n${wiki.example}\n\`\`\``;
    }
    return _;
}

function MatrixMarkdown(method, level = 1) {
    var wiki = method.wiki;
    var _ = `${hash(level)} [${method.wiki.title.toUpperCase()}](#${method.name}): ${$(method.name)}${method.wiki.description ? "\n\n" + method.wiki.description + (method.url ? " " + "[" + $("WLsu") + "](" + method.url + ")" : "") : ""}`;
    _ += `\n\n${hash(level + 1)} ${$("oPEt")}\n${createMatrixMethodConstructor(method)}`;
    if(method.wiki?.filter) _ += `\n\n${hash(level+1)} ${$("VVSN")}\n\n${method.wiki.filter}`;
    if(method.wiki?.arguments?.length > 0) {
        var headers = [$("QUJS"), $("jBGO"), $("dmmV"), $("tGqA"), $("VPYX"), $("pDgb")];
        var values = method.wiki.arguments.map(function(a){            
            return [
                `**${a.name}**`,
                a.title,
                new ArgumentSchema((method.model.args || []).find(s => s.name == a.name)?.schema).markdown(),
                a.validator,
                a.required ? e_yes : e_no,
                a.default || a.default === 0 || a.default === false ? a.default : "",
            ]
        });
        _ += `\n\n${hash(level+1)} ${$("FRpk")}\n\n${objArrayToTable(headers, values, [1,1,0,1,1,1])}`;
    }
    if(method.model.returns) _ += `\n\n${hash(level+1)} ${$("KxQM")}\n` + new Schema(method.model.returns).markdown();
    if(method.model.example) _ += `\n\n${hash(level+1)} ${$("nzmJ")}\n\n\`\`\`js\n${method.wiki.example}\n\`\`\``;
    return _;
}

function VectorOverview(Models) {
    var models = Object.entries(Models).map(x => x[1]);
    var _ = `# ${$("P94q")}\n\n${$("rL7a")}`;
    _ += "\n\n## Statistické metody\n\n";
    _ += objArrayToTable([$("wRbe"),$("rlTY"),$("LOYN"),$("zoiB"),$("OkoC")],models.map(function(m) { 
        var row = [
            `[${m.wiki.name}](#${m.wiki.name})`,
            `${m.wiki.title}`,
            m.wiki.applies[0].apply ? e_yes : e_no,
            m.wiki.applies[1].apply ? e_yes : e_no,
            m.wiki.applies[2].apply ? e_yes : e_no,
        ];
        return row;
    }),[1,1,1,1,1]);
    models.forEach(function(m) {
        _ += "\n\n\---\n\n" + VectorMarkdown(m.wiki, 3);
    });
    return _;
}

function MatrixOverview(Models) {
    var models = Object.entries(Models).map(x => x[1]);
    var _ = "# Matice\n\nBablablablabla.";
    _ += "\n\n## Statistické metody\n\n";
    _ += objArrayToTable([$("wRbe"),$("rlTY")],models.map(function(m) { 
        var row = [
            `[${m.wiki.name}](#${m.wiki.name})`,
            `${m.wiki.title}`,
            //m.wiki.description,
        ];
        return row;
    }),[1,1,0]);
    models.forEach(function(m) {
        _ += "\n\n\---\n\n" + MatrixMarkdown(m, 3);
    });
    return _;
}



const hash = function(level) {
    var h = "";
    for(var i = 0; i < level; i++) {
        h += "#";
    }
    return h;
}

function objArrayToTable(headers, values, alignment) {
    var t = "|";
    headers.forEach(h => t+= ` ${h} |`);
    t += "\n|";
    headers.forEach((h,i) => t += ` ${(alignment || [])[i] == 1 ? ":" : ""}---${(alignment || [])[i] > 0 ? ":" : ""} | `);
    values.forEach(function(v){ 
        t += "\n|";
        v.forEach(_ => t += ` ${_} |`)
    });
    return t;
}

function createVectorMethodConstructor(wiki) {
    var _ = "";
    for(var t of wiki.applies.filter(a => a.apply)) {
        _ += "\n> (";
        if(t.type == 1) _ += "NumericVector";
        else if(t.type == 2) _ += "StringVector";
        else if(t.type == 3) _ += "BooleanVector";
        _ += `).<mark>**${wiki.name}**(${wiki.arguments.length > 0 ? "" : ")"}`;
        for(var a of wiki.arguments) {
            _ += a.required ? "***" + a.title + "***" : "*" + a.title + "*";
            if(wiki.arguments.indexOf(a) < wiki.arguments.length - 1) _ += ", ";
            else _+= ")";
        }
        _+="\n";
    }
    return _;
}

function createMatrixMethodConstructor(method) {
    var _ = "";    
    _ += "\n> [Matrix instance]." + `**${method.name}**(${method.model.args.length > 0 ? "" : ")"}`;
    for(var i = 0; i < method.wiki.arguments.length; i++) {
        let a = method.wiki.arguments[i];
        _ += a.required ? "***" + a.title + "***" : "*" + a.title + "*";
        if(i < method.wiki.arguments.length - 1) _ += ", ";
        else _+= ")";
    }
    _+="\n"; 
    return _;
}

module.exports = {
    VectorOverview: VectorOverview,
    VectorMarkdown: VectorMarkdown,
    MatrixMarkdown: MatrixMarkdown,
    MatrixOverview: MatrixOverview
}