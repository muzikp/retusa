# Vektor

Vektor (řada) je základní entitou statistické analýzy. Třída Vector se v aplikaci využívá výhradně skrze zděděné třídy (NumericVector atd.), které zajišťují validaci jednotlivých hodnot řady (např. do NumericVector instance nelze přidat hodnotu 'nazdar').

## Statistické metody

| funkce | metoda | popis | numerická | nominální | binární |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| [sum](#sum) | součet | Vrátí součet všech neprázdných číselných hodnot vektoru. | :heavy_check_mark: |  |  |
| [count](#count) | počet | Vrátí počet všech polí ve vektoru (včetně prázdných). | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| [avg](#avg) | arytmetický průměr | Vrátí arytmetický průměr z neprázdných hodnot. | :heavy_check_mark: |  |  |
| [stdev](#stdev) | směrodatná odchylka | Vrátí směrodatnou odchylku neprázdných hodnot. | :heavy_check_mark: |  |  |
| [variance](#variance) | rozptyl | Vrátí hodnotu rozptylu tohoto vektoru. | :heavy_check_mark: |  |  |
| [histogram](#histogram) | histogram | Vrátí matici histogramu daného vektoru. | :heavy_check_mark: |  |  |
| [min](#min) | minimální hodnota | Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení. | :heavy_check_mark: | :heavy_check_mark: |  |
| [max](#max) | maximální hodnota | Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení. | :heavy_check_mark: | :heavy_check_mark: |  |
| [range](#range) | variační rozpětí | Vrátí rozdíl největší a nejmenší neprázdné hodnoty. | :heavy_check_mark: |  |  |
| [varc](#varc) | variační koeficient | Vrátí hodnotu variačního koeficientu neprázdných hodnot. | :heavy_check_mark: |  |  |
| [percentile](#percentile) | percentil | Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru. | :heavy_check_mark: |  |  |
| [frequency](#frequency) | frekvenční tabulka | Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností. | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| [geomean](#geomean) | geometrický průměr | Vrátí geometrický průměr z neprázdných hodnot. Je vždy menší nebo rovný než průměr arytmetický. | :heavy_check_mark: |  |  |
| [harmean](#harmean) | harmonický průměr | Vrátí harmonický průměr z neprázdných hodnot. Harmonický průměr je vždy menší než průměr geometrický, tedy i než průměr arytmetický. Používá se např. při výpočtu průměrné rychlosti. | :heavy_check_mark: |  |  |
| [median](#median) | medián | Vrátí střední hodnotu z neprázdných hodnot. | :heavy_check_mark: |  |  |
| [mode](#mode) | modus | Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu). | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| [SEM](#SEM) | směrodatná chyba průměru | Vrátí hodnotu směrodatné chyby odhadu průměru. | :heavy_check_mark: |  |  |
| [skewness](#skewness) | šikmost |  | :heavy_check_mark: |  |  |
| [kurtosis](#kurtosis) | špičatost | Vrátí hodnotu excesu množiny dat. | :heavy_check_mark: |  |  |

---

### SUM (součet) {#sum}

Vrátí součet všech neprázdných číselných hodnot vektoru.

#### Konstruktor


> (NumericVector).<mark>**sum**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
```

---

### COUNT (počet) {#count}

Vrátí počet všech polí ve vektoru (včetně prázdných).

#### Konstruktor


> (NumericVector).<mark>**count**()

> (StringVector).<mark>**count**()

> (BooleanVector).<mark>**count**()


#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální | :heavy_check_mark: |
| binární | :heavy_check_mark: |

#### Příklad

```js
var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
```

---

### AVG (arytmetický průměr) {#avg}

Vrátí arytmetický průměr z neprázdných hodnot.

#### Konstruktor


> (NumericVector).<mark>**avg**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 75 */
```

---

### STDEV (směrodatná odchylka) {#stdev}

Vrátí směrodatnou odchylku neprázdných hodnot.

#### Konstruktor


> (NumericVector).<mark>**stdev**(*výběrový soubor*)


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev();  /* = 4.41 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev(true); /* = 4.65 */
```

---

### VARIANCE (rozptyl) {#variance}

Vrátí hodnotu rozptylu tohoto vektoru.

#### Konstruktor


> (NumericVector).<mark>**variance**(*výběrový soubor*)


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance();  /* = 19.44 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance(true); /* = 21.6 */
```

---

### HISTOGRAM (histogram) {#histogram}

Vrátí matici histogramu daného vektoru.

#### Konstruktor


> (NumericVector).<mark>**histogram**(*Maximální počet intervalů*, *Pevná velikost intervalu*)


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **maxIntervals** | Maximální počet intervalů | Ověří, zdali se jedná o celé kladné číslo. V opačném případě vyvolá chybu. | - | - | - |
| **fixedInterval** | Pevná velikost intervalu | Ověří, zdali se jedná o číselnou hodnotu větší než nula. V opačném případě vyvolá chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

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

### MIN (minimální hodnota) {#min}

Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení.

#### Konstruktor


> (NumericVector).<mark>**min**()

> (StringVector).<mark>**min**()


#### Pre-filtr

jakákoliv neprázdná hodnota (u číselných řad akceptuje nuly, u binárních proměnných argumenty false).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální | :heavy_check_mark: |
| binární |  |

#### Příklad

```js
var numeric_min = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).min(); /* = 1 */;
var string_min = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").min(); /* = Fisher */
```

---

### MAX (maximální hodnota) {#max}

Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení.

#### Konstruktor


> (NumericVector).<mark>**max**()

> (StringVector).<mark>**max**()


#### Pre-filtr

jakákoliv neprázdná hodnota (u číselných řad akceptuje nuly, u binárních proměnných argumenty false).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální | :heavy_check_mark: |
| binární |  |

#### Příklad

```js
var numeric_max = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).max(); /* = 9.1 */;
var string_max = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").max(); /* = Poisson */
```

---

### RANGE (variační rozpětí) {#range}

Vrátí rozdíl největší a nejmenší neprázdné hodnoty.

#### Konstruktor


> (NumericVector).<mark>**range**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var range = new NumericVector(5,2,-15,-16.3,12,null, null, 12,13,7).range(); /* = 22 */
```

---

### VARC (variační koeficient) {#varc}

Vrátí hodnotu variačního koeficientu neprázdných hodnot.

#### Konstruktor


> (NumericVector).<mark>**varc**(*výběrový soubor*)


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc();  /* = 0.227 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc(true); /* = 0.24 */
```

---

### PERCENTILE (percentil) {#percentile}

Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru.

#### Konstruktor


> (NumericVector).<mark>**percentile**(***NaN***)


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **k** | hodnota percentilu | Ověří, zdali je hodnota číslo mezi 0 a 1 (včetně hraničních hodnot). V opačném případě vyvolá chybu. | ano | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var score = new NumericVector(10,20,15,25,23,19,18,17,24,23);
var median = score.percentile(0.5); /* = 19.5 */
var q25 = score.percentile(0.25); /* = 17.25 */
var max = score.percentile(1); /* = 25 */
```

---

### FREQUENCY (frekvenční tabulka) {#frequency}

Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností.

#### Konstruktor


> (NumericVector).<mark>**frequency**(*způsob řazení dat tabulky*)

> (StringVector).<mark>**frequency**(*způsob řazení dat tabulky*)

> (BooleanVector).<mark>**frequency**(*způsob řazení dat tabulky*)


#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **order** | způsob řazení dat tabulky | Ověří, zdali je hodnota platným členem enumerace. V opačném případě vyvolá chybu. | - | 1 | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální | :heavy_check_mark: |
| binární | :heavy_check_mark: |

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

### GEOMEAN (geometrický průměr) {#geomean}

Vrátí geometrický průměr z neprázdných hodnot. Je vždy menší nebo rovný než průměr arytmetický.

#### Konstruktor


> (NumericVector).<mark>**geomean**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).geomean(); /* = 21.24*/
```

---

### HARMEAN (harmonický průměr) {#harmean}

Vrátí harmonický průměr z neprázdných hodnot. Harmonický průměr je vždy menší než průměr geometrický, tedy i než průměr arytmetický. Používá se např. při výpočtu průměrné rychlosti.

#### Konstruktor


> (NumericVector).<mark>**harmean**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).harmean(); /* = 21.03*/
```

---

### MEDIAN (medián) {#median}

Vrátí střední hodnotu z neprázdných hodnot.

#### Konstruktor


> (NumericVector).<mark>**median**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var median = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).median(); /* = 21*/
```

---

### MODE (modus) {#mode}

Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu).

#### Konstruktor


> (NumericVector).<mark>**mode**()

> (StringVector).<mark>**mode**()

> (BooleanVector).<mark>**mode**()


#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální | :heavy_check_mark: |
| binární | :heavy_check_mark: |

#### Příklad

```js
var x = new NumericVector(1,2,3,4,3,4,5,3).mode(); /* = 3 */
var y = new StringVector("a",null,null,"b","c","d",null,"b").mode(); /* = null */
var z = new BooleanVector(true, false, true).mode(); /* = true */
```

---

### SEM (směrodatná chyba průměru) {#SEM}

Vrátí hodnotu směrodatné chyby odhadu průměru.

#### Konstruktor


> (NumericVector).<mark>**SEM**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var sem = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).SEM(); /* = 0.67*/
```

---

### SKEWNESS (šikmost) {#skewness}

#### Konstruktor


> (NumericVector).<mark>**skewness**(*výběrový soubor*)


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | validátor | povinný | defaultní hodnota | vícenásobný |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var skewness_population = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(false); /* = 0.52*/
var skewness_sample = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(true); /* = 0.027*/
```

---

### KURTOSIS (špičatost) {#kurtosis}

Vrátí hodnotu excesu množiny dat.

#### Konstruktor


> (NumericVector).<mark>**kurtosis**()


#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- |  :---: | 
| numerická | :heavy_check_mark: |
| nominální |  |
| binární |  |

#### Příklad

```js
var kurtosis = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).kurtosis(); /* = 0.425*/
```