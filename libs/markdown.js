var $ = require("./locale").call;

function VectorMarkdown(wiki, level = 1) {
    console.dir(wiki);
    var _ = `${hash(level)} ${wiki.name.toUpperCase()}`;
    if(wiki.description) _ += `\n\n${wiki.description}`;
    if(wiki.filter) {
        _ += `\n\n${hash(level+1)} ${$("VVSN")}\n\n${wiki.filter}`;
    }
    if(wiki.arguments?.length > 0) {
        _ += `\n\n${hash(level+1)} ${$("FRpk")}`;
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

module.exports = {
    VectorMarkdown: VectorMarkdown
}