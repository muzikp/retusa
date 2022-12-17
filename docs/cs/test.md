# Vektory

## Statistické metody

---

### HISTOGRAM

Vrátí matici histogramu daného vektoru.

#### Pre-filtr

Pouze číselné hodnoty (včetně nul).

#### Argumenty

| argument | popis | vaidátor | povinný | defaultní hodnota | vícenásobný |
| --- | --- | --- | --- | --- | --- |
| maxIntervals | Maximální počet intervalů | Ověří, zdali se jedná o celé kladné číslo. V opačném případě vyvolá chybu. | - | - | - |
| fixedInterval | Pevná velikost intervalu | Ověří, zdali se jedná o číselnou hodnotu větší než nula. V opačném případě vyvolá chybu. | - | - | - |

#### Integrace dle třídy

| numerická | ano |
| nominální | - |
| binární | - |

### PERCENTIL

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
| nominální | - |
| binární | - |