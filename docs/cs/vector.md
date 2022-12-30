# Vektor

Vektor (řada) je základní entitou statistické analýzy. Třída Vector se v aplikaci využívá výhradně skrze zděděné třídy (NumericVector atd.), které zajišťují validaci jednotlivých hodnot řady (např. do NumericVector instance nelze přidat hodnotu 'nazdar').

## Statistické metody

| funkce | metoda | popis | numerický | nominální | binární |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| [avg](#avg) | [aritmetický průměr](#avg) | Vrátí arytmetický průměr z neprázdných hodnot. | ✔️ | - | - |
| [count](#count) | [počet](#count) | Vrátí počet všech polí ve vektoru (včetně prázdných). | ✔️ | ✔️ | ✔️ |
| [frequency](#frequency) | [frekvenční tabulka](#frequency) | Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností. | ✔️ | ✔️ | ✔️ |
| [geomean](#geomean) | [geometrický průměr](#geomean) | Vrátí geometrický průměr z neprázdných hodnot. Je vždy menší nebo rovný než průměr arytmetický. | ✔️ | - | - |
| [harmean](#harmean) | [harmonický průměr](#harmean) | Vrátí harmonický průměr z neprázdných hodnot. Harmonický průměr je vždy menší než průměr geometrický, tedy i než průměr arytmetický. Používá se např. při výpočtu průměrné rychlosti. | ✔️ | - | - |
| [histogram](#histogram) | [histogram](#histogram) | Vrátí matici histogramu daného vektoru. | ✔️ | - | - |
| [kstest](#kstest) | [Kolmogorov-Smirnovův test](#kstest) | Vrátí statistický protokol Komogorov-Smirnovova testu normality rozdělení hodnot vektoru. Aktuálně nepočítá hladinu významnosti testu. Kolmogorov-Smirnov test (často také zkracovaný jako K-S test) je statistický test, který se používá k testování hypotézy, že data pocházejí z určitého rozdělení. Tento test porovnává rozdělení dat s teoretickým rozdělením, které se předpokládá, že data vycházejí, a vyhodnocuje, zda jsou datové hodnoty s teoretickým rozdělením dostatečně blízko, aby se mohla hypotéza o tom, že data pocházejí z daného rozdělení, považovat za pravdivou.Test Kolmogorov-Smirnov se často používá k ověření normality dat, ale může být také použit k ověření, zda data pocházejí z jiného teoretického rozdělení, jako je například exponenciální nebo binomické rozdělení. Test Kolmogorov-Smirnov je obecně považován za jeden z nejpřesnějších testů normality, ale má omezenou citlivost pro malé vzorky, tj. pro malé vzorky může být méně spolehlivý při detekci ne-normality. Pro malé vzorky se proto často používají jiné testy normality, jako například test Shapiro-Wilk nebo test Anderson-Darling. | ✔️ | - | - |
| [kurtosis](#kurtosis) | [špičatost](#kurtosis) | Vrátí hodnotu excesu množiny dat. Ve statistice špičatost (kurtosis) označuje míru, jak moc se hodnoty v sbírce dat liší od průměrné hodnoty. Špičatost se obvykle počítá pro křivku rozdělení dat, která je grafickým zobrazením rozložení hodnot v dané sbírce dat.
Existují dva základní typy špičatosti: platykurtóza a leptokurtóza. Platykurtóza se vyskytuje, když hodnoty v sbírce dat jsou rozloženy víceméně rovnoměrně kolem průměrné hodnoty. Toto rozložení se projevuje jako křivka rozdělení tvaru "písmene U", která má plochý vrchol. Naopak leptokurtóza se vyskytuje, když hodnoty v sbírce dat jsou rozloženy s výraznou odchylkou od průměrné hodnoty. Toto rozložení se projevuje jako křivka rozdělení tvaru "písmene špičatého kopce" nebo "písmene špičatého údolí".
Špičatost se používá k určení, zda je rozložení hodnot v sbírce dat víceméně rovnoměrné, nebo zda existují nějaké výrazné odchylky od průměrné hodnoty. Špičatost se často používá spolu s dalšími metrikami, jako je medián, šikmost a kvantily, které vám pomohou lépe porozumět rozložení dat a určit, zda existují nějaké výrazné odchylky od průměrné hodnoty. | ✔️ | - | - |
| [max](#max) | [maximální hodnota](#max) | Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení. | ✔️ | ✔️ | ✔️ |
| [mci](#mci) | [interval spolehlivosti průměru](#mci) | Vrátí statistický protokol odhadu intervalu spolehlivosti průměru výběrového souboru při určité hladině významnosti. Pokud je počet případů menší než 30, je použito Studentovo T-rozdělení, jinak je použito standardizované normální rozdělení. | ✔️ | - | - |
| [median](#median) | [medián](#median) | Vrátí střední hodnotu z neprázdných hodnot. | ✔️ | - | - |
| [min](#min) | [minimální hodnota](#min) | Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení. | ✔️ | ✔️ | ✔️ |
| [mode](#mode) | [modus](#mode) | Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu). | ✔️ | ✔️ | ✔️ |
| [pci](#pci) | [interval spolehlivosti podílu](#pci) | Vrátí statistický protokol odhadu intervalu spolehlivosti podílu výběrového souboru při určité hladině významnosti. | ✔️ | ✔️ | ✔️ |
| [percentile](#percentile) | [percentil](#percentile) | Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru. | ✔️ | - | - |
| [range](#range) | [variační rozpětí](#range) | Vrátí rozdíl největší a nejmenší neprázdné hodnoty. | ✔️ | - | - |
| [sem](#sem) | [střední chyba průměru](#sem) | Vrátí hodnotu směrodatné chyby odhadu průměru. | ✔️ | - | - |
| [shapirowilk](#shapirowilk) | [Shapirův-Wilkův W test](#shapirowilk) | Vrátí statistický protokol Shapiro-Wilkova W testu normality rozdělení hodnot vektoru. Shapiro-Wilk test je statistický test, který se používá k testování hypotézy, že data pocházejí z normálního rozdělení. Tento test je často používán k ověření normality dat v rámci statistické analýzy. Test Shapiro-Wilk se zakládá na porovnání hodnoty kvartilů dat s hodnotami kvartilů normálního rozdělení. Když jsou hodnoty kvartilů dat podobné hodnotám kvartilů normálního rozdělení, je pravděpodobné, že data pocházejí z normálního rozdělení. V opačném případě je pravděpodobné, že data nejsou normální. Při použití testu Shapiro-Wilk je třeba si uvědomit, že tento test má nízkou citlivost pro velké vzorky, tj. pro velké vzorky může být test méně spolehlivý při detekci ne-normality. Proto se pro velké vzorky často používají jiné testy normality, jako například test Anderson-Darling nebo test Kolmogorov-Smirnov. | ✔️ | - | - |
| [skewness](#skewness) | [šikmost](#skewness) | Vrátí zešikmení rozdělní: charakteristika a asymetrie rozdělení kolem střední hodnoty vektoru.  | ✔️ | - | - |
| [stdev](#stdev) | [směrodatná odchylka](#stdev) | Vrátí směrodatnou odchylku neprázdných hodnot. Směrodatná odchylka je statistický ukazatel, který udává, jak moc se hodnoty v daném souboru dat od sebe liší. Směrodatná odchylka je vyjádřena jako číslo, které udává, o kolik se průměrná hodnota odchýlí od skutečné hodnoty v daném souboru dat. Směrodatná odchylka je užitečná při porovnávání velikosti rozptýlení dat v různých souborech nebo v různých skupinách v rámci jednoho souboru dat. Čím je směrodatná odchylka větší, tím více se hodnoty v daném souboru dat od sebe liší. | ✔️ | - | - |
| [sum](#sum) | [součet](#sum) | Vrátí součet všech neprázdných číselných hodnot vektoru. | ✔️ | - | - |
| [ttest](#ttest) | [jednovýběrový t-test](#ttest) | Vrátí statistický protokol pro jednovýběrový t-test při zadání populačního průměru. | ✔️ | - | - |
| [varc](#varc) | [variační koeficient](#varc) | Vrátí hodnotu variačního koeficientu neprázdných hodnot. | ✔️ | - | - |
| [variance](#variance) | [rozptyl](#variance) | Vrátí hodnotu rozptylu tohoto vektoru. | ✔️ | - | - |

---

### [ARITMETICKÝ PRŮMĚR](#avg): avg

Vrátí arytmetický průměr z neprázdných hodnot. [Zjistit více.](https://en.wikipedia.org/wiki/Arithmetic_mean)

#### Způsob volání metody


> (NumericVector).<mark>**avg**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 75 */
```

---

### [POČET](#count): count

Vrátí počet všech polí ve vektoru (včetně prázdných).

#### Způsob volání metody


> (NumericVector).<mark>**count**()

> (StringVector).<mark>**count**()

> (BooleanVector).<mark>**count**()


#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | ✔️ |
| binární | ✔️ |

#### Struktura vrácené hodnoty

- *celé číslo větší nebo rovné nule* `c celé číslo`

#### Příklad

```js
var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
```

---

### [FREKVENČNÍ TABULKA](#frequency): frequency

Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností. [Zjistit více.](https://en.wikipedia.org/wiki/Frequency_(statistics))

#### Způsob volání metody


> (NumericVector).<mark>**frequency**(*způsob řazení dat tabulky*)

> (StringVector).<mark>**frequency**(*způsob řazení dat tabulky*)

> (BooleanVector).<mark>**frequency**(*způsob řazení dat tabulky*)


#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **order** | způsob řazení dat tabulky | c celé číslo | Ověří, zdali je hodnota platným členem enumerace. V opačném případě vyvolá chybu. | - | 1 |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | ✔️ |
| binární | ✔️ |

#### Struktura vrácené hodnoty

- *frekvenční tabulka* `🟩 řada`
  - **value**: *hodnota* `🟤 cokoliv`
  - **frequency**: *četnost* `c celé číslo`

#### Příklad

```js
var numeric_vector_no_order = new NumericVector(5,2,3,2,3,3,1,6,3).frequency();
/*
┌─────────┬───────┬───────────┐
│ (index) │ value │ frequency │
├─────────┼───────┼───────────┤
│    0    │   1   │     1     │
│    1    │   2   │     2     │
│    2    │   3   │     4     │
│    3    │   5   │     1     │
│    4    │   6   │     1     │
└─────────┴───────┴───────────┘
*/
var string_vector_desc_value = new StringVector("E","B","C","B","C","C","A","F","C").frequency(3);
/*
┌─────────┬───────┬───────────┐
│ (index) │ value │ frequency │
├─────────┼───────┼───────────┤
│    0    │  'F'  │     1     │
│    1    │  'A'  │     1     │
│    2    │  'C'  │     4     │
│    3    │  'B'  │     2     │
│    4    │  'E'  │     1     │
└─────────┴───────┴───────────┘
*/
var boolean_vector_desc_frequency = new BooleanVector(true, false, null, true, null, null).frequency(4);
/*
┌─────────┬─────────┬───────────┐
│ (index) │  value  │ frequency │
├─────────┼─────────┼───────────┤
│    0    │  null   │     3     │
│    1    │ 'true'  │     2     │
│    2    │ 'false' │     1     │
└─────────┴─────────┴───────────┘
*/
```

---

### [GEOMETRICKÝ PRŮMĚR](#geomean): geomean

Vrátí geometrický průměr z neprázdných hodnot. Je vždy menší nebo rovný než průměr arytmetický. [Zjistit více.](https://en.wikipedia.org/wiki/Geometric_mean)

#### Způsob volání metody


> (NumericVector).<mark>**geomean**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).geomean(); /* = 21.24*/
```

---

### [HARMONICKÝ PRŮMĚR](#harmean): harmean

Vrátí harmonický průměr z neprázdných hodnot. Harmonický průměr je vždy menší než průměr geometrický, tedy i než průměr arytmetický. Používá se např. při výpočtu průměrné rychlosti. [Zjistit více.](https://en.wikipedia.org/wiki/Harmonic_mean)

#### Způsob volání metody


> (NumericVector).<mark>**harmean**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var x = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).harmean(); /* = 21.03*/
```

---

### [HISTOGRAM](#histogram): histogram

Vrátí matici histogramu daného vektoru. [Zjistit více.](https://en.wikipedia.org/wiki/Histogram)

#### Způsob volání metody


> (NumericVector).<mark>**histogram**(*Maximální počet intervalů*, *Pevná velikost intervalu*)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **maxIntervals** | Maximální počet intervalů | 🔴 číslo | Ověří, zdali se jedná o celé kladné číslo. V opačném případě vyvolá chybu. | - |  |
| **fixedInterval** | Pevná velikost intervalu | 🔴 číslo | Ověří, zdali se jedná o číselnou hodnotu větší než nula. V opačném případě vyvolá chybu. | - |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *histogram* `🟩 řada`
  - **from**: *spodní mez intervalu* `🔴 číslo`
  - **to**: *horní mez intervalu* `🔴 číslo`
  - **i**: *interval (slovní vyjádření)* `🟡 text`
  - **n**: *četnost (abs.)* `c celé číslo`
  - **nc**: *kumulativní četnost (abs.)* `c celé číslo`
  - **p**: *četnost (%)* `🔴 číslo`
  - **pc**: *kumulativní četnost (%)* `🔴 číslo`

#### Příklad

```js
var score = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1);
var h1 = score.histogram();
/*
┌─────────┬───────────────────┬───────────────────┬─────────────────┬───┬────┬────────┬────────┐
│ (index) │       from        │        to         │        i        │ n │ nc │   p    │   pc   │
├─────────┼───────────────────┼───────────────────┼─────────────────┼───┼────┼────────┼────────┤
│    0    │         1         │       3.025       │  '1.00 - 3.00'  │ 1 │ 1  │ 0.0625 │ 0.0625 │
│    1    │       3.025       │       5.05        │  '4.00 - 5.00'  │ 3 │ 4  │ 0.1875 │  0.25  │
│    2    │       5.05        │ 7.074999999999999 │  '6.00 - 7.00'  │ 7 │ 11 │ 0.4375 │ 0.6875 │
│    3    │ 7.074999999999999 │        9.1        │  '8.00 - 9.00'  │ 5 │ 16 │ 0.3125 │   1    │
│    4    │        9.1        │      11.125       │ '10.00 - 11.00' │ 1 │ 17 │ 0.0625 │ 1.0625 │
└─────────┴───────────────────┴───────────────────┴─────────────────┴───┴────┴────────┴────────┘
*/
var h2 = score.histogram(4)
/*
┌─────────┬───────────────────┬───────────────────┬─────────────────┬───┬────┬────────┬────────┐
│ (index) │       from        │        to         │        i        │ n │ nc │   p    │   pc   │
├─────────┼───────────────────┼───────────────────┼─────────────────┼───┼────┼────────┼────────┤
│    0    │         1         │       3.025       │  '1.00 - 3.00'  │ 1 │ 1  │ 0.0625 │ 0.0625 │
│    1    │       3.025       │       5.05        │  '4.00 - 5.00'  │ 3 │ 4  │ 0.1875 │  0.25  │
│    2    │       5.05        │ 7.074999999999999 │  '6.00 - 7.00'  │ 7 │ 11 │ 0.4375 │ 0.6875 │
│    3    │ 7.074999999999999 │        9.1        │  '8.00 - 9.00'  │ 5 │ 16 │ 0.3125 │   1    │
└─────────┴───────────────────┴───────────────────┴─────────────────┴───┴────┴────────┴────────┘
*/
var h3 = score.histogram(null, 2)
/*
┌─────────┬──────┬────┬────────────────┬───┬────┬────────┬────────┐
│ (index) │ from │ to │       i        │ n │ nc │   p    │   pc   │
├─────────┼──────┼────┼────────────────┼───┼────┼────────┼────────┤
│    0    │  1   │ 3  │ '1.00 - 3.00'  │ 1 │ 1  │ 0.0625 │ 0.0625 │
│    1    │  3   │ 5  │ '3.00 - 5.00'  │ 3 │ 4  │ 0.1875 │  0.25  │
│    2    │  5   │ 7  │ '5.00 - 7.00'  │ 7 │ 11 │ 0.4375 │ 0.6875 │
│    3    │  7   │ 9  │ '7.00 - 9.00'  │ 4 │ 15 │  0.25  │ 0.9375 │
│    4    │  9   │ 11 │ '9.00 - 11.00' │ 1 │ 16 │ 0.0625 │   1    │
└─────────┴──────┴────┴────────────────┴───┴────┴────────┴────────┘
*/
```

---

### [KOLMOGOROV-SMIRNOVŮV TEST](#kstest): kstest

Vrátí statistický protokol Komogorov-Smirnovova testu normality rozdělení hodnot vektoru. Aktuálně nepočítá hladinu významnosti testu. Kolmogorov-Smirnov test (často také zkracovaný jako K-S test) je statistický test, který se používá k testování hypotézy, že data pocházejí z určitého rozdělení. Tento test porovnává rozdělení dat s teoretickým rozdělením, které se předpokládá, že data vycházejí, a vyhodnocuje, zda jsou datové hodnoty s teoretickým rozdělením dostatečně blízko, aby se mohla hypotéza o tom, že data pocházejí z daného rozdělení, považovat za pravdivou.Test Kolmogorov-Smirnov se často používá k ověření normality dat, ale může být také použit k ověření, zda data pocházejí z jiného teoretického rozdělení, jako je například exponenciální nebo binomické rozdělení. Test Kolmogorov-Smirnov je obecně považován za jeden z nejpřesnějších testů normality, ale má omezenou citlivost pro malé vzorky, tj. pro malé vzorky může být méně spolehlivý při detekci ne-normality. Pro malé vzorky se proto často používají jiné testy normality, jako například test Shapiro-Wilk nebo test Anderson-Darling. [Zjistit více.](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test#One-sample_Kolmogorov%E2%80%93Smirnov_statistic)

#### Způsob volání metody


> (NumericVector).<mark>**kstest**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *Kolmogorov-Smirnovův test* `🟦 objekt`
  - **T**: *hodnota Kolmogorov-Smirnovova testu* `🔴 číslo`
  - **df**: *počet stupňů volnosti* `c celé číslo`
  - **p**: *hladina významnosti* `🔴 číslo`

#### Příklad

```js
var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).kstest();
/*
{
"W": 0.9664039647188553,
"df": 23,
"p": 0.6036566524076283
}
*/
```

---

### [ŠPIČATOST](#kurtosis): kurtosis

Vrátí hodnotu excesu množiny dat. Ve statistice špičatost (kurtosis) označuje míru, jak moc se hodnoty v sbírce dat liší od průměrné hodnoty. Špičatost se obvykle počítá pro křivku rozdělení dat, která je grafickým zobrazením rozložení hodnot v dané sbírce dat.
Existují dva základní typy špičatosti: platykurtóza a leptokurtóza. Platykurtóza se vyskytuje, když hodnoty v sbírce dat jsou rozloženy víceméně rovnoměrně kolem průměrné hodnoty. Toto rozložení se projevuje jako křivka rozdělení tvaru "písmene U", která má plochý vrchol. Naopak leptokurtóza se vyskytuje, když hodnoty v sbírce dat jsou rozloženy s výraznou odchylkou od průměrné hodnoty. Toto rozložení se projevuje jako křivka rozdělení tvaru "písmene špičatého kopce" nebo "písmene špičatého údolí".
Špičatost se používá k určení, zda je rozložení hodnot v sbírce dat víceméně rovnoměrné, nebo zda existují nějaké výrazné odchylky od průměrné hodnoty. Špičatost se často používá spolu s dalšími metrikami, jako je medián, šikmost a kvantily, které vám pomohou lépe porozumět rozložení dat a určit, zda existují nějaké výrazné odchylky od průměrné hodnoty. [Zjistit více.](https://en.wikipedia.org/wiki/Kurtosis)

#### Způsob volání metody


> (NumericVector).<mark>**kurtosis**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var kurtosis = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).kurtosis(); /* = 0.425*/
```

---

### [MAXIMÁLNÍ HODNOTA](#max): max

Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení.

#### Způsob volání metody


> (NumericVector).<mark>**max**()

> (StringVector).<mark>**max**()

> (BooleanVector).<mark>**max**()


#### Automatický filtr hodnot

jakákoliv neprázdná hodnota (u číselných řad akceptuje nuly, u binárních proměnných argumenty false).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | ✔️ |
| binární | ✔️ |

#### Struktura vrácené hodnoty

- *jakákoliv hodnota* `🟤 cokoliv`

#### Příklad

```js
var numeric_max = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).max(); /* = 9.1 */;
var string_max = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").max(); /* = Poisson */
```

---

### [INTERVAL SPOLEHLIVOSTI PRŮMĚRU](#mci): mci

Vrátí statistický protokol odhadu intervalu spolehlivosti průměru výběrového souboru při určité hladině významnosti. Pokud je počet případů menší než 30, je použito Studentovo T-rozdělení, jinak je použito standardizované normální rozdělení. [Zjistit více.](https://en.wikipedia.org/wiki/Confidence_interval)

#### Způsob volání metody


> (NumericVector).<mark>**mci**(*hladina významnosti*)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **confidenceLevel** | hladina významnosti | 🔴 číslo | Ověří, zdali je hodnota číslo mezi 0 a 1 (včetně hraničních hodnot). V opačném případě vyvolá chybu. | - | 0.95 |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *interval spolehlivosti průměru* `🟦 objekt`
  - **m**: *aritmetický průměr* `🔴 číslo`
  - **sig**: *hladina výzmnamnosti intervalu* `🔴 číslo`
  - **delta**: *hodnota intervalu spolehlivosti* `🔴 číslo`
  - **lb**: *spodní hranice intervalu* `🔴 číslo`
  - **ub**: *horní hranice intervalu* `🔴 číslo`

#### Příklad

```js
var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).mci(0.95);
/*
{
"m": 6.173913043478261,
"sig": 0.050000000000000044,
"delta": 1.1189603407528825,
"lb": 5.054952702725378,
"ub": 7.292873384231143
}
*/
```

---

### [MEDIÁN](#median): median

Vrátí střední hodnotu z neprázdných hodnot. [Zjistit více.](https://en.wikipedia.org/wiki/Median)

#### Způsob volání metody


> (NumericVector).<mark>**median**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var median = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).median(); /* = 21*/
```

---

### [MINIMÁLNÍ HODNOTA](#min): min

Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení.

#### Způsob volání metody


> (NumericVector).<mark>**min**()

> (StringVector).<mark>**min**()

> (BooleanVector).<mark>**min**()


#### Automatický filtr hodnot

jakákoliv neprázdná hodnota (u číselných řad akceptuje nuly, u binárních proměnných argumenty false).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | ✔️ |
| binární | ✔️ |

#### Struktura vrácené hodnoty

- *jakákoliv hodnota* `🟤 cokoliv`

#### Příklad

```js
var numeric_min = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).min(); /* = 1 */;
var string_min = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").min(); /* = Fisher */
```

---

### [MODUS](#mode): mode

Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu). [Zjistit více.](https://en.wikipedia.org/wiki/Mode_(statistics))

#### Způsob volání metody


> (NumericVector).<mark>**mode**()

> (StringVector).<mark>**mode**()

> (BooleanVector).<mark>**mode**()


#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | ✔️ |
| binární | ✔️ |

#### Struktura vrácené hodnoty

- *jakákoliv hodnota* `🟤 cokoliv`

#### Příklad

```js
var x = new NumericVector(1,2,3,4,3,4,5,3).mode(); /* = 3 */
var y = new StringVector("a",null,null,"b","c","d",null,"b").mode(); /* = null */
var z = new BooleanVector(true, false, true).mode(); /* = true */
```

---

### [INTERVAL SPOLEHLIVOSTI PODÍLU](#pci): pci

Vrátí statistický protokol odhadu intervalu spolehlivosti podílu výběrového souboru při určité hladině významnosti. [Zjistit více.](https://en.wikipedia.org/wiki/Confidence_interval)

#### Způsob volání metody


> (NumericVector).<mark>**pci**(***hledaná hodnota***, *hladina významnosti*)

> (StringVector).<mark>**pci**(***hledaná hodnota***, *hladina významnosti*)

> (BooleanVector).<mark>**pci**(***hledaná hodnota***, *hladina významnosti*)


#### Automatický filtr hodnot

jakákoliv hodnota

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **value** | hledaná hodnota | 🟤 cokoliv | Vstupem může být libovolná hodnota, validátor nevrací chybu. | ✔️ |  |
| **confidenceLevel** | hladina významnosti | 🔴 číslo | Ověří, zdali je hodnota číslo mezi 0 a 1 (včetně hraničních hodnot). V opačném případě vyvolá chybu. | - | 0.95 |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | ✔️ |
| binární | ✔️ |

#### Struktura vrácené hodnoty

- *interval spolehlivosti podílu* `🟦 objekt`
  - **p**: *podíl hledané hodnoty na celku* `🔴 číslo`
  - **sig**: *hladina výzmnamnosti intervalu* `🔴 číslo`
  - **delta**: *hodnota intervalu spolehlivosti* `🔴 číslo`
  - **lb**: *spodní hranice intervalu* `🔴 číslo`
  - **ub**: *horní hranice intervalu* `🔴 číslo`

#### Příklad

```js
var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).pci(5, 0.95);
/*
{
"p": 0.17391304347826086,
"sig": 0.050000000000000044,
"delta": 0.1549041787089759,
"lb": 0.019008864769284955,
"ub": 0.32881722218723675
}
*/
```

---

### [PERCENTIL](#percentile): percentile

Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru. [Zjistit více.](https://en.wikipedia.org/wiki/Percentile)

#### Způsob volání metody


> (NumericVector).<mark>**percentile**(***hodnota percentilu***)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **k** | hodnota percentilu | 🔴 číslo | Ověří, zdali je hodnota číslo mezi 0 a 1 (včetně hraničních hodnot). V opačném případě vyvolá chybu. | ✔️ |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var score = new NumericVector(10,20,15,25,23,19,18,17,24,23);
var median = score.percentile(0.5); /* = 19.5 */
var q25 = score.percentile(0.25); /* = 17.25 */
var max = score.percentile(1); /* = 25 */
```

---

### [VARIAČNÍ ROZPĚTÍ](#range): range

Vrátí rozdíl největší a nejmenší neprázdné hodnoty. [Zjistit více.](https://en.wikipedia.org/wiki/Range_(statistics))

#### Způsob volání metody


> (NumericVector).<mark>**range**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var range = new NumericVector(5,2,-15,-16.3,12,null, null, 12,13,7).range(); /* = 22 */
```

---

### [STŘEDNÍ CHYBA PRŮMĚRU](#sem): sem

Vrátí hodnotu směrodatné chyby odhadu průměru. [Zjistit více.](https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_sample_mean)

#### Způsob volání metody


> (NumericVector).<mark>**sem**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var sem = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).SEM(); /* = 0.67*/
```

---

### [SHAPIRŮV-WILKŮV W TEST](#shapirowilk): shapirowilk

Vrátí statistický protokol Shapiro-Wilkova W testu normality rozdělení hodnot vektoru. Shapiro-Wilk test je statistický test, který se používá k testování hypotézy, že data pocházejí z normálního rozdělení. Tento test je často používán k ověření normality dat v rámci statistické analýzy. Test Shapiro-Wilk se zakládá na porovnání hodnoty kvartilů dat s hodnotami kvartilů normálního rozdělení. Když jsou hodnoty kvartilů dat podobné hodnotám kvartilů normálního rozdělení, je pravděpodobné, že data pocházejí z normálního rozdělení. V opačném případě je pravděpodobné, že data nejsou normální. Při použití testu Shapiro-Wilk je třeba si uvědomit, že tento test má nízkou citlivost pro velké vzorky, tj. pro velké vzorky může být test méně spolehlivý při detekci ne-normality. Proto se pro velké vzorky často používají jiné testy normality, jako například test Anderson-Darling nebo test Kolmogorov-Smirnov. [Zjistit více.](https://en.wikipedia.org/wiki/Shapiro%E2%80%93Wilk_test)

#### Způsob volání metody


> (NumericVector).<mark>**shapirowilk**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *Shapirův-Wilkův W test* `🟦 objekt`
  - **W**: *hodnota Shapiro-Wilkova W testu* `🔴 číslo`
  - **df**: *počet stupňů volnosti* `c celé číslo`
  - **p**: *hladina významnosti* `🔴 číslo`

#### Příklad

```js
var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).shapirowilk();
/*
{
"W": 0.9664039647188553,
"df": 23,
"p": 0.6036566524076283
}
*/
```

---

### [ŠIKMOST](#skewness): skewness

Vrátí zešikmení rozdělní: charakteristika a asymetrie rozdělení kolem střední hodnoty vektoru.  [Zjistit více.](https://en.wikipedia.org/wiki/Skewness)

#### Způsob volání metody


> (NumericVector).<mark>**skewness**(*výběrový soubor*)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | 🟣 binární | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var skewness_population = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(false); /* = 0.52*/
var skewness_sample = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(true); /* = 0.027*/
```

---

### [SMĚRODATNÁ ODCHYLKA](#stdev): stdev

Vrátí směrodatnou odchylku neprázdných hodnot. Směrodatná odchylka je statistický ukazatel, který udává, jak moc se hodnoty v daném souboru dat od sebe liší. Směrodatná odchylka je vyjádřena jako číslo, které udává, o kolik se průměrná hodnota odchýlí od skutečné hodnoty v daném souboru dat. Směrodatná odchylka je užitečná při porovnávání velikosti rozptýlení dat v různých souborech nebo v různých skupinách v rámci jednoho souboru dat. Čím je směrodatná odchylka větší, tím více se hodnoty v daném souboru dat od sebe liší. [Zjistit více.](https://en.wikipedia.org/wiki/Standard_deviation)

#### Způsob volání metody


> (NumericVector).<mark>**stdev**(*výběrový soubor*)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | 🟣 binární | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev();  /* = 4.41 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev(true); /* = 4.65 */
```

---

### [SOUČET](#sum): sum

Vrátí součet všech neprázdných číselných hodnot vektoru. [Zjistit více.](https://en.wikipedia.org/wiki/Addition)

#### Způsob volání metody


> (NumericVector).<mark>**sum**()


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
```

---

### [JEDNOVÝBĚROVÝ T-TEST](#ttest): ttest

Vrátí statistický protokol pro jednovýběrový t-test při zadání populačního průměru.

#### Způsob volání metody


> (NumericVector).<mark>**ttest**(***populační průměr***)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **populationMean** | populační průměr | 🔴 číslo | Ověří, zdali je hodnota číslo. V opačném případě vyvolá chybu. | ✔️ |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *T-test s jedním výběrem* `🟦 objekt`
  - **t**: *testovací hodnota* `🔴 číslo`
  - **p**: *hladina významnosti* `🔴 číslo`
  - **n**: *počet případů* `c celé číslo`

#### Příklad

```js
var T = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1).ttest(10);
/*
{
"t": 2.0519223838763545,
"p": 0.05806,
"n": 16
}
*/
```

---

### [VARIAČNÍ KOEFICIENT](#varc): varc

Vrátí hodnotu variačního koeficientu neprázdných hodnot. [Zjistit více.](https://en.wikipedia.org/wiki/Coefficient_of_variation)

#### Způsob volání metody


> (NumericVector).<mark>**varc**(*výběrový soubor*)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | 🟣 binární | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc();  /* = 0.227 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc(true); /* = 0.24 */
```

---

### [ROZPTYL](#variance): variance

Vrátí hodnotu rozptylu tohoto vektoru. [Zjistit více.](https://en.wikipedia.org/wiki/Variance)

#### Způsob volání metody


> (NumericVector).<mark>**variance**(*výběrový soubor*)


#### Automatický filtr hodnot

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | 🟣 binární | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - |  |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerický | ✔️ |
| nominální | - |
| binární | - |

#### Struktura vrácené hodnoty

- *číslo* `🔴 číslo`

#### Příklad

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance();  /* = 19.44 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance(true); /* = 21.6 */
```