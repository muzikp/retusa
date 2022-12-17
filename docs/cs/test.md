# Vektor

Vektor (řada) je základní entitou statistické analýzy. Třída Vector se v aplikaci využívá výhradně skrze zděděné třídy (NumericVector atd.), které zajišťují validaci jednotlivých hodnot řady (např. do NumericVector instance nelze přidat hodnotu 'nazdar').

## Statistické metody

| funkce | metoda | popis | numerická | nominální | binární |
| --- | --- | --- | --- | --- | --- |
| [sum](#sum) | součet | Vrátí součet všech neprázdných číselných hodnot vektoru. | ano | ne | ne |
| [count](#count) | počet | Vrátí počet všech polí ve vektoru (včetně prázdných). | ano | ano | ano |
| [avg](#avg) | arytmetický průměr | Vrátí arytmetický průměr z neprázdných hodnot. | ano | ne | ne |
| [stdev](#stdev) | směrodatná odchylka | Vrátí směrodatnou odchylku neprázdných hodnot. | ano | ne | ne |
| [variance](#variance) | rozptyl | Vrátí hodnotu rozptylu tohoto vektoru. | ano | ne | ne |
| [histogram](#histogram) | histogram | Vrátí matici histogramu daného vektoru. | ano | ne | ne |
| [min](#min) | minimální hodnota | Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení. | ano | ano | ne |
| [max](#max) | maximální hodnota | Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení. | ano | ano | ne |
| [range](#range) | variační rozpětí | Vrátí rozdíl největší a nejmenší neprázdné hodnoty. | ano | ne | ne |
| [varc](#varc) | variační koeficient | Vrátí hodnotu variačního koeficientu neprázdných hodnot. | ano | ne | ne |
| [percentile](#percentile) | percentil | Vrátí hodnotu, která odpovídá k-tému percentilu v oblasti hodnot vektoru. | ano | ne | ne |
| [frequency](#frequency) | frekvenční tabulka | Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností. | ano | ano | ano |
| [geomean](#geomean) | geometrický průměr | Vrátí geometrický průměr z neprázdných hodnot. | ano | ne | ne |
| [harmean](#harmean) | harmonický průměr | Vrátí harmonický průměr z neprázdných hodnot. | ano | ne | ne |
| [median](#median) | medián | Vrátí střední hodnotu z neprázdných hodnot. | ano | ne | ne |
| [mode](#mode) | modus | Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu). | ano | ano | ano |
| [SEM](#SEM) | směrodatná chyba průměru | Vrátí hodnotu směrodatné chyby odhadu průměru. | ano | ne | ne |
| [skewness](#skewness) | šikmost |  | ano | ne | ne |
| [kurtosis](#kurtosis) | špičatost | Vrátí hodnotu excesu množiny dat. | ano | ne | ne |

---

### SUM{#sum}

Vrátí součet všech neprázdných číselných hodnot vektoru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

#### Příklad

```
    var cf = new NumericVector(200,250,150,320,240,-250,10,-320).sum(); 
    /* 
    600 
    */
```js

---

### COUNT{#count}

Vrátí počet všech polí ve vektoru (včetně prázdných).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | ano |
| binární | ano |

---

### AVG{#avg}

Vrátí arytmetický průměr z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### STDEV{#stdev}

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
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### VARIANCE{#variance}

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
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### HISTOGRAM{#histogram}

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
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### MIN{#min}

Vrátí nejmenší hodnotu z neprázdných hodnot. V případě textu vrátí první hodnotu z abecedního řazení.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | ano |
| binární | :tent: |

---

### MAX{#max}

Vrátí největší hodnotu z neprázdných hodnot. V případě textu vrátí poslední hodnotu z abecedního řazení.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | ano |
| binární | :tent: |

---

### RANGE{#range}

Vrátí rozdíl největší a nejmenší neprázdné hodnoty.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### VARC{#varc}

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
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### PERCENTILE{#percentile}

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
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### FREQUENCY{#frequency}

Vrátí object frekvenční tabulky s rozpadem prvků a jejich četností.

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| order | způsob řazení dat tabulky | Ověří, zdali je hodnota platným členem enumerace. V opačném případě vyvolá chybu. | - | 1 | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | ano |
| binární | ano |

---

### GEOMEAN{#geomean}

Vrátí geometrický průměr z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### HARMEAN{#harmean}

Vrátí harmonický průměr z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### MEDIAN{#median}

Vrátí střední hodnotu z neprázdných hodnot.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### MODE{#mode}

Vrátí nejčastější hodnotu (pokud je nejčastější prázdná hodnota, vrátí prázdnou hodnotu).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | ano |
| binární | ano |

---

### SEM{#SEM}

Vrátí hodnotu směrodatné chyby odhadu průměru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### SKEWNESS{#skewness}

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| s | výběrový soubor | Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu. | - | - | - |

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |

---

### KURTOSIS{#kurtosis}

Vrátí hodnotu excesu množiny dat.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Integrace dle třídy

| typ vektoru | integrace |
| --- | --- |
| numerická | ano |
| nominální | :tent: |
| binární | :tent: |