# Matice

Bablablablabla.

## Statistické metody

| function | method |
| :---: |  :---: | 
| [correlPearson](#correlPearson) | Pearson correlation coefficient |
| [correlSpearman](#correlSpearman) | Spearman's correlation coefficient |
| [correlKendall](#correlKendall) | Kendall Tau-b |
| [correlPartial](#correlPartial) | partial correlation |
| [correlBiserial](#correlBiserial) | biserial correlation |
| [ttestind](#ttestind) | T-test (independent) |
| [ttestpair](#ttestpair) | T-test (paired) |
| [anovaow](#anovaow) | baJo |
| [mwu](#mwu) | rPQr |
| [genreg](#genreg) | vlCA |
| [contingency](#contingency) | gRix |
| [kwanova](#kwanova) | baJo |

---

### [PEARSON CORRELATION COEFFICIENT](#correlPearson): correlPearson

Returns the statistical log of the Pearson correlation coefficient.
The Pearson correlation is a statistical method used to measure the relationship between two quantities. Its goal is to find out if there is a linear relationship between these quantities and what its intensity is.
Pearson's correlation is calculated using a formula called Pearson's correlation coefficient. This coefficient ranges from -1 to 1 and indicates how strong the relationship is between the quantities. If the coefficient is close to -1, it means that there is a strong negative relationship between the quantities, which means that when the value of one quantity increases, the value of the other quantity decreases. On the contrary, if the coefficient is close to 1, it means that there is a strong positive relationship between the quantities, which means that when the value of one quantity increases, the value of the other quantity also increases. If the coefficient is close to 0, it means that there is no relationship between the quantities or the relationship is very weak.
Pearson's correlation is mainly used to compare two quantitative quantities, i.e. quantities that can be measured on a scale with exact values (for example, age, height or weight). It can be used to determine whether there is a relationship between these quantities and what its character is. For example, Pearson's correlation can be used to compare age and weight and see if there is a relationship between these quantities and what its nature is. It can also be used to compare the results of two different tests and see if there is a relationship between the results of those tests. Source: https://chat.openai.com/chat

#### Method calling syntax

> [Matrix instance].**correlPearson**(***first variable***, ***second variable***)


#### In-built default value filter

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | first variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *method output log* `🟦 object`
  - **r**: *Pearson correlation coefficient* `🔴 number`
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

### [SPEARMAN'S CORRELATION COEFFICIENT](#correlSpearman): correlSpearman

jAGi

#### Method calling syntax

> [Matrix instance].**correlSpearman**(***first variable***, ***second variable***)


#### In-built default value filter

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | first variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *method output log* `🟦 object`
  - **r**: *Spearman's correlation coefficient* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`
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

### [KENDALL TAU-B](#correlKendall): correlKendall

Returns the statistical log of Kendall's Tau-B correlation coefficient. If you were to calculate the same operation in SPSS, you would probably get a slightly different result. Apparently, this is due to the different sensitivity to decimal places in the two systems. However, it should not have a major influence on the interpretation of the result.

#### Method calling syntax

> [Matrix instance].**correlKendall**(***first variable***, ***second variable***)


#### In-built default value filter

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | first variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *method output log* `🟦 object`
  - **taub**: *Tau-b* `🔴 number`
  - **taua**: *Tau-a* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`
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

### [PARTIAL CORRELATION](#correlPartial): correlPartial

Partial correlation is a statistical method that allows you to find out what the relationship is between two variables while taking into account the influence of a third variable. This is useful if you want to see if there is a direct relationship between two variables without being affected by the influence of other variables. For example, if you want to find out if there is a relationship between level of training and success at work, it may be useful to consider the effect of age or gender as well. In that case, you could use partial correlation to find the relationship between level of training and success at work while controlling for the effects of age and gender. The partial correlation is calculated using a formula that is derived from the Pearson correlation coefficient. It is important to note that partial correlation does not imply causation, i.e. that one variable does not cause the other, but only shows that there is some association between them. Source: https://chat.openai.com/chat.

#### Method calling syntax

> [Matrix instance].**correlPartial**(***first variable***, ***second variable***, ***third (control) variable***)


#### In-built default value filter

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | first variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **z** | third (control) variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *method output log* `🟦 object`
  - **r**: *Pearson correlation coefficient* `🔴 number`
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

### [BISERIAL CORRELATION](#correlBiserial): correlBiserial

Biserial correlation is a statistical method that is used to evaluate the relationship between two binary variables (ie variables that can have only two possible values, such as 'yes' or 'no'). Binary variables are often used in the social sciences, for example when examining the relationship between education and employment or between smoking and health. Biserial correlation is calculated using a formula that is derived from the Pearson correlation coefficient. It is important to note that biserial correlation does not imply causation, i.e. that one variable does not cause the other, but only shows that there is some association between them.

#### Method calling syntax

> [Matrix instance].**correlBiserial**(***first variable***, ***second variable***)


#### In-built default value filter

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | first variable | [🟣] binary (boolean) vector | Checks if the value is of type binary (boolean) vector. Otherwise, it will throw an error. | ✔️ |  |
| **y** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *method output log* `🟦 object`
  - **r**: *Pearson correlation coefficient* `🔴 number`
  - **p**: *significance* `🔴 number`

#### Example

```js

```

---

### [T-TEST (INDEPENDENT)](#ttestind): ttestind

Returns the statistical log of the Student's t-test for two independent samples that are defined by an eigenvariable (that is, two numeric vectors). Arguments are either two numeric vectors, or one numeric and only a factor vector (usually text, but can also be numeric or binary). If a vector that has more than two unique values is used as a factor, only the first two unique values found are considered for the test (the others are ignored) - in this case, the information about the size of the pure sample is irrelevant, however, the level of significance to which the sample size enters, it is already based on pure cases.

#### Method calling syntax

> [Matrix instance].**ttestind**(***first variable***, *second variable*)


#### In-built default value filter

Removes empty values from vectors without deleting a row in one vector affecting another vector.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | first variable | 🔢 matrix | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *Root* `🟦 object`
  - **t**: *T-value* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`

#### Example

```js
var M = new Matrix([],[]).ttestind(0,1);
```

---

### [T-TEST (PAIRED)](#ttestpair): ttestpair

Returns the statistical log of a paired t-test for two dependent samples. Empty values are cut out in the row cross-section, i.e. that if at least one value is missing in one row, the entire row is cut from the analysis.

#### Method calling syntax

> [Matrix instance].**ttestpair**(***first variable***, ***second variable***)


#### In-built default value filter

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | first variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **y** | second variable | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |

#### Output structure

- *Root* `🟦 object`
  - **t**: *T-value* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`

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

Removes empty values from vectors without deleting a row in one vector affecting another vector.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | iJaa | 🔢 matrix | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | iJEe | 🔢 matrix | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *baJo* `🟦 object`
  - **F**: *Jdfb* `🔴 number`
  - **P2**: *HksP* `🔴 number`
  - **p**: *MpjZ* `🔴 number`
  - **n**: *total of cases* `🔴 whole number (integer)`
  - **ANOVA**: *qCgT* `🟦 object`
    - **totalOfGroups**: *cXCr* `🔴 whole number (integer)`
    - **betweenGroups**: *thNv* `🟦 object`
      - **sumOfSquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `🔴 whole number (integer)`
    - **withinGroups**: *GiRP* `🟦 object`
      - **sumOfsquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `🔴 whole number (integer)`
    - **total**: *Total* `🟦 object`
      - **sumOfSquares**: *Sumofsquares* `🔴 number`
      - **df**: *Df* `🔴 whole number (integer)`

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

> [Matrix instance].**mwu**(***first variable***, *second variable*)


#### In-built default value filter

Removes empty values from vectors without deleting a row in one vector affecting another vector.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | first variable | 🔢 matrix | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | second variable | 🟤 any type | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *Root* `🟦 object`
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

Selects all data from the original matrix (ie no filtering).

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **independent** | jDlm | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **dependent** | jFVv | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | ✔️ |  |
| **model** | OBml | 🟤 any type | Checks if the value is a valid enumeration member. Otherwise, it will throw an error. | ✔️ | 1 |

#### Output structure

- *Root* `🟦 object`
  - **model**: *OBml* `🟡 string`
  - **r2**: *VqBH* `🔴 number`
  - **r**: *Pearson correlation coefficient* `🔴 number`
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
| **n** | fqUi | [🔴] numeric vector | Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *gRix* `🟦 object`
  - **phi**: *GfeP* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`
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

Removes empty values from vectors without deleting a row in one vector affecting another vector.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **vectors** | iJaa | 🔢 matrix | Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown. | ✔️ |  |
| **factor** | iJEe | 🔢 matrix | Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method. | - |  |

#### Output structure

- *baJo* `🟦 object`
  - **F**: *Jdfb* `🔴 number`
  - **P2**: *HksP* `🔴 number`
  - **p**: *MpjZ* `🔴 number`
  - **n**: *total of cases* `🔴 whole number (integer)`
  - **ANOVA**: *qCgT* `🟦 object`
    - **totalOfGroups**: *cXCr* `🔴 whole number (integer)`
    - **betweenGroups**: *thNv* `🟦 object`
      - **sumOfSquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `🔴 whole number (integer)`
    - **withinGroups**: *GiRP* `🟦 object`
      - **sumOfsquares**: *SqTd* `🔴 number`
      - **df**: *degrees of freedom* `🔴 whole number (integer)`
    - **total**: *Total* `🟦 object`
      - **sumOfSquares**: *Sumofsquares* `🔴 number`
      - **df**: *Df* `🔴 whole number (integer)`

#### Example

```js
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow(0,1,2);
/* OR */
var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow();
/* OR */
var M = new Matrix([2,3,2,4,5,9,8,7,9,10,1,7,19,32,90],[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3]).pivot(0,1).kwanova();
```