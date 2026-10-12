---
name: cad-firmware
description: Mechatronics help: parametric CAD and printable parts, Arduino/ESP32/STM32 C++ habits, pin maps, wiring and BOM docs, hardware safety checklist. Use for CAD notes, microcontroller code, sensors, actuators, wiring or enclosure design.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** CAD tools and firmware toolchains (Arduino IDE, PlatformIO, OpenSCAD, CadQuery, Fusion, FreeCAD) are the user's choice. Use what the project already uses. Do not install or propose a new toolchain without asking first.

# CAD and Firmware

Hardware mistakes cost parts and sometimes safety. State assumptions, units and what you could not test.

## Before starting
Ask for anything missing, one question at a time: board and chip, power source and voltage, sensors and actuators with part numbers, CAD program, manufacturing method (FDM, SLA, CNC, laser), material, tolerances. Read `REF/CONTEXT/001_PROJECT_CONTEXT.md` first.

## Firmware (Arduino, ESP32, STM32 style C++)
- One pin map in one place (`pins.h`, a `constexpr` list or a table), with the pin, function, voltage and active level. Never scatter pin numbers.
- Non-blocking code: use `millis()` timing or a scheduler, not long `delay()` calls, when more than one thing must happen.
- Debounce inputs. Use `INPUT_PULLUP` only when the wiring matches. Check which pins are input-only, strapping or reserved on the chosen chip (for example on ESP32).
- Keep interrupt handlers short: set a flag, return. Mark shared variables `volatile`. Do not use `Serial` or heap allocation in an ISR.
- Constants over magic numbers; units in the name (`SENSOR_PERIOD_MS`, `MOTOR_MAX_RPM`).
- Check return values and sensor ranges. Define a safe state (outputs off, motor stopped) for startup, error and watchdog reset.
- Log with levels over serial; remove or gate debug output for release.
- Never hard-code Wi-Fi credentials, keys or tokens in committed files.

## CAD and printable parts
- Make parts parametric: named dimensions at the top (wall, clearance, screw size), derived values below.
- Design in the final units and state them (mm). Origin at a meaningful datum.
- Tolerances for FDM: about 0.2 to 0.4 mm clearance for sliding fits, adjust by printer; test a small coupon first.
- Printability: min wall about 1.2 mm, avoid overhangs above 45 degrees without supports, add fillets at stress corners, orient for layer strength.
- Fasteners: standard sizes, correct pilot or clearance holes, heat-set inserts or captive nuts for repeated assembly.
- Share exports in the format the user names (STEP for exchange, STL or 3MF for printing). Keep the source model.

## Documentation deliverables
- **Pin and wiring table:** pin, signal, direction, voltage, connected part, notes.
- **BOM:** part, value or model, quantity, notes. Mark parts you assumed.
- **Assembly and test steps:** numbered, with the expected result of each.

## Safety checklist
- Confirm logic level (3.3 V or 5 V) between every pair of connected parts; use level shifting where they differ.
- Drive motors, relays and solenoids through a driver or transistor with a flyback diode; never straight from a GPIO pin.
- Separate or properly rate power for motors and heaters; share ground; add fuses where a fault could overheat.
- Mains voltage: do not design it. Recommend a certified power supply module and a qualified person.
- Say plainly what has not been tested on real hardware.
