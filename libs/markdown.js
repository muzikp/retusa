var $ = require("./locale").call;

function VectorMarkdown(wiki, level = 1) {
    console.dir(wiki);
    var _ = `${hash(level)} ${wiki.name.toUpperCase()}`;
    if(wiki.description) _ += `\n\n${wiki.description}`;
    if(wiki.filter) {
        _ += `\n\n${hash(level+1)} ${$("VVSN")}\n\n${wiki.filter}`;
    }
    if(wiki.arguments?.length > 0) {
        var headers = [$("QUJS"), $("jBGO"), $("tGqA"), $("VPYX"), $("pDgb"), $("Olab")];
        var values = wiki.arguments.map(function(a){
            return [
                a.name,
                a.title,
                a.validator,
                a.required ? $("OpXv") : "-",
                a.default || a.default === 0 || a.default === false ? a.default : "-",
                a.multiple ? $("OpXv") : "-",
            ]
        });
        _ += `\n\n${hash(level+1)} ${$("FRpk")}\n\n${objArrayToTable(headers, values)}`;
    }
    if(wiki.applies?.length > 0) {
        var headers = []
        var t = "";
        for(var i = 0; i < wiki.applies.length; i++) {
            t+= `| ${wiki.applies[i].title} | ${wiki.applies[i].apply ? $("ano") : "-"} |\n`;
        }
        _ += `\n\n${hash(level+1)} ${$("NizL")}\n\n${t}`;

    }
    return _;
}

const hash = function(level) {
    var h = "";
    for(var i = 0; i < level; i++) {
        h += "#";
    }
    return h;
}

function objArrayToTable(headers, values) {
    var t = "|";
    headers.forEach(h => t+= ` ${h} |`);
    t += "\n|";
    headers.forEach(h => t += ` --- |`);
    values.forEach(function(v){ 
        t += "\n|";
        v.forEach(_ => t += ` ${_} |`)
    });
    return t;
}

module.exports = {
    VectorMarkdown: VectorMarkdown
}