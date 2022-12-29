# Matice

Bablablablabla.

## Statistické metody



---

### [ANOVA](#anovaow): anovaow

Vrátí statistický protokol analýzy rozptylu jednoduchého třídění (One-way ANOVA). Vstupem analýzy je matice s již předvybranými numerickými vektory, to znamená, že vstupní proměnné (vektory) není nutné specifikovat.

#### Způsob volání metody

> [Matrix instance].**anovaow**(*identifikátor(y) vektorů*)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | identifikátor(y) vektorů | [❤️💛💜] matice | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | - |  |

#### Struktura vrácené hodnoty

- *ANOVA* `🟦 objekt`
  - **F**: *F test* `🔴 číslo`
  - **P2**: *koeficient závislosti* `🔴 číslo`
  - **p**: *hladina významnosti* `🔴 číslo`
  - **n**: *počet případů* `🟠 celé číslo`
  - **ANOVA**: *statistiky ANOVA* `🟦 objekt`
    - **totalOfGroups**: *celkem skupin* `🟠 celé číslo`
    - **betweenGroups**: *meziskuponové efekty* `🟦 objekt`
      - **sumOfSquares**: *suma čtverců* `🔴 číslo`
      - **df**: *počet stupňů volnosti* `🟠 celé číslo`
    - **withinGroups**: *vnitroskupinové efekty* `🟦 objekt`
      - **sumOfsquares**: *suma čtverců* `🔴 číslo`
      - **df**: *počet stupňů volnosti* `🟠 celé číslo`
    - **total**: *Total* `🟦 objekt`
      - **sumOfSquares**: *Sumofsquares* `🔴 číslo`
      - **df**: *Df* `🟠 celé číslo`

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

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlBiserial): correlBiserial

Vrátí statistický protokol Spearmanova koeficientu pořadové korelace.

#### Způsob volání metody

> [Matrix instance].**correlBiserial**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | 💜 binární vektor | null | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | null | ✔️ |  |

---

### [KENDALLŮV KOREELAČNÍ KOEFICIENT](#correlKendall): correlKendall

Vrátí statistický protokol Kendallova korelačního koeficientu Tau. Podobně jako v SPSS je coby korelační koeficient (r) vrácena hodota statistiky Tau-A, nikoliv Tau-b, jak je metoda obvykle nazývána.

#### Způsob volání metody

> [Matrix instance].**correlKendall**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Kendallův korelační koeficient Tau-a* `🔴 číslo`
  - **n**: *počet případů* `🟠 celé číslo`
  - **p**: *hladina významnosti* `🔴 číslo`

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

Vrátí statistický protokol parciálního korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlPartial**(***první proměnná***, ***druhá proměnná***, ***třetí proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | null | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | null | ✔️ |  |
| **z** | třetí proměnná | ❤️ numerický vektor | null | ✔️ |  |

---

### [PEARSONŮV KORELAČNÍ KOEFICIENT](#correlPearson): correlPearson

Vrátí statistický protokol Pearsonova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlPearson**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Pearsonův korelační koeficient* `🔴 číslo`
  - **n**: *počet případů* `🟠 celé číslo`
  - **p**: *hladina významnosti* `🔴 číslo`

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

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlPhi): correlPhi

Vrátí statistický protokol Spearmanova koeficientu pořadové korelace.

#### Způsob volání metody

> [Matrix instance].**correlPhi**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | 💜 binární vektor | null | ✔️ |  |
| **y** | druhá proměnná | 💜 binární vektor | null | ✔️ |  |

---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlSpearman): correlSpearman

Vrátí statistický protokol Spearmanova koeficientu pořadové korelace.

#### Způsob volání metody

> [Matrix instance].**correlSpearman**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *protokol výstupu metody* `🟦 objekt`
  - **r**: *Spearmanův korelační koeficient* `🔴 číslo`
  - **n**: *počet případů* `🟠 celé číslo`
  - **p**: *hladina významnosti* `🔴 číslo`

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

### [LINEÁRNÍ REGRESE](#linreg): linreg

Vrátí statistický protokol lineární regrese. Součástí vráceného objektu je i funkce (fn), pomocí které lze modelovat situace závislé proměnné při zadání hodnoty závislé proměnné.

#### Způsob volání metody

> [Matrix instance].**linreg**(***nezávislá proměnná x***, ***závislá proměnná y***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **independent** | nezávislá proměnná x | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **dependent** | závislá proměnná y | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *lineární regrese* `🟦 objekt`
  - **r2**: *koeficient determinace* `🔴 číslo`
  - **r**: *Pearsonův korelační koeficient* `🔴 číslo`
  - **F**: *F test* `🔴 číslo`
  - **p**: *hladina významnosti* `🔴 číslo`
  - **beta0**: *konstanta beta0 (nezávislá na x)* `🔴 číslo`
  - **beta1**: *konstanta beta1 (závislá na x)* `🔴 číslo`
  - **n**: *počet případů* `🟠 celé číslo`
  - **fn**: *funkční model* `#️⃣ funkce`

#### Příklad

```js
var M = new Matrix([160,160,162,163,161,170,172,177,179,178,182,184,183],[57,55,59,60,52,67,69,74,75,76,78,80,87]);
var model = M.linreg(0,1);
/*
{
"r2": 0.949355403714833,
"r": 0.974348707452744,
"F": 206.19987534428648,
"p": 1.802343407852902e-8,
"beta0": -126.2043685121107,
"beta1": 1.1338667820069204,
"n": 13,
"fn": function (x) { return beta0 + x * beta1}
}
*/
var x190 = model.fn(190); /* 89.23032006920417 */
```

---

### [MANN-WHITNEY](#mannwhitney): mannwhitney

Vrátí statistický protokol Mann-Whitneyho U testu.

#### Způsob volání metody

> [Matrix instance].**mannwhitney**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Příklad

```js
var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).mannwhitney();
```

---

### [T-TEST (NEZÁVISLÝ)](#ttestind): ttestind

Vrátí statistický protokol Studentova t-testu pro dva nezávislé výběry, které jsou definovány vlastní proměnnou (tedy dvěma numerickými vektory).

#### Způsob volání metody

> [Matrix instance].**ttestind**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Příklad

```js
var M = new Matrix([],[]).ttestind(0,1);
```

---

### [T-TEST (PÁROVÝ)](#ttestpair): ttestpair

Vrátí statistický protokol párového t-testu pro dva závislé výběry.

#### Způsob volání metody

> [Matrix instance].**ttestpair**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

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