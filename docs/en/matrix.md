# Matice

Bablablablabla.

## Statistické metody

| function | method |
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

#### Method calling syntax

> [Matrix instance].**correlPearson**(***qFEM***, ***tpUu***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *IIlO* `🟦 kLhB`
  - **r**: *pTvR* `🔴 number`
  - **p**: *significance* `🔴 number`

#### Example

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

#### Method calling syntax

> [Matrix instance].**correlSpearman**(***qFEM***, ***tpUu***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *IIlO* `🟦 kLhB`
  - **r**: *eJTT* `🔴 number`
  - **df**: *degrees of freedom* `c whole number (integer)`
  - **p**: *significance* `🔴 number`

#### Example

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

#### Method calling syntax

> [Matrix instance].**correlKendall**(***qFEM***, ***tpUu***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *IIlO* `🟦 kLhB`
  - **taub**: *NgVa* `🔴 number`
  - **taua**: *mgBA* `🔴 number`
  - **df**: *degrees of freedom* `c whole number (integer)`
  - **p**: *significance* `🔴 number`

#### Example

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

#### Method calling syntax

> [Matrix instance].**correlPartial**(***qFEM***, ***tpUu***, ***gxOb***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **z** | gxOb | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *IIlO* `🟦 kLhB`
  - **r**: *pTvR* `🔴 number`
  - **p**: *significance* `🔴 number`

#### Example

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

#### Method calling syntax

> [Matrix instance].**correlBiserial**(***qFEM***, ***tpUu***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🟣] boQk | OCKc | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *IIlO* `🟦 kLhB`
  - **r**: *pTvR* `🔴 number`
  - **p**: *significance* `🔴 number`

#### Example

```js

```

---

### [EJTT](#correlPhi): correlPhi

jAGi

#### Method calling syntax

> [Matrix instance].**correlPhi**(***qFEM***, ***tpUu***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🟣] boQk | null | ✔️ |  |
| **y** | tpUu | [🟣] boQk | null | ✔️ |  |

---

### [YQRH](#ttestind): ttestind

gILL

#### Method calling syntax

> [Matrix instance].**ttestind**(***qFEM***, *tpUu*)


#### In-built default value filter

CPwN

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | qFEM | 🔢 DfLu | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *Root* `🟦 kLhB`
  - **t**: *T-value* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **df**: *degrees of freedom* `c whole number (integer)`

#### Example

```js
var M = new Matrix([],[]).ttestind(0,1);
```

---

### [MMXD](#ttestpair): ttestpair

kPqo

#### Method calling syntax

> [Matrix instance].**ttestpair**(***qFEM***, ***tpUu***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | qFEM | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | tpUu | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *Root* `🟦 kLhB`
  - **t**: *T-value* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **df**: *degrees of freedom* `c whole number (integer)`

#### Example

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

#### Method calling syntax

> [Matrix instance].**anovaow**(***iJaa***, *iJEe*)


#### In-built default value filter

CPwN

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | iJaa | 🔢 DfLu | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | iJEe | 🔢 DfLu | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *baJo* `🟦 kLhB`
  - **F**: *Jdfb* `🔴 number`
  - **P2**: *HksP* `🔴 number`
  - **p**: *MpjZ* `🔴 number`
  - **n**: *total of cases* `c whole number (integer)`
  - **ANOVA**: *qCgT* `🟦 kLhB`
    - **totalOfGroups**: *cXCr* `c whole number (integer)`
    - **betweenGroups**: *thNv* `🟦 kLhB`
      - **sumOfSquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `c whole number (integer)`
    - **withinGroups**: *GiRP* `🟦 kLhB`
      - **sumOfsquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `c whole number (integer)`
    - **total**: *Total* `🟦 kLhB`
      - **sumOfSquares**: *Sumofsquares* `🔴 number`
      - **df**: *Df* `c whole number (integer)`

#### Example

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

#### Method calling syntax

> [Matrix instance].**mwu**(***qFEM***, *tpUu*)


#### In-built default value filter

CPwN

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | qFEM | 🔢 DfLu | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | tpUu | 🟤 any type | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *Root* `🟦 kLhB`
  - **U**: *TkNf* `🔴 number`
  - **Z**: *Shpv* `🔴 number`
  - **p**: *significance* `🔴 number`

#### Example

```js
var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).mwu();
```

---

### [VLCA](#genreg): genreg

dzFE

#### Method calling syntax

> [Matrix instance].**genreg**(***jDlm***, ***jFVv***, ***OBml***)


#### In-built default value filter

rAyq

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **independent** | jDlm | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **dependent** | jFVv | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **model** | OBml | 🟤 any type | aaVG | ✔️ | 1 |

#### Output structure

- *Root* `🟦 kLhB`
  - **model**: *OBml* `🟡 string`
  - **r2**: *VqBH* `🔴 number`
  - **r**: *pTvR* `🔴 number`
  - **F**: *Jdfb* `🔴 number`
  - **p**: *MpjZ* `🔴 number`
  - **beta0**: *TDpu* `🔴 number`
  - **beta1**: *eFcW* `🔴 number`

#### Example

```js

```

---

### [GRIX](#contingency): contingency

fqwd

#### Method calling syntax

> [Matrix instance].**contingency**(***gLRN***, ***bpjC***, *fqUi*)


#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | gLRN | 🟤 any type | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | bpjC | 🟤 any type | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **n** | fqUi | [🔴] yWUM | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *gRix* `🟦 kLhB`
  - **phi**: *GfeP* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **df**: *degrees of freedom* `c whole number (integer)`
  - **C**: *BUaN* `🔴 number`
  - **V**: *VYQH* `🔴 number`

#### Example

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

#### Method calling syntax

> [Matrix instance].**kwanova**(***iJaa***, *iJEe*)


#### In-built default value filter

CPwN

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | iJaa | 🔢 DfLu | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | iJEe | 🔢 DfLu | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *baJo* `🟦 kLhB`
  - **F**: *Jdfb* `🔴 number`
  - **P2**: *HksP* `🔴 number`
  - **p**: *MpjZ* `🔴 number`
  - **n**: *total of cases* `c whole number (integer)`
  - **ANOVA**: *qCgT* `🟦 kLhB`
    - **totalOfGroups**: *cXCr* `c whole number (integer)`
    - **betweenGroups**: *thNv* `🟦 kLhB`
      - **sumOfSquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `c whole number (integer)`
    - **withinGroups**: *GiRP* `🟦 kLhB`
      - **sumOfsquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `c whole number (integer)`
    - **total**: *Total* `🟦 kLhB`
      - **sumOfSquares**: *Sumofsquares* `🔴 number`
      - **df**: *Df* `c whole number (integer)`

#### Example

```js
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow(0,1,2);
/* OR */
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow();
/* OR */
var M = new Matrix([2,3,2,4,5,9,8,7,9,10,1,7,19,32,90],[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3]).pivot(0,1).kwanova();
```