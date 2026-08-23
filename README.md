# Savage‑Snap

A ruthless, headless screenshot service that turns any URL into a pixel‑perfect PNG in milliseconds.  
Built for developers who demand speed, precision, and zero bullshit.

**Concept & Architecture** by **Spencer** – because the web should bend to your will.

---

## 🔥 The Core

- **Puppeteer‑powered Chromium** – launched on‑the‑fly, killed the moment the job’s done.
- **Full‑page captures** – no viewport clipping, no lazy‑loaded leftovers.
- **Dynamic viewport control** – per‑request overrides, backed by sensible environment defaults.
- **Stateless & scalable** – each request is isolated; throw it behind a load balancer and watch it eat traffic.

## 🧠 Under the Hood

- `Express` handles the HTTP layer – clean, lightweight, and async‑ready.
- `Puppeteer` spins up a fresh browser context per request, guaranteeing zero cross‑pollution.
- Screenshot options (`fullPage`, `width`, `height`) are parsed from query strings and merged with env‑based fallbacks.
- The image buffer streams straight back – no temp files, no disk I/O, just raw speed.

## ⚙️ Configurability (the Spencer touch)

| Env Var | Purpose |
|---------|---------|
| `PORT` | Where the service listens (default: 3000) |
| `SCREEN_WIDTH` | Global viewport width (default: 1920) |
| `SCREEN_HEIGHT` | Global viewport height (default: 1080) |

Overrides? Pass `?width=...&height=...` in the URL – Spencer thought of everything.

---

*Zero friction. Zero excuses. Just screenshots – on your terms.*
