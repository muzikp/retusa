# Vektor

Vektor (řada) je základní entitou statistické analýzy. Třída Vector se v aplikaci využívá výhradně skrze zděděné třídy (NumericVector atd.), které zajišťují validaci jednotlivých hodnot řady (např. do NumericVector instance nelze přidat hodnotu 'nazdar').

## Statistické metody

| funkce | metoda | popis | numerická | nominální | binární |
| --- | --- | --- | --- | --- | --- |
| [sum](#sum) | součet | Vrátí součet všech neprázdných číselných hodnot vektoru. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [count](#count) | počet | Vrátí počet všech polí ve vektoru (včetně prázdných). | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [avg](#avg) | arytmetický průměr | Vrátí arytmetický průměr z neprázdných hodnot. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [stdev](#stdev) | směrodatná odchylka | Vrátí směrodatnou odchylku neprázdných hodnot. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [variance](#variance) | rozptyl | Vrátí hodnotu rozptylu tohoto vektoru. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [histogram](#histogram) | histogram | Vrátí matici histogramu daného vektoru. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [min](#min) | minimální hodnota | Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení. | :white_check_mark: | :white_check_mark: | :no_entry_sign: |
| [max](#max) | maximální hodnota | Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení. | :white_check_mark: | :white_check_mark: | :no_entry_sign: |
| [range](#range) | variační rozpětí | Vrátí rozdíl největší a nejmenší neprázdné hodnoty. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [varc](#varc) | variační koeficient | Vrátí hodnotu variačního koeficientu neprázdných hodnot. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [percentile](#percentile) | percentil | Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [frequency](#frequency) | frekvenční tabulka | Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností. | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [geomean](#geomean) | geometrický průměr | Vrátí geometrický průměr z neprázdných hodnot. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [harmean](#harmean) | harmonický průměr | Vrátí harmonický průměr z neprázdných hodnot. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [median](#median) | medián | Vrátí střední hodnotu z neprázdných hodnot. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [mode](#mode) | modus | Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu). | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [SEM](#SEM) | směrodatná chyba průměru | Vrátí hodnotu směrodatné chyby odhadu průměru. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [skewness](#skewness) | šikmost |  | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [kurtosis](#kurtosis) | špičatost | Vrátí hodnotu excesu množiny dat. | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |

---

### SUM

Vrátí součet všech neprázdných číselných hodnot vektoru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

#### Příklad

```js
var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
```

---

### COUNT

Vrátí počet všech polí ve vektoru (včetně prázdných).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :white_check_mark: |
| binární | :white_check_mark: |

#### Příklad

```js
var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
```

---

### AVG

Vrátí arytmetický průměr z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

#### Příklad

```js
var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 75 */
```

---

### STDEV

Vrátí směrodatnou odchylku neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| s | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### VARIANCE

Vrátí hodnotu rozptylu tohoto vektoru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| s | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### HISTOGRAM

Vrátí matici histogramu daného vektoru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| maxIntervals | Maximální počet intervalů | Ověří, zdali se jedná o celé kladné číslo. V opačném případě vyvolá chybu. | - | - | - |
| fixedInterval | Pevná velikost intervalu | Ověří, zdali se jedná o číselnou hodnotu větší než nula. V opačném případě vyvolá chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### MIN

Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :white_check_mark: |
| binární | :no_entry_sign: |

---

### MAX

Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :white_check_mark: |
| binární | :no_entry_sign: |

---

### RANGE

Vrátí rozdíl největší a nejmenší neprázdné hodnoty.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### VARC

Vrátí hodnotu variačního koeficientu neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| s | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### PERCENTILE

Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| k | hodnota percentilu | Ověří, zdali je hodnota číslo mezi 0 a 1 (včetně hraničních hodnot). V opačném případě vyvolá chybu. | ano | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### FREQUENCY

Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností.

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| order | způsob řazení dat tabulky | Ověří, zdali je hodnota platným členem enumerace. V opačném případě vyvolá chybu. | - | 1 | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :white_check_mark: |
| binární | :white_check_mark: |

---

### GEOMEAN

Vrátí geometrický průměr z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### HARMEAN

Vrátí harmonický průměr z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### MEDIAN

Vrátí střední hodnotu z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### MODE

Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :white_check_mark: |
| binární | :white_check_mark: |

---

### SEM

Vrátí hodnotu směrodatné chyby odhadu průměru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### SKEWNESS

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| s | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |

---

### KURTOSIS

Vrátí hodnotu excesu množiny dat.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | :white_check_mark: |
| nominální | :no_entry_sign: |
| binární | :no_entry_sign: |