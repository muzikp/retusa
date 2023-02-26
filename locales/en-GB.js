module.exports = {
	"0001": "unknown locale key: ${value}",
	"gvdg": "sum",
	"iMbD": "Returns the sum of all non-empty numeric values of a vector.",
	"tdrm": "count",
	"ULJX": "Returns the count of all members of a vector, including empty values.",
	"eFdj": "geometric mean",
	"PDzr": "The geometric mean is a statistical indicator that is used to calculate the average value of some number or quantity. Unlike the arithmetic mean, which is calculated as the sum of all values in a set divided by the number of those values, the geometric mean is calculated as the nth root of the product of n numbers in the set. The geometric mean is often used to calculate growth or cumulative return in investments because it accounts for changes in the percentage growth of values over time. It is also used in geometry to calculate the average side length of an n-gon and in biology to calculate the average size of cells or organisms in a population.",
	"iuTi": "harmonic mean",
	"nhJv": "The harmonic mean is a statistical indicator that is used to calculate the average value of some number or quantity. Unlike the arithmetic mean and the geometric mean, which are based on the addition or multiplication of values, the harmonic mean is calculated as the quotient of the number of numbers in the set and the sum of their reciprocals. The harmonic mean is used in situations where it is important to account for how speed or power changes over time or in different situations. For example, it is used to calculate average speed, average power or average resistance in electronic circuits. It is also used in finance to calculate the average return on investments over different time periods.",
	"KZgI": "skewness",
	"nJbe": "Returns the skewness of the distribution, i.e. the asymmetry of the distribution around the mean value of the vector.",
	"oPPx": "kurtosis",
	"UOBG": "Returns the excess value of the data set. In statistics, kurtosis refers to the measure of how much the values in a collection of data differ from the mean value. Skewness is usually calculated for a data distribution curve, which is a graphical representation of the distribution of values in a given collection of data.\nThere are two basic types of kurtosis: platykurtosis and leptokurtosis. Platykurtosis occurs when the values of a vector are distributed more or less uniformly around the mean value. This distribution appears as a U-shaped distribution curve that has a flat top. Conversely, leptokurtosis occurs when the values in a data collection are distributed with a significant deviation from the mean value. This distribution manifests itself as a 'peaked hill letter' or 'pointed valley letter' shaped distribution curve.\nSkewedness is used to determine whether the distribution of values in a collection of data is more or less uniform, or whether there are any significant deviations from the mean value. Skewness is often used along with other metrics such as median, skewness, and quantiles to help you better understand the distribution of data and determine if there are any significant deviations from the mean value.",
	"fPra": "percentile",
	"yNbM": "Using the percentile, we can examine the distribution of a numerical series, by first sorting the series from the smallest to the largest member (number), and then selecting the first N % of members (this N is a parameter), where the last member in the selection represents the given percentile, a specific number . If the number of members in the sample is even, the percentile is calculated as the average of two adjacent values, if it is even, the percentile is just the last value.",
	"dBDt": "percentile value",
	"GQpQ": "A percentile value from a closed interval between 0 and 1 inclusive. Eg. 0 = minimum value, 0.25 = first quartile, 0.5 = median, 1 = maximum, etc.",
	"Qyba": "median",
	"YIir": "Returns the median, or middle value, of the non-empty values of a vector. This is the 50% percentile.",
	"StQx": "mode",
	"IBfx": "Returns the most frequent value in the vector (if the most frequent value is empty, returns the empty value). If there are more of the most frequent values (e.g. the frequency of X and Y values is the same), it returns the first value found in the vector.",
	"rR94": "arithmetic mean",
	"UYJN": "Returns the arithmetic mean (i.e. the quotient of the sum and the number of vector values) of all non-empty values (i.e. including zeros).",
	"oUcc": "standard deviation",
	"ZgSc": "Returns the standard deviation of non-empty values. The standard deviation is a statistical indicator that indicates how much the values in a given data set differ from each other. The standard deviation is expressed as a number that indicates how much the average value deviates from the true value in a given data set. The standard deviation is useful when comparing the amount of dispersion of data in different sets or in different groups within a single data set. The larger the standard deviation, the more the values in a given data set differ from each other.",
	"eJTq": "is sample",
	"FfpU": "Specifies whether the vector represent a sample. True if it is a sample, otherwise false (default false).",
	"FkaD": "minimum",
	"yBlA": "Returns the least non-empty value. For text, returns the first value from the alphabetical order.",
	"nKuF": "maximum",
	"gkep": "Returns the highest non-empty value. In the case of text, it returns the last value from the alphabetical order.",
	"TvQv": "variance",
	"sfCh": "Returns the variance value of this vector. The variance value is equal to the square of the standard deviation.",
	"PAwR": "histogram",
	"AISp": "Returns the histogram matrix of the given vector. The method can be chosen with or without parameter specification. If the parameter 'maximum number of intervals' (maxIntervals) is not specified, its value is automatically calculated as the variation range/root of the number of elements. If the parameter 'fixed interval size' (fixedInterval) is specified, this value is taken as decisive for the number of intervals. The two values are not compatible (although they do not return an error), when specifying both, the maxIntervals parameter is taken as a priority.",
	"WnZK": "maximum intervals",
	"mcOp": "Specifies the maximum number of intervals the method can generate. The argument is appropriate to choose when we have too many cases in the vector and the standard way of calculating the size of the interval leads to too many categories.",
	"Mnfn": "fixed interval",
	"yOuB": "Specifies the size of the interval, according to which the method then classifies the cases. The argument is appropriate to choose when we have too many cases in the vector and the standard way of calculating the size of the interval leads to too many categories.",
	"mXxJ": "range",
	"dnzB": "Returns the difference between the largest and smallest non-empty values.",
	"uwpU": "coefficient of variation",
	"fUpj": "The coefficient of variation (also called relative variance) is a statistical indicator that measures the degree of variability or dispersion of data relative to its mean value. It is a dimensionless measure of variability that allows the variance of different data sets to be compared regardless of the units in which the data are expressed. The coefficient of variation is calculated as the ratio of the standard deviation (sigma) to the mean (x) in the data set, multiplied by 100 to express it as a percentage. where the coefficient of variation is low, it means that the data are relatively homogeneous or not widely dispersed relative to the mean. If, on the other hand, it is high, it means that the data is very diverse or significantly different from the average. The coefficient of variation is mainly used to compare the variability between different data sets. For example, it is often used in biology, medicine, economics, psychology, and sociology to measure the variability of different populations or groups.",
	"dYJK": "frequency table",
	"Tzyp": "Returns a frequency table object with the breakdown of elements and their frequency.",
	"gZCx": "table order mode",
	"MgID": "Specifies the key to sort the data in the output table. It is possible to choose one of four methods (max-min, min-max, A-Z, Z-A), while the default sorting is according to frequency from largest to smallest.",
	"AUbD": "by frequency descending",
	"WSJH": "by frequency ascending",
	"dkxz": "by value ascending",
	"vJCU": "by value descending",
	"dLmV": "standard error of the mean",
	"ZBnI": "Returns the value of the standard error of the estimate of the mean. The standard error of the mean is a statistical measure of the variability of the sample mean of the estimated parameter in the entire population. This is an estimate of the standard deviation of the sample mean. The mean error of the mean is calculated as the ratio of the estimated standard deviation of the sample mean to the square root of the sample size. The larger the sample size, the smaller the mean error of the mean, meaning that the estimate of the sample mean is more accurate and more closely aligned with the entire population mean. The mean error of the mean is useful for estimating confidence intervals of the sample mean, which allows us to determine how accurately it estimates the population mean.",
	"VEAt": "one-sample t-test",
	"rbjM": "Returns the statistical log for a one-sample t-test given the population mean.",
	"GRoZ": "population mean",
	"xtfz": "The value of the population (comparative) arithmetic mean against which the testing is performed.",
	"yHjW": "confidence interval of the mean",
	"DDpa": "Returns the statistical log of the confidence interval estimate of the sample mean at a specified significance level. If the number of cases is less than 30, the Student's T-distribution is used, otherwise the standardized normal distribution is used.",
	"lFlm": "level of importance",
	"SMbe": "The value of the significance level at which the interval is tested. If the number of cases is less than 30, the Student's T-distribution is used, otherwise the standardized normal distribution is used.",
	"ZhjW": "confidence interval of the proportion",
	"KLpa": "Returns the statistical log of the confidence interval estimate of the sample proportion at a specified significance level.",
	"obxp": "the lookup value",
	"QOvf": "The value whose proportion within the vector is to be calculated. It can be any value, but it should meet the criteria of the factor (e.g. text, etc. for a nominal vector).",
	"byTa": "Shapiro-Wilk W test",
	"LHkd": "Returns the statistical log of the Shapiro-Wilk W test of normality of the distribution of vector values. The Shapiro-Wilk test is a statistical test used to test the hypothesis that the data come from a normal distribution. This test is often used to verify the normality of data in statistical analysis. The Shapiro-Wilk test is based on comparing the value of the quartiles of the data with the values of the quartiles of a normal distribution. When the quartile values of the data are similar to the quartile values of the normal distribution, it is likely that the data comes from a normal distribution. Otherwise, it is likely that the data is not normal. When using the Shapiro-Wilk test, it should be noted that this test has low sensitivity for large samples, i.e. for large samples the test may be less reliable in detecting non-normality. Therefore, other tests of normality, such as the Anderson-Darling test or the Kolmogorov-Smirnov test, are often used for large samples.",
	"AgIP": "More examples (minimum 3) are needed to calculate the W value of the Shapiro-Wilk test.",
	"zxmM": "Range of values too small: ${range}",
	"TSCM": "Range of values too large: ${range}",
	"yhzq": "Too many values in the vector (over 5000).",
	"DLoe": "Kolmogorov-Smirnov test",
	"yQZd": "Returns the statistical log of the Komogorov-Smirnov normality test of the distribution of vector values. It does not currently calculate the significance level of the test. The Kolmogorov-Smirnov test (often abbreviated as the K-S test) is a statistical test used to test the hypothesis that data come from a particular distribution. This test compares the data distribution to the theoretical distribution that the data is assumed to come from and evaluates whether the data values are close enough to the theoretical distribution that the hypothesis that the data come from the given distribution can be considered true.Kolmogorov test -Smirnov is often used to test the normality of data, but it can also be used to test if the data comes from another theoretical distribution, such as the exponential or binomial distribution. The Kolmogorov-Smirnov test is generally considered to be one of the most accurate tests of normality, but it has limited sensitivity for small samples, i.e. it may be less reliable in detecting non-normality for small samples. Therefore, other tests of normality, such as the Shapiro-Wilk test or the Anderson-Darling test, are often used for small samples.",
	"sDgR": "significance",
	"cBNP": "T-value",
	"OYQu": "degrees of freedom",
	"pelN": "number",
	"FxzE": "any value type",
	"DQnl": "whole number (integer)",
	"IrhN": "whole positive nunber (inc. zero)",
	"OQnL": "decimal number between 1 and 0 (including)",
	"RFGF": "string",
	"XPGc": "binary",
	"jbqY": "the lower limit of the interval",
	"GlDV": "the upper limit of the interval",
	"eHkc": "frequency (abs.)",
	"Dwuz": "cumulative frequency (abs.)",
	"iDVx": "frequency (%)",
	"oIyG": "cumulative frequency (%)",
	"ZVbP": "value",
	"mXpR": "frequency table",
	"bLoI": "total of cases",
	"mjPq": "level of significance",
	"NzBg": "confidence interval (+-)",
	"GynK": "lower limit of the interval",
	"iIPc": "upper limit of the interval",
	"nCHN": "value share in %",
	"nZvR": "W-test value",
	"jBSf": "Kolmogorov-Smirnov test value",
	"UyOj": "This vector type only accepts numeric and empty values. Returned error value: ${value}",
	"HhLt": "Unknown enumerator value ${name}: ${value}; possible values are ${keys}",
	"ibNu": "Method '${method}' is not intended for ${type} vector.",
	"FepU": "Expected value of type Array, recieved ${value} instead",
	"FIQW": "A value of type NumericMatrix was expected, ${value} was found instead",
	"OrZc": "Checks if the value is of NumericMatrix type (that is, a matrix containing only numeric vectors). Otherwise, an error is thrown.",
	"Jphg": "Not a numeric value: ${value}.",
	"vKlu": "The value must be between 0 and 1 inclusive; entered value ${value}.",
	"jrQP": "If a specific matrix instance is not specified as an instance property of the MatrixMethod class (the 'parent' property), an empty result is returned when the calculation or validation method is called.",
	"RLob": "Argument must be a vector; recieved ${value}",
	"Kvpv": "Argument must be a numeric vector",
	"KvHv": "Argument must be a binary (boolean) vector.",
	"NfvF": "Checks if the value is a number. Otherwise, it will throw an error.",
	"GweD": "Checks if the value is a number between 0 and 1 (including boundary values). Otherwise, it will throw an error.",
	"GHFj": "Checks if the value is binary in nature. Otherwise, it automatically converts the value to the boolean type and therefore never returns an error.",
	"GJry": "Checks if the value is of type Vector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method.",
	"gGTf": "Checks if the value is of type NumericVector. Otherwise, it sometimes tries to cast the value to the given instance, depending on the calling method.",
	"HOuY": "The value cannot be empty.",
	"pxGY": "Checks if the value is not empty (except 0 and false). Otherwise, it returns an error.",
	"nQvK": "A vector of type ${type} cannot be used in the given set of vectors.",
	"eJTP": "The value of the ${title} (${name}) parameter can only be a set of vectors or their identifiers (even if only a single element in the set is required).",
	"kdjd": "The minimum number of vectors in the set for parameter '${title}' (${name}) is ${value}, specified by ${param}.",
	"qkPg": "The maximum number of vectors in the set for parameter '${title}' (${name}) is ${value}, specified by ${param}.",
	"wRbe": "function",
	"rlTY": "method",
	"LOYN": "numeric",
	"zoiB": "string",
	"OkoC": "boolean",
	"oPEt": "Method calling syntax",
	"VVSN": "In-built default value filter",
	"GDkm": "Only numeric values including zeros.",
	"NizL": "Integration by Vector type",
	"AfXp": "vector type",
	"picU": "availability",
	"KxQM": "Output structure",
	"nzmJ": "Example",
	"FRpk": "Arguments",
	"QUJS": "id",
	"jBGO": "description",
	"dmmV": "value type",
	"tGqA": "validator",
	"VPYX": "required",
	"pDgb": "default value",
	"WLsu": "Read more",
	"llQx": "whole number (integer)",
	"oMas": "any type",
	"kLhB": "object",
	"qdkt": "array",
	"P94q": "Vector statistical analysis methods",
	"rL7a": "The basic class of the application is Vector, i.e. an array of elements. Vector is a class that inherits from Array and thus inherits with it all of its original methods, while extending it with dozens more - these extension methods are described below. In addition, the Vector class has many other methods of its own, such as content generation functions, sort/order methods, methods to write and read metadata etc. This part of the documentation will be processed gradually. The Vector class is accessible to the user through three inherited classes that validate the type of values that can become their members (NumericVector, StringVector and BooleanVector), while the availability of methods for each type of class is different (e.g. for a StringVector instance I cannot use the method diameter).",
	"pTvR": "Pearson correlation coefficient",
	"wPyG": "Returns the statistical log of the Pearson correlation coefficient.\nThe Pearson correlation is a statistical method used to measure the relationship between two quantities. Its goal is to find out if there is a linear relationship between these quantities and what its intensity is.\nPearson's correlation is calculated using a formula called Pearson's correlation coefficient. This coefficient ranges from -1 to 1 and indicates how strong the relationship is between the quantities. If the coefficient is close to -1, it means that there is a strong negative relationship between the quantities, which means that when the value of one quantity increases, the value of the other quantity decreases. On the contrary, if the coefficient is close to 1, it means that there is a strong positive relationship between the quantities, which means that when the value of one quantity increases, the value of the other quantity also increases. If the coefficient is close to 0, it means that there is no relationship between the quantities or the relationship is very weak.\nPearson's correlation is mainly used to compare two quantitative quantities, i.e. quantities that can be measured on a scale with exact values (for example, age, height or weight). It can be used to determine whether there is a relationship between these quantities and what its character is. For example, Pearson's correlation can be used to compare age and weight and see if there is a relationship between these quantities and what its nature is. It can also be used to compare the results of two different tests and see if there is a relationship between the results of those tests. Source: https://chat.openai.com/chat",
	"qFEM": "first variable",
	"tpUu": "second variable",
	"tpUR": "third (control) variable",
	"eJTT": "Spearman's correlation coefficient",
	"AGi": "Returns the statistical log of the Spearman rank correlation coefficient. Unlike the Pearson correlation, the Spearman method is based on a comparison of the order of magnitude of the values of the input variables.",
	"mgBC": "Kendall Tau-b",
	"VOmC": "Returns the statistical log of Kendall's Tau-B correlation coefficient. If you were to calculate the same operation in SPSS, you would probably get a slightly different result. Apparently, this is due to the different sensitivity to decimal places in the two systems. However, it should not have a major influence on the interpretation of the result.",
	"xfSf": "partial correlation",
	"UcfZ": "Partial correlation is a statistical method that allows you to find out what the relationship is between two variables while taking into account the influence of a third variable. This is useful if you want to see if there is a direct relationship between two variables without being affected by the influence of other variables. For example, if you want to find out if there is a relationship between level of training and success at work, it may be useful to consider the effect of age or gender as well. In that case, you could use partial correlation to find the relationship between level of training and success at work while controlling for the effects of age and gender. The partial correlation is calculated using a formula that is derived from the Pearson correlation coefficient. It is important to note that partial correlation does not imply causation, i.e. that one variable does not cause the other, but only shows that there is some association between them. Source: https://chat.openai.com/chat.",
	"AagR": "biserial correlation",
	"OMiA": "Biserial correlation is a statistical method that is used to evaluate the relationship between two binary variables (ie variables that can have only two possible values, such as 'yes' or 'no'). Binary variables are often used in the social sciences, for example when examining the relationship between education and employment or between smoking and health. Biserial correlation is calculated using a formula that is derived from the Pearson correlation coefficient. It is important to note that biserial correlation does not imply causation, i.e. that one variable does not cause the other, but only shows that there is some association between them.",
	"YqRh": "T-test (independent)",
	"gILL": "Returns the statistical log of the Student's t-test for two independent samples that are defined by an eigenvariable (that is, two numeric vectors). Arguments are either two numeric vectors, or one numeric and only a factor vector (usually text, but can also be numeric or binary). If a vector that has more than two unique values is used as a factor, only the first two unique values found are considered for the test (the others are ignored) - in this case, the information about the size of the pure sample is irrelevant, however, the level of significance to which the sample size enters, it is already based on pure cases.",
	"mmXD": "T-test (paired)",
	"kPqo": "Returns the statistical log of a paired t-test for two dependent samples. Empty values are cut out in the row cross-section, i.e. that if at least one value is missing in one row, the entire row is cut from the analysis.",
	"yWUM": "numeric vector",
	"rAyq": "Selects all data from the original matrix (ie no filtering).",
	"IIlO": "method output log",
	"DfLu": "matrix",
	"aaVG": "Checks if the value is a valid enumeration member. Otherwise, it will throw an error.",
	"dFiw": "Checks if it is a positive integer. Otherwise, it will throw an error.",
	"iY0c": "Enumerators",
	"9oHx": "value",
	"bB5f": "description",
	"NgVa": "Tau-b",
	"mgBA": "Tau-a",
	"boQk": "binary (boolean) vector",
	"OCKc": "Checks if the value is of type binary (boolean) vector. Otherwise, it will throw an error.",
	"CPwN": "Removes empty values from vectors without deleting a row in one vector affecting another vector."
}