# Changelog

All notable changes to Cearix are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Requires oks-ui ^1.1.2

## [1.0.0] — 2026-09-02

### Added

- Vite + React 19 + Tailwind v4 (layout only) + `react-router-dom` v7 scaffold,
  built entirely on oks-ui `^1.1.2`.
- Design-token layer (`src/styles/theme.css`): brand ramp, six semantic role
  ramps (all 11 stops, reversed for dark), an `--app-*` semantic layer, a full
  dark-mode block, and the global oks-ui patches.
- App shell: recursive sidebar with a mini-rail hover flyout, a gradient header
  with the full control cluster and a ⌘K command palette, and a gradient
  page-hero band that every page portals its title + breadcrumb into.
- `src/Components/ui/` composition layer: `Surface`, `PageHeader`, `KpiCard`,
  `DataTable`, `ChartCard`, `DonutCard`, `SegmentedControl`, `ActivityFeed`,
  `MeterList` and more — each composed from oks-ui primitives.
- Config-driven archetypes: `ListPage`, `FormPage`, `DetailPage`,
  `SettingsPage`, `DashboardPage`.
- 12 dashboards, every CRUD/list/settings/detail route, 18 UI-element gallery
  pages, 10 utility pages, 9 advanced-UI pages, 7 chart pages, 14 form pages,
  the deep app screens (chat, email, calendar, file manager, todo, …), the
  content pages, the auth + error screens, and a full component gallery.
- Light and dark themes; responsive from 320px.

### Notes

- Every `NAV_ROUTES` entry renders a real page — no placeholders.
- All data is deterministic mock data under `src/data/`.

## [Unreleased]
