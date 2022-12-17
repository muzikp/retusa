//https://gist.github.com/rxaviers/7360908
var $ = require("./locale").call;

var e_yes = ":heavy_check_mark:" //":white_check_mark:";
var e_no = "" // ":no_entry_sign:"

function VectorMarkdown(wiki, level = 1) {
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
        _ += `\n\n${hash(level+1)} ${$("NizL")}\n\n${objArrayToTable([$("AfXp"), $("picU")], wiki.applies.map(v => [v.title, v.apply ? e_yes : e_no]))}`;

    }
    if(wiki.example) {
        _ += `\n\n${hash(level+1)} ${$("nzmJ")}\n\n\`\`\`js\n${wiki.example}\n\`\`\``;
    }
    return _;
}

function VectorOverview(Models) {
    var models = Object.entries(Models).map(x => x[1]);
    var _ = "# Vektor\n\nVektor (řada) je základní entitou statistické analýzy. Třída Vector se v aplikaci využívá výhradně skrze zděděné třídy (NumericVector atd.), které zajišťují validaci jednotlivých hodnot řady (např. do NumericVector instance nelze přidat hodnotu 'nazdar').";
    _ += "\n\n## Statistické metody\n\n";
    _ += objArrayToTable([$("wRbe"),$("rlTY"),$("zPyP"),$("LOYN"),$("zoiB"),$("OkoC")],models.map(function(m) { 
        var row = [
            `[${m.wiki.name}](#${m.wiki.name})`,
            m.wiki.title,
            m.wiki.description,
            m.wiki.applies[0].apply ? e_yes : e_no,
            m.wiki.applies[1].apply ? e_yes : e_no,
            m.wiki.applies[2].apply ? e_yes : e_no,
        ];
        return row;
    }));
    models.forEach(function(m) {
        _ += "\n\n\---\n\n" + VectorMarkdown(m.wiki, 3);
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
    VectorOverview: VectorOverview,
    VectorMarkdown: VectorMarkdown
}