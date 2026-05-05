# Launch punch list

Žije souběžně s `TODO_FILIP.md`. Sem zapisuj **konkrétní bugy** a **drobnosti**, které vylezou při manuálním QA průchodu na produkci, předtím než přepneš Stripe na live mode.

## Test matrix (Task 34 z plánu)

Odškrtni hned jak otestuješ, do "Notes" piš pozorování.

| # | Scénář | Steps | Expected | Status | Notes |
|---|---|---|---|---|---|
| 1 | Single buy bez bumpu | `/ai-grafika` → Koupit → fill → pay 399 Kč | Order paid, 1 download link, 1 email | ☐ | |
| 2 | Single buy S bumpem | `/ai-grafika` → toggle bump → pay 999 Kč | Bundle paid, 4 download linky, mail s bonusem | ☐ | |
| 3 | Bundle direct | `/bundle` → Koupit → pay 999 Kč | Bundle paid, 4 download linky | ☐ | |
| 4 | Validace mix | curl s `bundle + ai-grafika` | 400 error | ☐ | |
| 5 | Validace bonus alone | curl s `bonus-prvni-klient` only | 400 error | ☐ | |
| 6 | Lead signup | Footer formulář | Mailerlite kontakt + automation | ☐ | |
| 7 | Resend lost link | `/kontakt` → resend form | Nový email | ☐ | |
| 8 | Refund | Stripe Dashboard refund | Status `refunded`, admin email | ☐ | |
| 9 | Tracking | Meta Events Manager Test events | Purchase event s value 999 Kč | ☐ | |

## Browser matrix

- ☐ Chrome desktop (mac/win)
- ☐ Safari iOS (Apple Pay button v Stripe Payment Elementu)
- ☐ Chrome Android (Google Pay button)
- ☐ Firefox desktop

## Bug log (volné poznámky)

(přidávej řádky podle potřeby)

- [ ] **Bug:** _zde pište_
  - Severity: blocker / major / minor
  - Page: `/...`
  - Steps:
  - Expected:
  - Actual:

---

## Před tagem v1.0-launch

- [ ] Všechny testy 1–9 prošly
- [ ] Žádný blocker bug otevřený
- [ ] Stripe v live mode + 1 Kč test purchase úspěšný
- [ ] Reálné PDF nahrané (ne placeholders)
- [ ] Filipova fotka v `/public/filip.jpg`
- [ ] OG image `/public/og-image.png` (1200×630)
- [ ] Doplněné IČ + sídlo v footeru a OP
- [ ] Legal review OP a GDPR
- [ ] Email z `filip@pohodazdomova.cz` se v Resend Test Domain ukazuje jako verified

Až všechno odškrtnuté:
```bash
git tag v1.0-launch
git push --tags
git push
```
