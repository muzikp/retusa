# Matice

Bablablablabla.

## Statistické metody



---

### [ANOVA](#anovaow): anovaow

Vrátí statistický protokol analýzy rozptylu jednoduchého třídění (One-way ANOVA). Vstupem analýzy je matice s již předvybranými numerickými vektory.

#### Způsob volání metody

> [Matrix instance].**anovaow**(***první proměnná***)


---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlBiserial): correlBiserial

Vrátí statistický protokol Spearmanova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlBiserial**()***první proměnná***, ***druhá proměnná***)


---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlKendall): correlKendall

Vrátí statistický protokol Spearmanova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlKendall**(***první proměnná***, ***druhá proměnná***)


---

### [PARCIÁLNÍ KORELACE](#correlPartial): correlPartial

Vrátí statistický protokol parciálního korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlPartial**()***první proměnná***, ***druhá proměnná***, ***třetí proměnná***)


---

### [PEARSONŮV KORELAČNÍ KOEFICIENT](#correlPearson): correlPearson

Vrátí statistický protokol Pearsonova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlPearson**(***první proměnná***, ***druhá proměnná***)


---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlPhi): correlPhi

Vrátí statistický protokol Spearmanova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlPhi**()***první proměnná***, ***druhá proměnná***)


---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlSpearman): correlSpearman

Vrátí statistický protokol Spearmanova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlSpearman**(***první proměnná***, ***druhá proměnná***)


---

### [LINEÁRNÍ REGRESE](#linreg): linreg

Vrátí statistický protokol lineární regrese. Součástí vráceného objektu je i funkce (fn), pomocí které lze modelovat situace závislé proměnné při zadání hodnoty závislé proměnné.

#### Způsob volání metody

> [Matrix instance].**linreg**(***nezávislá proměnná x***, ***závislá proměnná y***)


---

### [MANN-WHITNEY](#mannwhitney): mannwhitney

Vrátí statistický protokol Mann-Whitneyho U testu.

#### Způsob volání metody

> [Matrix instance].**mannwhitney**(***první proměnná***, ***druhá proměnná***)


---

### [T-TEST (NEZÁVISLÝ)](#ttestind): ttestind

Vrátí statistický protokol Studentova t-testu pro dva nezávislé výběry, které jsou definovány vlastní proměnnou (tedy dvěma numerickými vektory).

#### Způsob volání metody

> [Matrix instance].**ttestind**(***první proměnná***, ***druhá proměnná***)


---

### [T-TEST (PÁROVÝ)](#ttestpair): ttestpair

Vrátí statistický protokol párového t-testu pro dva závislé výběry.

#### Způsob volání metody

> [Matrix instance].**ttestpair**(***první proměnná***, ***druhá proměnná***)
