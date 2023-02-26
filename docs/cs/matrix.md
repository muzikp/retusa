# Matice

Bablablablabla.

## Statistické metody

| funkce | metoda |
| :---: |  :---: | 
| [correlPearson](#correlPearson) | pTvR |
| [correlSpearman](#correlSpearman) | eJTT |
| [correlKendall](#correlKendall) | mgBC |
| [correlPartial](#correlPartial) | xfSf |
| [correlBiserial](#correlBiserial) | AagR |
| [correlPhi](#correlPhi) | eJTT |
| [ttestind](#ttestind) | YqRh |
| [ttestpair](#ttestpair) | mmXD |
| [anovaow](#anovaow) | baJo |
| [mwu](#mwu) | rPQr |
| [genreg](#genreg) | vlCA |
| [contingency](#contingency) | gRix |
| [kwanova](#kwanova) | baJo |

---

### [PTVR](#correlPearson): correlPearson

wPyG

#### Způsob volání metody

> [Matrix instance].**correlPearson**(***qFEM***, ***tpUu***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *IIlO* `🟦 objekt`
  - **r**: *pTvR* `🔴 číslo`
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

### [EJTT](#correlSpearman): correlSpearman

jAGi

#### Způsob volání metody

> [Matrix instance].**correlSpearman**(***qFEM***, ***tpUu***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *IIlO* `🟦 objekt`
  - **r**: *eJTT* `🔴 číslo`
  - **df**: *stupně volnostsi* `🔴 celé číslo`
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

### [MGBC](#correlKendall): correlKendall

VOmC

#### Způsob volání metody

> [Matrix instance].**correlKendall**(***qFEM***, ***tpUu***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *IIlO* `🟦 objekt`
  - **taub**: *NgVa* `🔴 číslo`
  - **taua**: *mgBA* `🔴 číslo`
  - **df**: *stupně volnostsi* `🔴 celé číslo`
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

### [XFSF](#correlPartial): correlPartial

UcfZ

#### Způsob volání metody

> [Matrix instance].**correlPartial**(***qFEM***, ***tpUu***, ***gxOb***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **z** | gxOb | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *IIlO* `🟦 objekt`
  - **r**: *pTvR* `🔴 číslo`
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

### [AAGR](#correlBiserial): correlBiserial

OMiA

#### Způsob volání metody

> [Matrix instance].**correlBiserial**(***qFEM***, ***tpUu***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🟣] boQk | OCKc | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *IIlO* `🟦 objekt`
  - **r**: *pTvR* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js

```

---

### [EJTT](#correlPhi): correlPhi

jAGi

#### Způsob volání metody

> [Matrix instance].**correlPhi**(***qFEM***, ***tpUu***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🟣] boQk | null | ✔️ |  |
| **y** | tpUu | [🟣] boQk | null | ✔️ |  |

---

### [YQRH](#ttestind): ttestind

gILL

#### Způsob volání metody

> [Matrix instance].**ttestind**(***qFEM***, *tpUu*)


#### Automatický filtr hodnot

CPwN

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | qFEM | 🔢 DfLu | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **t**: *hodnota testu T* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **df**: *stupně volnostsi* `🔴 celé číslo`

#### Příklad

```js
var M = new Matrix([],[]).ttestind(0,1);
```

---

### [MMXD](#ttestpair): ttestpair

kPqo

#### Způsob volání metody

> [Matrix instance].**ttestpair**(***qFEM***, ***tpUu***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **t**: *hodnota testu T* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **df**: *stupně volnostsi* `🔴 celé číslo`

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

### [BAJO](#anovaow): anovaow

qqQo

#### Způsob volání metody

> [Matrix instance].**anovaow**(***iJaa***, *iJEe*)


#### Automatický filtr hodnot

CPwN

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | iJaa | 🔢 DfLu | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | iJEe | 🔢 DfLu | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *baJo* `🟦 objekt`
  - **F**: *Jdfb* `🔴 číslo`
  - **P2**: *HksP* `🔴 číslo`
  - **p**: *MpjZ* `🔴 číslo`
  - **n**: *počet případů* `🔴 celé číslo`
  - **ANOVA**: *qCgT* `🟦 objekt`
    - **totalOfGroups**: *cXCr* `🔴 celé číslo`
    - **betweenGroups**: *thNv* `🟦 objekt`
      - **sumOfSquares**: *SqTd* `🔴 číslo`
      - **df**: *stupně volnostsi* `🔴 celé číslo`
    - **withinGroups**: *GiRP* `🟦 objekt`
      - **sumOfsquares**: *SqTd* `🔴 číslo`
      - **df**: *stupně volnostsi* `🔴 celé číslo`
    - **total**: *Total* `🟦 objekt`
      - **sumOfSquares**: *Sumofsquares* `🔴 číslo`
      - **df**: *Df* `🔴 celé číslo`

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

### [RPQR](#mwu): mwu

vzHj

#### Způsob volání metody

> [Matrix instance].**mwu**(***qFEM***, *tpUu*)


#### Automatický filtr hodnot

CPwN

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | qFEM | 🔢 DfLu | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | tpUu | 🟤 cokoliv | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **U**: *TkNf* `🔴 číslo`
  - **Z**: *Shpv* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`

#### Příklad

```js
var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).mwu();
```

---

### [VLCA](#genreg): genreg

dzFE

#### Způsob volání metody

> [Matrix instance].**genreg**(***jDlm***, ***jFVv***, ***OBml***)


#### Automatický filtr hodnot

rAyq

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **independent** | jDlm | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **dependent** | jFVv | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **model** | OBml | 🟤 cokoliv | aaVG | ✔️ | 1 |

#### Struktura vrácené hodnoty

- *Root* `🟦 objekt`
  - **model**: *OBml* `🟡 text`
  - **r2**: *VqBH* `🔴 číslo`
  - **r**: *pTvR* `🔴 číslo`
  - **F**: *Jdfb* `🔴 číslo`
  - **p**: *MpjZ* `🔴 číslo`
  - **beta0**: *TDpu* `🔴 číslo`
  - **beta1**: *eFcW* `🔴 číslo`

#### Příklad

```js

```

---

### [GRIX](#contingency): contingency

fqwd

#### Způsob volání metody

> [Matrix instance].**contingency**(***gLRN***, ***bpjC***, *fqUi*)


#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | gLRN | 🟤 cokoliv | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | bpjC | 🟤 cokoliv | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **n** | fqUi | [🔴] yWUM | Ověří, zdali je hodnota typu NumericVector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *gRix* `🟦 objekt`
  - **phi**: *GfeP* `🔴 číslo`
  - **p**: *významnost* `🔴 číslo`
  - **df**: *stupně volnostsi* `🔴 celé číslo`
  - **C**: *BUaN* `🔴 číslo`
  - **V**: *VYQH* `🔴 číslo`

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

---

### [BAJO](#kwanova): kwanova

qqQo

#### Způsob volání metody

> [Matrix instance].**kwanova**(***iJaa***, *iJEe*)


#### Automatický filtr hodnot

CPwN

#### Argumenty

| id | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | iJaa | 🔢 DfLu | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |
| **factor** | iJEe | 🔢 DfLu | Ověří, zdali je hodnota typu Vector. V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | - |  |

#### Struktura vrácené hodnoty

- *baJo* `🟦 objekt`
  - **F**: *Jdfb* `🔴 číslo`
  - **P2**: *HksP* `🔴 číslo`
  - **p**: *MpjZ* `🔴 číslo`
  - **n**: *počet případů* `🔴 celé číslo`
  - **ANOVA**: *qCgT* `🟦 objekt`
    - **totalOfGroups**: *cXCr* `🔴 celé číslo`
    - **betweenGroups**: *thNv* `🟦 objekt`
      - **sumOfSquares**: *SqTd* `🔴 číslo`
      - **df**: *stupně volnostsi* `🔴 celé číslo`
    - **withinGroups**: *GiRP* `🟦 objekt`
      - **sumOfsquares**: *SqTd* `🔴 číslo`
      - **df**: *stupně volnostsi* `🔴 celé číslo`
    - **total**: *Total* `🟦 objekt`
      - **sumOfSquares**: *Sumofsquares* `🔴 číslo`
      - **df**: *Df* `🔴 celé číslo`

#### Příklad

```js
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow(0,1,2);
/* OR */
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow();
/* OR */
var M = new Matrix([2,3,2,4,5,9,8,7,9,10,1,7,19,32,90],[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3]).pivot(0,1).kwanova();
```