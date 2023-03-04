# Dokumentace statistických metod matic

Maticové metody představují statistické metody, které je možné provádět nad danou maticí. Obecně je lze volat dvě způsoby: buďto přímo (např. {Matrix}.correlPearson(0,1), nebo pomocí obecné metody 'analyze', např. {Matrix}.analyze('correlPearson').run(0,1). Rozdíl mezi první a druhým způsobem spočívá v tom, že u první metody dotneme čistý výsledek (u daného příkladu objekt s vlastnostmi r a p), v druhém případě dostaneme zpět celou třídy MatrixAnalysis, obsahující kromě výsledku i metadata (jako jsou informacee o vzorku, trvání výpočtu ad.) a také vstupní model, specifikaci argumentů atd. Pokud tedy potřebujete v průběhu výpočtu uchovávat metadata, je vhodné volat metody přes funkci 'analyze', kde parametr tvoří název metody.

Každá metoda má specifikované argumenty a jejich validátory. Validátory metod ověřují, zdali jsou uživatelem poskytnuté parametry v souladu s očekávanými vstupy výpočetních funkcí a v řadě případů jsou i schopné kompatibilní typy (třeba Array x Vector) překonvertovat. Validátory často fungují v několika krocích, tzn. pokud se jim nezdaří validovat vstupní hodnotu jením způsobem, mají v zásobě třeba ještě dvě další strategie konverze. Hodnota validátorů spočívá v tom, že výpočetní metoda dostane skutečně takové parametry, na základě kterých výslednou statistiku spočítá správně. 

Řada metod má specifikovaný tzv. preprocessor, což je funkce, která vstupní data výpočetních funkcí upraví na potřebný formát. Nejčastěji se jedná o to, že ze vstupních vektorů vyřadí řádky s prázdnámi hodnotami. V některých metodách ale provádí hlubší změny, např. transformaci matice dle určitého klíče (např. ANOVA). Preprocessory mají ještě jednu funkci, a to že do dat ukládají statistiky vstupního (raw) a počítaného (net) souboru.

| funkce | metoda |
| :--- | :--- |
| anovaow | [ANOVA (jednofaktorová)](#anovaow) |

## [ANOVA (jednofaktorová)](#anovaow)

Vrátí statistický protokol analýzy rozptylu jednoduchého třídění (One-way ANOVA). Metoda má dva argumenty. První tvoří řada numerických vektorů, kde minimálně jeden vektor je povinný. Druhý argument je nepovinný a představuje shlukovací faktor, tedy textovou proměnnou, která v řádcích určuje příslučnost numerického faktoru ke skupině. Pokud je zadán druhý parametr, z první skupiny vektorů je zohledňován pouze první.

### Argumenty

| id |popis |typ hodnoty |validátor |povinný |defaultní hodnota |ENUMERACE |
| :--- |:--- |:--- |:--- |:--- |:--- |:--- |
| vectors | numerický vektor(y) | numerický vektor nebo matice numerických vektorů | Ověří, zdali je argument buďto numerický vektor, jeho identifikátor nebo řada převoditelná na numerický vektor, anebo zdali se jedná o řadu numerických vektorů (resp. hodnot, které jsou buďto vektory, identifikátry nebo hodnoty převoditelné na numerické vektory - v libovolné kombinace). Pokud se ani jedna z variant nezdaří, vyhodí chybu. | ✔️ |  |
| factor | numerický vektor |  | Ověří, zdali je argument typu vektor, nebo zdali se jedná o validní identifkátor vektoru v matice, nebo - pokud je argument typu array - se pokusí řadu pomocí funkce 'vectorify' převést na vektor. Pokud se ani jedna z variant nezdaří, vyhodí chybu. |  |  |

### Preprocessor

Pokud argumenty specifikují faktorovou proměnnou (druhý argument), rozloží se první argument (buďto numerický vektor nebo první vektor v matici, poku je prvním argumentem matice) dle hodnot faktoru do nové matice. Pokud jsou argumenty bez faktoru (tedy druhý argument je prázdný), vezme první dva vektory z prvního argumentu 'vectors' (matice) a následně odstraní řádky s prázdnými hodnotami.V případě, že není zadán argument 'factor' a argument 'vectors' zároveň obsahuje pouze jediný vektor nebo je sám numerickým vektorem, vyhodí chybu (bez faktoru jsou třeba alespoň dva numerický vektory v prvním argumentu).

### Příklady syntaxe

#### 



```js
var M = new Matrix(
new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("x"),
new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("y"),
new NumericVector(275,282,300,280,275,260,275,271,277,263,246,281,270).name("z")
);
var anova = M.analyze("anovaow").run({vectors: [0,1,2]});
```

### Schéma výstupu

```mermaid
anovaow --> F[F test <br>!</br>]
anovaow --> P2[P2 (koeficient závislosti) <br>!</br>]
anovaow --> p[p <br>!</br>]
anovaow --> n[počet případů <br>!</br>]
anovaow --> ANOVA(statistiky ANOVA)
ANOVA --> totalOfGroups[celkem skupin <br>!</br>]
ANOVA --> betweenGroups(meziskupinové efekty)
betweenGroups --> sumOfSquares[suma čtverců <br>!</br>]
betweenGroups --> df[stupně volnosti <br>!</br>]
ANOVA --> withinGroups(vnitroskupinové efekty)
withinGroups --> sumOfsquares[suma čtverců <br>!</br>]
withinGroups --> df[stupně volnosti <br>!</br>]
ANOVA --> total(celkem)
total --> sumOfSquares[suma čtverců <br>!</br>]
total --> df[stupně volnosti <br>!</br>]

```