# Matice

Bablablablabla.

## Statistické metody

| funkce | metoda |
| :---: |  :---: | 
| [correlPearson](#correlPearson) | Pearsonův korelační koeficient |
| [correlSpearman](#correlSpearman) | Spearmanův korelační koeficient |
| [correlKendall](#correlKendall) | Kendallovo Tau-b |
| [correlPartial](#correlPartial) | parciální korelace |
| [correlBiserial](#correlBiserial) | biseriální korelace |
| [ttestind](#ttestind) | T-test (nezávislý) |
| [ttestpair](#ttestpair) | T-test (párový) |
| [anovaow](#anovaow) | ANOVA (jednofaktorová) |
| [mwu](#mwu) | Mann-Whitneyho test |
| [genreg](#genreg) | lineární regrese |
| [contingency](#contingency) | kontingence |

---

### [PEARSONŮV KORELAČNÍ KOEFICIENT](#correlPearson): correlPearson

Vrátí statistický protokol Pearsonova korelačního koeficientu.
Pearsonova korelace je statistická metoda, která se používá k měření vztahu mezi dvěma veličinami. Jejím cílem je zjistit, zda existuje lineární vztah mezi těmito veličinami a jaký je jeho intenzita.
Pearsonova korelace se vypočítá pomocí vzorce, který se nazývá Pearsonův koeficient korelace. Tento koeficient se pohybuje v rozmezí od -1 do 1 a udává, jak silně je mezi veličinami vztah. Pokud je koeficient blízký -1, znamená to, že mezi veličinami je silný negativní vztah, což znamená, že když se hodnota jedné veličiny zvyšuje, hodnota druhé veličiny klesá. Naopak pokud je koeficient blízký 1, znamená to, že mezi veličinami je silný pozitivní vztah, což znamená, že když se hodnota jedné veličiny zvyšuje, hodnota druhé veličiny také roste. Pokud je koeficient blízký 0, znamená to, že mezi veličinami není žádný vztah nebo je vztah velmi slabý.
Pearsonova korelace se používá především k porovnávání dvou kvantitativních veličin, tj. veličin, které jsou měřitelné na škále s přesnými hodnotami (například věk, výška nebo hmotnost). Může se použít k určení, zda existuje vztah mezi těmito veličinami a jaký je jeho charakter. Například může být Pearsonova korelace použita k porovnání věku a hmotnosti a zjistit, zda existuje vztah mezi těmito veličinami a jaký je jeho charakter. Může se také použít k porovnání výsledků dvou různých testů a zjistit, zda existuje vztah mezi výsledky těchto testů. Zdroj: https://chat.openai.com/chat

#### Způsob volání metody

> [Matrix instance].**correlPearson**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Pearsonův korelační koeficient* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js
var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 2]);
var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
var correl = new Matrix(a,b).correlPearson(a,b);
/*
{
"r": 0.8424242424242424,
"n": 10,
"p": 0.0022200000000001108
}
*/
```

---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlSpearman): correlSpearman

jAGi

#### Způsob volání metody

> [Matrix instance].**correlSpearman**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Spearmanův korelační koeficient* `🔴 číslo`
  - **df**: *stupně volnosti* `🔴 celé číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js
var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 1]);
var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
var M = new Matrix(a,b).correlSpearman(a,b);
/*
{
"r": 0.8575757575757575,
"n": 10,
"p": 0.0015199999999999658
}
*/
```

---

### [KENDALLOVO TAU-B](#correlKendall): correlKendall

Vrátí statistický protokol Kendallova korelačního koeficientu Tau-B. Pokud byste tutéž operaci počítali v SPSS, patrně dostanete mírně odlišný výsledek. Podle všeho je to vlivem odlišné citlivosti na desetinná místa u obou systémů. Na interpretaci výsledku by to nicméně zásadní vliv mít nemělo.

#### Způsob volání metody

> [Matrix instance].**correlKendall**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **taub**: *Tau-b* `🔴 číslo`
  - **taua**: *Tau-a* `🔴 číslo`
  - **df**: *stupně volnosti* `🔴 celé číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js
var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 1]);
var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
var M = new Matrix(a,b).correlKendall(a,b);
/*
{
"r": 0.7111111111111111,
"n": 10,
"p": 0.004207551285491773
}
*/
```

---

### [PARCIÁLNÍ KORELACE](#correlPartial): correlPartial

Parciální korelace je statistická metoda, která vám umožňuje zjistit, jaký je vztah mezi dvěma proměnnými, přičemž se zohlední vliv třetí proměnné. To je užitečné, pokud chcete zjistit, zda existuje přímý vztah mezi dvěma proměnnými, aniž byste byli ovlivněni vlivem jiných proměnných. Například, pokud chcete zjistit, zda existuje vztah mezi úrovní školení a úspěšností v práci, může být užitečné zohlednit také vliv věku nebo pohlaví. V takovém případě byste mohli použít parciální korelaci k zjištění vztahu mezi úrovní školení a úspěšností v práci při zohlednění vlivu věku a pohlaví. Parciální korelace se počítá pomocí vzorce, který se odvíjí od korelačního koeficientu Pearsona. Je důležité si uvědomit, že parciální korelace neznamená causaci, tj. že jedna proměnná nezpůsobuje druhou, ale pouze ukazuje, že existuje mezi nimi určitá souvislost. Zdroj: https://chat.openai.com/chat.

#### Způsob volání metody

> [Matrix instance].**correlPartial**(***první proměnná***, ***druhá proměnná***, ***třetí (kontrolní) proměnná***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **z** | třetí (kontrolní) proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Pearsonův korelační koeficient* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js
var x = new NumericVector(2,3,4,5,6,7,8,9,10,11);
var y = new NumericVector(3,5,4,6,5,7,8,9,1,11);
var z = new NumericVector(-5,-4,1,2,3,-2,6,8,10,12);
var partial = new Matrix(x,y,z).correlPartial(0,1,2);
/*
{
"r": 0.3222896122166014,
"n": 10,
"p": 0.39764
}
*/
```

---

### [BISERIÁLNÍ KORELACE](#correlBiserial): correlBiserial

Biseriální korelace je statistická metoda, která se používá k vyhodnocení vztahu mezi dvěma binárními proměnnými (tj. proměnnými, které mohou mít pouze dvě možné hodnoty, například 'ano' nebo 'ne'). Binární proměnné se často používají v sociálních vědách, například při zkoumání vztahu mezi vzděláním a zaměstnáním nebo mezi kouřením a zdravím. Biseriální korelace se počítá pomocí vzorce, který se odvíjí od korelačního koeficientu Pearsona. Je důležité si uvědomit, že biseriální korelace neznamená causaci, tj. že jedna proměnná nezpůsobuje druhou, ale pouze ukazuje, že existuje mezi nimi určitá souvislost.

#### Způsob volání metody

> [Matrix instance].**correlBiserial**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [🟣] binární vektor | Ověří, zdali je hodnota typu binárního vektoru. V opačném případě vyvolá chybu. | ✔️ |  |
| **y** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Pearsonův korelační koeficient* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js

```

---

### [T-TEST (NEZÁVISLÝ)](#ttestind): ttestind

Vrátí statistický protokol Studentova t-testu pro dva nezávislé výběry, které jsou definovány vlastní proměnnou (tedy dvěma numerickými vektory). Argumenty tvoří buď dva numerické vektory, nebo jeden numerický a jen faktorový vektor (obvykle text, ale může být i numerický či binární). Pokud je použit jako faktor vektor, který má více než dvě unikátní hodnoty, jsou pro test uvažovány pouze první dvě unikátní nalezené hodnoty (ostatní se ignorují) - v takovém případě je informace o velikosti čistého vzorku nepodstatná, nicméně hladina významnosti, do které velikost vzorku vstupuje, je již založena na čistých případech.

#### Způsob volání metody

> [Matrix instance].**ttestind**(***první proměnná***, *druhá proměnná*)


#### Automatický filtr hodnot

Odstraní z vektorů prázdné hodnoty, aniž by odstranění řádku v jednom vektoru ovlivnilo jiný vektor.

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | první proměnná | 🔢 matice | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **t**: *hodnota testu T* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **df**: *stupně volnosti* `🔴 celé číslo`

#### Příklad

```js
var M = new Matrix([],[]).ttestind(0,1);
```

---

### [T-TEST (PÁROVÝ)](#ttestpair): ttestpair

Vrátí statistický protokol párového t-testu pro dva závislé výběry. Prázdné hodnoty jsou vyřezeny v průřezu řádků, tzn. že pokud v jednom řádku chybí alespoň jedna hodnota, je z analýzy vyřezen celý řádek.

#### Způsob volání metody

> [Matrix instance].**ttestpair**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **t**: *hodnota testu T* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **df**: *stupně volnosti* `🔴 celé číslo`

#### Příklad

```js
var test = new Matrix([2,3,2,4,5], [9,8,7,9,10]).ttestpair(0,1);
/*
{
"t": -13.500000000000025,
"p": 0,
"n": 5,
"mx": 3.2,
"my": 8.6
}
*/
```

---

### [ANOVA (JEDNOFAKTOROVÁ)](#anovaow): anovaow

Vrátí statistický protokol analýzy rozptylu jednoduchého třídění (One-way ANOVA). Metoda má dva argumenty. První tvoří řada numerických vektorů, kde minimálně jeden vektor je povinný. Druhý argument je nepovinný a představuje shlukovací faktor, tedy textovou proměnnou, která v řádcích určuje příslučnost numerického faktoru ke skupině. Pokud je zadán druhý parametr, z první skupiny vektorů je zohledňován pouze první.

#### Způsob volání metody

> [Matrix instance].**anovaow**(***vektor/y***, *skupinový faktor*)


#### Automatický filtr hodnot

Odstraní z vektorů prázdné hodnoty, aniž by odstranění řádku v jednom vektoru ovlivnilo jiný vektor.

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | vektor/y | 🔢 matice | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | skupinový faktor | 🔢 matice | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *ANOVA (jednofaktorová)* `🟦 objekt`
  - **F**: *F test* `🔴 číslo`
  - **P2**: *P2 (koeficient závislosti)* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **n**: *počet případů* `🔴 celé číslo`
  - **ANOVA**: *statistiky ANOVA* `🟦 objekt`
    - **totalOfGroups**: *celkem skupin* `🔴 celé číslo`
    - **betweenGroups**: *meziskupinové efekty* `🟦 objekt`
      - **sumOfSquares**: *suma čtverců* `🔴 číslo`
      - **df**: *stupně volnosti* `🔴 celé číslo`
    - **withinGroups**: *vnitroskupinové efekty* `🟦 objekt`
      - **sumOfsquares**: *suma čtverců* `🔴 číslo`
      - **df**: *stupně volnosti* `🔴 celé číslo`
    - **total**: *celkem* `🟦 objekt`
      - **sumOfSquares**: *suma čtverců* `🔴 číslo`
      - **df**: *stupně volnosti* `🔴 celé číslo`

#### Příklad

```js
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow(0,1,2);
/* OR */
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow();
/* OR */
var M = new Matrix([2,3,2,4,5,9,8,7,9,10,1,7,19,32,90],[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3]).pivot(0,1).anovaow();
/*
{
"F": 2.3227069789300536,
"P2": 0.2790807107363349,
"p": 0.1403847313472082,
"n": 15,
"ANOVA": {
"totalOfGroups": 3,
"betweenGroups": {
"sumOfSquares": 1976.9333333333336,
"df": 2
},
"withinGroups": {
"sumOfsquares": 5106.800000000001,
"df": 12
},
"total": {
"sumOfSquares": 7083.7333333333345,
"df": 14
}
}
}
*/
```

---

### [MANN-WHITNEYHO TEST](#mwu): mwu

Vrátí statistický protokol Mann-Whitneyho U testu. Jedná se o neparametrický test nulové hypotézy, která srsovnává náhodně vybrané hodnoty X a Y ze dvou populací, přičemž pravděpodobnost, že X bude větší než Y, se rovná pravděpodobnosti, že Y bude větší než X.

#### Způsob volání metody

> [Matrix instance].**mwu**(***první proměnná***, *druhá proměnná*)


#### Automatický filtr hodnot

Odstraní z vektorů prázdné hodnoty, aniž by odstranění řádku v jednom vektoru ovlivnilo jiný vektor.

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | první proměnná | 🔢 matice | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | druhá proměnná | 🟤 cokoliv | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **U**: *U test* `🔴 číslo`
  - **Z**: *Z test* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js
var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).mwu();
```

---

### [LINEÁRNÍ REGRESE](#genreg): genreg

Lineární regrese je statistická metoda používaná k nalezení vztahu mezi dvěma spojitými proměnnými. Tyto proměnné jsou obvykle označeny jako závislá proměnná a nezávislá proměnná. Cílem lineární regrese je najít nejlepší lineární aproximaci závislé proměnné v závislosti na nezávislé proměnné. Lineární regrese se používá k predikci hodnoty závislé proměnné pro danou hodnotu nezávislé proměnné, když mezi nimi existuje lineární vztah. Tento vztah je reprezentován pomocí rovnice lineární regrese, která popisuje, jak se hodnoty závislé proměnné mění v závislosti na hodnotách nezávislé proměnné. Lineární regrese je často používána v různých oblastech, jako je ekonomie, sociologie, biologie, psychologie, inženýrství a dalších.

Metoda umožňuje upřesnit, pro jakou transformaci modelu (např. lineární, logaritmovanou) hledáme koeficient determinace.

#### Způsob volání metody

> [Matrix instance].**genreg**(***nezávislá proměnná (x)***, ***závislá proměnná (y)***, ***regresní model***)


#### Automatický filtr hodnot

Vybere všechna data z původní matice (tj. žádná filtrace).

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **independent** | nezávislá proměnná (x) | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **dependent** | závislá proměnná (y) | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **model** | regresní model | 🟤 cokoliv | Ověří, zdali je hodnota platným členem enumerace. V opačném případě vyvolá chybu. | ✔️ | 1 |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **model**: *regresní model* `🟡 text`
  - **r2**: *R2 (koeficient determinace)* `🔴 číslo`
  - **r**: *Pearsonův korelační koeficient* `🔴 číslo`
  - **F**: *F test* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **beta0**: *beta0 (konstanta)* `🔴 číslo`
  - **beta1**: *beta1 (koeficient)* `🔴 číslo`

#### Příklad

```js

```

---

### [KONTINGENCE](#contingency): contingency

Vrátí statistický protokol kontingence. Parametry metody jsou a) řádková proměnná, b) sloupcová proměnná a volitelně c) četnost skupiny a/b (pokud je prázdná, bere se, že četnost průniku je 1). Výstupem metody jsou jak statistiky kontingence (chí^2), Cramérovo V, Pearsonovo C, ad).

#### Způsob volání metody

> [Matrix instance].**contingency**(***řádková proměnná***, ***sloupcová proměnná***, *proměnná četnosti*)


#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | řádková proměnná | 🟤 cokoliv | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | sloupcová proměnná | 🟤 cokoliv | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **n** | proměnná četnosti | [🔴] numerický vektor | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *kontingence* `🟦 objekt`
  - **phi**: *chí^2 test* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **df**: *stupně volnosti* `🔴 celé číslo`
  - **C**: *Pearsonovo C* `🔴 číslo`
  - **V**: *Cramérovo V* `🔴 číslo`

#### Příklad

```js
var a = new StringVector("A","A","A","B","B","B","C","C","C","C");
var b = new StringVector("X","Y","X","Y","X","Y","X","Y","X","Y");
var n = new NumericVector(5,6,4,5,7,3,9,3,4,6);
var m = new Matrix(a,b,n);
var c1 = m.contingency(a,b);
/*
{

}
*/
var c2 = m.continency(a,b,n);
/*
{

}
*/
```