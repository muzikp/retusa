# Dokumentace statistických metod matic

Maticové metody představují statistické metody, které je možné provádět nad danou maticí. Obecně je lze volat dvě způsoby: buďto přímo (např. {Matrix}.correlPearson(0,1), nebo pomocí obecné metody 'analyze', např. {Matrix}.analyze('correlPearson').run(0,1). Rozdíl mezi první a druhým způsobem spočívá v tom, že u první metody dotneme čistý výsledek (u daného příkladu objekt s vlastnostmi r a p), v druhém případě dostaneme zpět celou třídy MatrixAnalysis, obsahující kromě výsledku i metadata (jako jsou informacee o vzorku, trvání výpočtu ad.) a také vstupní model, specifikaci argumentů atd. Pokud tedy potřebujete v průběhu výpočtu uchovávat metadata, je vhodné volat metody přes funkci 'analyze', kde parametr tvoří název metody.

Každá metoda má specifikované argumenty a jejich validátory. Validátory metod ověřují, zdali jsou uživatelem poskytnuté parametry v souladu s očekávanými vstupy výpočetních funkcí a v řadě případů jsou i schopné kompatibilní typy (třeba Array x Vector) překonvertovat. Validátory často fungují v několika krocích, tzn. pokud se jim nezdaří validovat vstupní hodnotu jením způsobem, mají v zásobě třeba ještě dvě další strategie konverze. Hodnota validátorů spočívá v tom, že výpočetní metoda dostane skutečně takové parametry, na základě kterých výslednou statistiku spočítá správně. 

Řada metod má specifikovaný tzv. preprocessor, což je funkce, která vstupní data výpočetních funkcí upraví na potřebný formát. Nejčastěji se jedná o to, že ze vstupních vektorů vyřadí řádky s prázdnámi hodnotami. V některých metodách ale provádí hlubší změny, např. transformaci matice dle určitého klíče (např. ANOVA). Preprocessory mají ještě jednu funkci, a to že do dat ukládají statistiky vstupního (raw) a počítaného (net) souboru.

| funkce | metoda |
| :--- | :--- |
| sum | [Součet](#sum) |
| count | [Počet](#count) |
| avg | [Aritmetický průměr](#avg) |
| stdev | [Směrodatná odchylka](#stdev) |

## [Součet](#sum)

Vrátí součet všech neprázdných číselných hodnot vektoru.

### Argumenty

| id |popis |typ hodnoty |validátor |povinný |defaultní hodnota |
| :--- |:--- |:--- |:--- |:--- |:--- |

### Preprocessor

Odstraní z vektoru všechny prázdné hodnoty (buňky).

### Příklady syntaxe

```js
var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
```

### Schéma výstupu

NaN
```

## [Počet](#count)

Vrátí počet všech členů vektoru, včetně prázdných hodnot.

### Argumenty

| id |popis |typ hodnoty |validátor |povinný |defaultní hodnota |
| :--- |:--- |:--- |:--- |:--- |:--- |
### Příklady syntaxe

```js
var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
```

### Schéma výstupu

NaN
```

## [Aritmetický průměr](#avg)

Vrátí aritmetický průměr (tedy podíl součtu a počtu hodnot vektoru) ze všech neprázdných hodnot (tedy včetně nul).

### Argumenty

| id |popis |typ hodnoty |validátor |povinný |defaultní hodnota |
| :--- |:--- |:--- |:--- |:--- |:--- |

### Preprocessor

Odstraní z vektoru všechny prázdné hodnoty (buňky).

### Příklady syntaxe

```js
var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).avg();  /* = 75 */
```

### Schéma výstupu

NaN
```

## [Směrodatná odchylka](#stdev)

Vrátí směrodatnou odchylku neprázdných hodnot. Směrodatná odchylka je statistický ukazatel, který udává, jak moc se hodnoty v daném souboru dat od sebe liší. Směrodatná odchylka je vyjádřena jako číslo, které udává, o kolik se průměrná hodnota odchýlí od skutečné hodnoty v daném souboru dat. Směrodatná odchylka je užitečná při porovnávání velikosti rozptýlení dat v různých souborech nebo v různých skupinách v rámci jednoho souboru dat. Čím je směrodatná odchylka větší, tím více se hodnoty v daném souboru dat od sebe liší.

### Argumenty

| id |popis |typ hodnoty |validátor |povinný |defaultní hodnota |
| :--- |:--- |:--- |:--- |:--- |:--- |
| <b>isSample</b> | výběrový soubor | binární hodnota | <sub>Ověří, zdali je hodnota binární povahy. V opačném případě hodnotu automaticky převede na typ boolean a nevrací tudíž nikdy chybu.<sub> |  | false |

### Preprocessor

Odstraní z vektoru všechny prázdné hodnoty (buňky).

### Příklady syntaxe

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev();  /* = 4.41 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev(true); /* = 4.65 */
```

### Schéma výstupu

NaN
```