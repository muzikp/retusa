# Vector statistical analysis methods

The basic class of the application is Vector, i.e. an array of elements. Vector is a class that inherits from Array and thus inherits with it all of its original methods, while extending it with dozens more - these extension methods are described below. In addition, the Vector class has many other methods of its own, such as content generation functions, sort/order methods, methods to write and read metadata etc. This part of the documentation will be processed gradually. The Vector class is accessible to the user through three inherited classes that validate the type of values that can become their members (NumericVector, StringVector and BooleanVector), while the availability of methods for each type of class is different (e.g. for a StringVector instance I cannot use the method diameter).

## Statistické metody

| function | method | numeric | string | boolean |
| :---: |  :---: |  :---: |  :---: |  :---: | 
| [kstest](#kstest) | Kolmogorov-Smirnov test | ✔️ | - | - |
| [min](#min) | minimum | ✔️ | ✔️ | ✔️ |
| [skewness](#skewness) | skewness | ✔️ | - | - |
| [histogram](#histogram) | histogram | ✔️ | - | - |
| [median](#median) | median | ✔️ | - | - |
| [mode](#mode) | mode | ✔️ | ✔️ | ✔️ |
| [variance](#variance) | variance | ✔️ | - | - |
| [ttest](#ttest) | one-sample t-test | ✔️ | - | - |
| [pci](#pci) | confidence interval of the proportion | ✔️ | ✔️ | ✔️ |
| [swtest](#swtest) | Shapiro-Wilk W test | ✔️ | - | - |
| [sem](#sem) | standard error of the mean | ✔️ | - | - |
| [frequency](#frequency) | frequency table | ✔️ | ✔️ | ✔️ |
| [geomean](#geomean) | geometric mean | ✔️ | - | - |
| [percentile](#percentile) | percentile | ✔️ | - | - |
| [sum](#sum) | sum | ✔️ | - | - |
| [harmean](#harmean) | harmonic mean | ✔️ | - | - |
| [range](#range) | range | ✔️ | - | - |
| [max](#max) | maximum | ✔️ | ✔️ | ✔️ |
| [kurtosis](#kurtosis) | kurtosis | ✔️ | - | - |
| [stdev](#stdev) | standard deviation | ✔️ | - | - |
| [avg](#avg) | arithmetic mean | ✔️ | - | - |
| [count](#count) | count | ✔️ | ✔️ | ✔️ |
| [varc](#varc) | coefficient of variation | ✔️ | - | - |
| [mci](#mci) | confidence interval of the mean | ✔️ | - | - |

---

### [KOLMOGOROV-SMIRNOV TEST](#kstest): kstest

Returns the statistical log of the Komogorov-Smirnov normality test of the distribution of vector values. It does not currently calculate the significance level of the test. The Kolmogorov-Smirnov test (often abbreviated as the K-S test) is a statistical test used to test the hypothesis that data come from a particular distribution. This test compares the data distribution to the theoretical distribution that the data is assumed to come from and evaluates whether the data values are close enough to the theoretical distribution that the hypothesis that the data come from the given distribution can be considered true.Kolmogorov test -Smirnov is often used to test the normality of data, but it can also be used to test if the data comes from another theoretical distribution, such as the exponential or binomial distribution. The Kolmogorov-Smirnov test is generally considered to be one of the most accurate tests of normality, but it has limited sensitivity for small samples, i.e. it may be less reliable in detecting non-normality for small samples. Therefore, other tests of normality, such as the Shapiro-Wilk test or the Anderson-Darling test, are often used for small samples. [Read more](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test#One-sample_Kolmogorov%E2%80%93Smirnov_statistic)

#### Method calling syntax


> (NumericVector).<mark>**kstest**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- *Kolmogorov-Smirnov test* `🟦 object`
  - **T**: *Kolmogorov-Smirnov test value* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`
  - **p**: *significance* `🔴 number`

#### Example

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

### [MINIMUM](#min): min

Returns the least non-empty value. For text, returns the first value from the alphabetical order.

#### Method calling syntax


> (NumericVector).<mark>**min**()

> (StringVector).<mark>**min**()

> (BooleanVector).<mark>**min**()


#### In-built default value filter

ndPx

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | ✔️ |
| boolean | ✔️ |

#### Output structure

- *any value type* `🟤 any type`

#### Example

```js
var numeric_min = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).min(); /* = 1 */;
var string_min = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").min(); /* = Fisher */
```

---

### [SKEWNESS](#skewness): skewness

Returns the skewness of the distribution, i.e. the asymmetry of the distribution around the mean value of the vector. [Read more](https://en.wikipedia.org/wiki/Skewness)

#### Method calling syntax


> (NumericVector).<mark>**skewness**(*is sample*)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | is sample | 🟣 binary | Checks if the value is binary in nature. Otherwise, it automatically converts the value to the boolean type and therefore never returns an error. | - |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var skewness_population = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(false); /* = 0.52*/
var skewness_sample = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(true); /* = 0.027*/
```

---

### [HISTOGRAM](#histogram): histogram

Returns the histogram matrix of the given vector. The method can be chosen with or without parameter specification. If the parameter 'maximum number of intervals' (maxIntervals) is not specified, its value is automatically calculated as the variation range/root of the number of elements. If the parameter 'fixed interval size' (fixedInterval) is specified, this value is taken as decisive for the number of intervals. The two values are not compatible (although they do not return an error), when specifying both, the maxIntervals parameter is taken as a priority. [Read more](https://en.wikipedia.org/wiki/Histogram)

#### Method calling syntax


> (NumericVector).<mark>**histogram**(*maximum intervals*, *fixed interval*)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **maxIntervals** | maximum intervals | 🔴 number | Checks if it is a positive integer. Otherwise, it will throw an error. | - |  |
| **fixedInterval** | fixed interval | 🔴 number | bpCq | - |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- *histogram* `🟩 array`
  - **from**: *the lower limit of the interval* `🔴 number`
  - **to**: *the upper limit of the interval* `🔴 number`
  - **n**: *frequency (abs.)* `🔴 whole number (integer)`
  - **nc**: *cumulative frequency (abs.)* `🔴 whole number (integer)`
  - **p**: *frequency (%)* `🔴 number`
  - **pc**: *cumulative frequency (%)* `🔴 number`

#### Example

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

### [MEDIAN](#median): median

Returns the median, or middle value, of the non-empty values of a vector. This is the 50% percentile. [Read more](https://en.wikipedia.org/wiki/Median)

#### Method calling syntax


> (NumericVector).<mark>**median**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var median = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).median(); /* = 21*/
```

---

### [MODE](#mode): mode

Returns the most frequent value in the vector (if the most frequent value is empty, returns the empty value). If there are more of the most frequent values (e.g. the frequency of X and Y values is the same), it returns the first value found in the vector. [Read more](https://en.wikipedia.org/wiki/Mode_(statistics))

#### Method calling syntax


> (NumericVector).<mark>**mode**()

> (StringVector).<mark>**mode**()

> (BooleanVector).<mark>**mode**()


#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | ✔️ |
| boolean | ✔️ |

#### Output structure

- *any value type* `🟤 any type`

#### Example

```js
var x = new NumericVector(1,2,3,4,3,4,5,3).mode(); /* = 3 */
var y = new StringVector("a",null,null,"b","c","d",null,"b").mode(); /* = null */
var z = new BooleanVector(true, false, true).mode(); /* = true */
```

---

### [VARIANCE](#variance): variance

Returns the variance value of this vector. The variance value is equal to the square of the standard deviation. [Read more](https://en.wikipedia.org/wiki/Variance)

#### Method calling syntax


> (NumericVector).<mark>**variance**(*is sample*)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | is sample | 🟣 binary | Checks if the value is binary in nature. Otherwise, it automatically converts the value to the boolean type and therefore never returns an error. | - |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance();  /* = 19.44 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance(true); /* = 21.6 */
```

---

### [ONE-SAMPLE T-TEST](#ttest): ttest

Returns the statistical log for a one-sample t-test given the population mean.

#### Method calling syntax


> (NumericVector).<mark>**ttest**(***population mean***)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **populationMean** | population mean | 🔴 number | Checks if the value is a number. Otherwise, it will throw an error. | ✔️ |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- *one-sample t-test* `🟦 object`
  - **t**: *T-value* `🔴 number`
  - **p**: *significance* `🔴 number`
  - **n**: *total of cases* `🔴 whole number (integer)`

#### Example

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

### [CONFIDENCE INTERVAL OF THE PROPORTION](#pci): pci

Returns the statistical log of the confidence interval estimate of the sample proportion at a specified significance level. [Read more](https://en.wikipedia.org/wiki/Confidence_interval)

#### Method calling syntax


> (NumericVector).<mark>**pci**(***the lookup value***, *level of importance*)

> (StringVector).<mark>**pci**(***the lookup value***, *level of importance*)

> (BooleanVector).<mark>**pci**(***the lookup value***, *level of importance*)


#### In-built default value filter

any value type

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **value** | the lookup value | 🟤 any type | Blaz | ✔️ |  |
| **confidenceLevel** | level of importance | 🔴 number | Checks if the value is a number between 0 and 1 (including boundary values). Otherwise, it will throw an error. | - | 0.95 |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | ✔️ |
| boolean | ✔️ |

#### Output structure

- *confidence interval of the proportion* `🟦 object`
  - **p**: *value share in %* `🔴 number`
  - **sig**: *level of significance* `🔴 number`
  - **delta**: *confidence interval (+-)* `🔴 number`
  - **lb**: *lower limit of the interval* `🔴 number`
  - **ub**: *upper limit of the interval* `🔴 number`

#### Example

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

### [SHAPIRO-WILK W TEST](#swtest): swtest

Returns the statistical log of the Shapiro-Wilk W test of normality of the distribution of vector values. The Shapiro-Wilk test is a statistical test used to test the hypothesis that the data come from a normal distribution. This test is often used to verify the normality of data in statistical analysis. The Shapiro-Wilk test is based on comparing the value of the quartiles of the data with the values of the quartiles of a normal distribution. When the quartile values of the data are similar to the quartile values of the normal distribution, it is likely that the data comes from a normal distribution. Otherwise, it is likely that the data is not normal. When using the Shapiro-Wilk test, it should be noted that this test has low sensitivity for large samples, i.e. for large samples the test may be less reliable in detecting non-normality. Therefore, other tests of normality, such as the Anderson-Darling test or the Kolmogorov-Smirnov test, are often used for large samples. [Read more](https://en.wikipedia.org/wiki/Shapiro%E2%80%93Wilk_test)

#### Method calling syntax


> (NumericVector).<mark>**swtest**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- *Shapiro-Wilk W test* `🟦 object`
  - **W**: *W-test value* `🔴 number`
  - **df**: *degrees of freedom* `🔴 whole number (integer)`
  - **p**: *significance* `🔴 number`

#### Example

```js
var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).swtest();
/*
{
"W": 0.9664039647188553,
"df": 23,
"p": 0.6036566524076283
}
*/
```

---

### [STANDARD ERROR OF THE MEAN](#sem): sem

Returns the value of the standard error of the estimate of the mean. The standard error of the mean is a statistical measure of the variability of the sample mean of the estimated parameter in the entire population. This is an estimate of the standard deviation of the sample mean. The mean error of the mean is calculated as the ratio of the estimated standard deviation of the sample mean to the square root of the sample size. The larger the sample size, the smaller the mean error of the mean, meaning that the estimate of the sample mean is more accurate and more closely aligned with the entire population mean. The mean error of the mean is useful for estimating confidence intervals of the sample mean, which allows us to determine how accurately it estimates the population mean. [Read more](https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_sample_mean)

#### Method calling syntax


> (NumericVector).<mark>**sem**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var sem = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).SEM(); /* = 0.67*/
```

---

### [FREQUENCY TABLE](#frequency): frequency

Returns a frequency table object with the breakdown of elements and their frequency. [Read more](https://en.wikipedia.org/wiki/Frequency_(statistics))

#### Method calling syntax


> (NumericVector).<mark>**frequency**(*table order mode*)

> (StringVector).<mark>**frequency**(*table order mode*)

> (BooleanVector).<mark>**frequency**(*table order mode*)


#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **order** | table order mode | 🔴 whole number (integer) | Checks if the value is a valid enumeration member. Otherwise, it will throw an error. | - | 1 |

#### Enumerators

##### table order mode

| value | description |
| :---: |  --- | 
| 1 | by frequency descending |
| 2 | by frequency ascending |
| 3 | by value ascending |
| 4 | by value descending |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | ✔️ |
| boolean | ✔️ |

#### Output structure

- *frequency table* `🟩 array`
  - **value**: *value* `🟤 any type`
  - **frequency**: *frequency table* `🔴 whole number (integer)`

#### Example

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

### [GEOMETRIC MEAN](#geomean): geomean

The geometric mean is a statistical indicator that is used to calculate the average value of some number or quantity. Unlike the arithmetic mean, which is calculated as the sum of all values in a set divided by the number of those values, the geometric mean is calculated as the nth root of the product of n numbers in the set. The geometric mean is often used to calculate growth or cumulative return in investments because it accounts for changes in the percentage growth of values over time. It is also used in geometry to calculate the average side length of an n-gon and in biology to calculate the average size of cells or organisms in a population. [Read more](https://en.wikipedia.org/wiki/Geometric_mean)

#### Method calling syntax


> (NumericVector).<mark>**geomean**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).geomean(); /* = 21.24*/
```

---

### [PERCENTILE](#percentile): percentile

Using the percentile, we can examine the distribution of a numerical series, by first sorting the series from the smallest to the largest member (number), and then selecting the first N % of members (this N is a parameter), where the last member in the selection represents the given percentile, a specific number . If the number of members in the sample is even, the percentile is calculated as the average of two adjacent values, if it is even, the percentile is just the last value. [Read more](https://en.wikipedia.org/wiki/Percentile)

#### Method calling syntax


> (NumericVector).<mark>**percentile**(***percentile value***)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **k** | percentile value | 🔴 number | Checks if the value is a number between 0 and 1 (including boundary values). Otherwise, it will throw an error. | ✔️ |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var score = new NumericVector(10,20,15,25,23,19,18,17,24,23);
var median = score.percentile(0.5); /* = 19.5 */
var q25 = score.percentile(0.25); /* = 17.25 */
var max = score.percentile(1); /* = 25 */
```

---

### [SUM](#sum): sum

Returns the sum of all non-empty numeric values of a vector. [Read more](https://en.wikipedia.org/wiki/Addition)

#### Method calling syntax


> (NumericVector).<mark>**sum**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
```

---

### [HARMONIC MEAN](#harmean): harmean

The harmonic mean is a statistical indicator that is used to calculate the average value of some number or quantity. Unlike the arithmetic mean and the geometric mean, which are based on the addition or multiplication of values, the harmonic mean is calculated as the quotient of the number of numbers in the set and the sum of their reciprocals. The harmonic mean is used in situations where it is important to account for how speed or power changes over time or in different situations. For example, it is used to calculate average speed, average power or average resistance in electronic circuits. It is also used in finance to calculate the average return on investments over different time periods. [Read more](https://en.wikipedia.org/wiki/Harmonic_mean)

#### Method calling syntax


> (NumericVector).<mark>**harmean**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var x = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).harmean(); /* = 21.03*/
```

---

### [RANGE](#range): range

Returns the difference between the largest and smallest non-empty values. [Read more](https://en.wikipedia.org/wiki/Range_(statistics))

#### Method calling syntax


> (NumericVector).<mark>**range**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var range = new NumericVector(5,2,-15,-16.3,12,null, null, 12,13,7).range(); /* = 22 */
```

---

### [MAXIMUM](#max): max

Returns the highest non-empty value. In the case of text, it returns the last value from the alphabetical order.

#### Method calling syntax


> (NumericVector).<mark>**max**()

> (StringVector).<mark>**max**()

> (BooleanVector).<mark>**max**()


#### In-built default value filter

ndPx

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | ✔️ |
| boolean | ✔️ |

#### Output structure

- *any value type* `🟤 any type`

#### Example

```js
var numeric_max = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).max(); /* = 9.1 */;
var string_max = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").max(); /* = Poisson */
```

---

### [KURTOSIS](#kurtosis): kurtosis

Returns the excess value of the data set. In statistics, kurtosis refers to the measure of how much the values in a collection of data differ from the mean value. Skewness is usually calculated for a data distribution curve, which is a graphical representation of the distribution of values in a given collection of data.
There are two basic types of kurtosis: platykurtosis and leptokurtosis. Platykurtosis occurs when the values of a vector are distributed more or less uniformly around the mean value. This distribution appears as a U-shaped distribution curve that has a flat top. Conversely, leptokurtosis occurs when the values in a data collection are distributed with a significant deviation from the mean value. This distribution manifests itself as a 'peaked hill letter' or 'pointed valley letter' shaped distribution curve.
Skewedness is used to determine whether the distribution of values in a collection of data is more or less uniform, or whether there are any significant deviations from the mean value. Skewness is often used along with other metrics such as median, skewness, and quantiles to help you better understand the distribution of data and determine if there are any significant deviations from the mean value. [Read more](https://en.wikipedia.org/wiki/Kurtosis)

#### Method calling syntax


> (NumericVector).<mark>**kurtosis**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var kurtosis = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).kurtosis(); /* = 0.425*/
```

---

### [STANDARD DEVIATION](#stdev): stdev

Returns the standard deviation of non-empty values. The standard deviation is a statistical indicator that indicates how much the values in a given data set differ from each other. The standard deviation is expressed as a number that indicates how much the average value deviates from the true value in a given data set. The standard deviation is useful when comparing the amount of dispersion of data in different sets or in different groups within a single data set. The larger the standard deviation, the more the values in a given data set differ from each other. [Read more](https://en.wikipedia.org/wiki/Standard_deviation)

#### Method calling syntax


> (NumericVector).<mark>**stdev**(*is sample*)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | is sample | 🟣 binary | Checks if the value is binary in nature. Otherwise, it automatically converts the value to the boolean type and therefore never returns an error. | - |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev();  /* = 4.41 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev(true); /* = 4.65 */
```

---

### [ARITHMETIC MEAN](#avg): avg

Returns the arithmetic mean (i.e. the quotient of the sum and the number of vector values) of all non-empty values (i.e. including zeros). [Read more](https://en.wikipedia.org/wiki/Arithmetic_mean)

#### Method calling syntax


> (NumericVector).<mark>**avg**()


#### In-built default value filter

Only numeric values including zeros.

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).avg();  /* = 75 */
```

---

### [COUNT](#count): count

Returns the count of all members of a vector, including empty values.

#### Method calling syntax


> (NumericVector).<mark>**count**()

> (StringVector).<mark>**count**()

> (BooleanVector).<mark>**count**()


#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | ✔️ |
| boolean | ✔️ |

#### Output structure

- *whole positive nunber (inc. zero)* `🔴 whole number (integer)`

#### Example

```js
var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
```

---

### [COEFFICIENT OF VARIATION](#varc): varc

The coefficient of variation (also called relative variance) is a statistical indicator that measures the degree of variability or dispersion of data relative to its mean value. It is a dimensionless measure of variability that allows the variance of different data sets to be compared regardless of the units in which the data are expressed. The coefficient of variation is calculated as the ratio of the standard deviation (sigma) to the mean (x) in the data set, multiplied by 100 to express it as a percentage. where the coefficient of variation is low, it means that the data are relatively homogeneous or not widely dispersed relative to the mean. If, on the other hand, it is high, it means that the data is very diverse or significantly different from the average. The coefficient of variation is mainly used to compare the variability between different data sets. For example, it is often used in biology, medicine, economics, psychology, and sociology to measure the variability of different populations or groups. [Read more](https://en.wikipedia.org/wiki/Coefficient_of_variation)

#### Method calling syntax


> (NumericVector).<mark>**varc**(*is sample*)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **s** | is sample | 🟣 binary | Checks if the value is binary in nature. Otherwise, it automatically converts the value to the boolean type and therefore never returns an error. | - |  |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- ** `🔴 number`

#### Example

```js
var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc();  /* = 0.227 */
var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc(true); /* = 0.24 */
```

---

### [CONFIDENCE INTERVAL OF THE MEAN](#mci): mci

Returns the statistical log of the confidence interval estimate of the sample mean at a specified significance level. If the number of cases is less than 30, the Student's T-distribution is used, otherwise the standardized normal distribution is used. [Read more](https://en.wikipedia.org/wiki/Confidence_interval)

#### Method calling syntax


> (NumericVector).<mark>**mci**(*level of importance*)


#### In-built default value filter

Only numeric values including zeros.

#### Arguments

| id | description | value type | validator | required | default value |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **confidenceLevel** | level of importance | 🔴 number | Checks if the value is a number between 0 and 1 (including boundary values). Otherwise, it will throw an error. | - | 0.95 |

#### Integration by Vector type

| vector type | availability |
| --- |  :---: | 
| numeric | ✔️ |
| string | - |
| boolean | - |

#### Output structure

- *confidence interval of the mean* `🟦 object`
  - **m**: *arithmetic mean* `🔴 number`
  - **sig**: *level of significance* `🔴 number`
  - **delta**: *confidence interval (+-)* `🔴 number`
  - **lb**: *lower limit of the interval* `🔴 number`
  - **ub**: *upper limit of the interval* `🔴 number`

#### Example

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