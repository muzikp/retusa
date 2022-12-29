# Matice

Bablablablabla.

## Statistické metody



---

### [ANOVA](#anovaow): anovaow

Vrátí statistický protokol analýzy rozptylu jednoduchého třídění (One-way ANOVA). Vstupem analýzy je matice s již předvybranými numerickými vektory.

#### Způsob volání metody

> [Matrix instance].**anovaow**(***první proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | [❤️💛💜] matice | Ověří, zdali je hodnota typu numerické matice (tedy matice obsahující pouze numerické vektory). V opačném případě vyvolá chybu. | ✔️ |  |

---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlBiserial): correlBiserial

Vrátí statistický protokol Spearmanova korelačního koeficientu.

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

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlKendall): correlKendall

Vrátí statistický protokol Spearmanova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlKendall**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

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

---

### [SPEARMANŮV KORELAČNÍ KOEFICIENT](#correlPhi): correlPhi

Vrátí statistický protokol Spearmanova korelačního koeficientu.

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

Vrátí statistický protokol Spearmanova korelačního koeficientu.

#### Způsob volání metody

> [Matrix instance].**correlSpearman**(***první proměnná***, ***druhá proměnná***)


#### Automatický filtr hodnot

Vybere napříč maticí pouze ty řádky, které v rámci své řady neobsahují ani jednu prázdnou hodnotu (null).

#### Argumenty

| argument | popis | typ hodnoty | validátor | povinný | defaultní hodnota |
| :---: |  :---: |  --- |  :---: |  :---: |  :---: | 
| **x** | první proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |
| **y** | druhá proměnná | ❤️ numerický vektor | Ověří, zdali je hodnota instancí třídy Variable číselného typu (typ 1, hodnota typu NumericArray). V opačném případě se někdy pokusí hodnotu převést na danou instanci, záleží na volající metodě. | ✔️ |  |

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