# Agent_REF

A lightweight context framework designed to ground AI coding agents in your project's specific domain logic, business rules, and technical requirements.

---

## 🚀 Quick Start

1. In your project, create the `REF/CONTEXT` folder and the `001_PROJECT_CONTEXT.md` file, then fill it with your project's general description and business rules.
2. Copy the text in `agentrules.md` inside your agent instructions, and it will perform automatically.

---

## ⚙️ How It Works

```
┌──────────────────────────────┐
│  001_PROJECT_CONTEXT.md      │ ──► Reads domain logic & technical constraints
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        agentrules.md         │ ──► Enforces execution rules & operational guidelines
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Context-Aware Code & Output  │ ──► Generates tailored, production-ready code
└──────────────────────────────┘
```

1. **Context Reading:** The agent reads `001_PROJECT_CONTEXT.md` to understand your project's background and logic.
2. **Rule Enforcement:** The agent follows the rules defined in `agentrules.md`.
3. **Execution:** Code and tasks are executed automatically aligned with your setup.
