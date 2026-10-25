---
title: "Cassandra Index: a deterministic, dependency-free pipeline for a weekly open-data conflict-risk index"
tags:
  - conflict risk
  - composite indicators
  - open data
  - reproducible research
  - JavaScript
authors:
  - name: Mikhail Zasidkevich
    orcid: 0009-0000-4844-4338
    affiliation: "1"
affiliations:
  - name: Independent researcher
    index: 1
date: 25 October 2026
bibliography: paper.bib
---

# Summary

`calc/` is the computational core of Cassandra Index, a weekly index of the level and
direction of global conflict risk computed from open sources. It takes one JSON file per
week — 46 criteria grouped into nine drivers, each criterion carrying source records with
type, domain, date and provenance cluster, or an explicit reason for being absent — and
returns a score on a 0–100 ordinal scale, per-region and per-country scores, a
sensitivity estimate, an audit record, and a public data layer with JSON Schemas.

The aggregation is deterministic: weighted driver scores, a saturating curve
(`k = 1.95`, calibrated on ten historical anchor profiles by a rolling-origin split),
asymmetric inertia with a structural-break override, a cap on the contribution of
indirect precursors, and a regional deviation model. There are no dependencies, no
network calls in the core, and no randomness; the same input always produces the same
bytes.

# Statement of need

Composite risk indices are usually published as numbers plus a methodology document.
Reproducing them requires re-implementing the method from prose, and checking them
requires access to raw inputs that are often withheld. The problem is well known from
the composite-indicator literature [@oecd2008handbook], yet the usual response — publish
a fuller methodology PDF — still leaves the reader without an artefact to run.

This package is that artefact: the exact code that produces the published series, the
inputs for every published week, and the tests that pin the published numbers. It is
intended for researchers in peace and conflict studies and for data journalists who need
to verify rather than trust a weekly risk number, and for anyone comparing such an index
with event-based or news-based measures such as UCDP [@sundberg2013ucdp], ACLED
[@raleigh2010acled] or GPR [@caldara2022gpr]. It is deliberately kept free of framework
code so that a reviewer can read the whole aggregation in one file (`calc/engine.js`)
and re-run any week with a single command.

# Installation and usage

Requires Node.js ≥ 18. No dependencies, no build step for the core:

```
node calc/calc.js 2026-10-18            # recompute a week, print only
node calc/calc.js --write <week>        # write snapshot (gate-checked)
node calc/calibrate.js                  # k grid, anchor selection, sensitivity
node --test                             # 940 tests, incl. published-number pins
```

The public layer is regenerated with `node calc/public-export.js --write` and validated
against JSON Schema documents in `data/public/schema/v1/`.

# Quality control

The repository enforces correctness mechanically rather than by review: exact published
numbers for each week are pinned in tests, the public layer is checked byte-for-byte
against its generator, every public file must have a schema and an entry in
`docs/api.md`, and snapshot writes are blocked if any source URL is broken or if the data
contract fails. An append-only audit log with a hash chain records every recalculation.
Inter-coder reliability for the source-criterion coding is computed with Cohen's kappa
[@cohen1960kappa; @landis1977kappa] by `calc/coding-reliability.js`.

# Limitations

The published comparable series is nine weeks long. External validation against the
Geopolitical Risk Index is reported as measured — no significant agreement at n = 7 — and
the pipeline does not claim predictive validity. The method is documented in full; its
construct validity has not been independently reviewed.

# AI usage disclosure

AI coding agents were used during development of this repository, under human review:
they wrote and refactored parts of the code and documentation, with every change reviewed
and committed by the maintainer, and with correctness enforced by tests rather than by
trust in the generator. Methodological decisions, source selection, coding of sources and
the published results are human work.

A machine-classification pilot for source coding exists as an optional, gated seam
(`calc/classify.js`); it is not part of the publication pipeline and produced none of the
published data.

# Acknowledgements

Data attribution: GeoNames (CC BY 4.0) for the city and country reference. Version `v1.1.0`
of the software described here is archived at Zenodo; the concept DOI
`10.5281/zenodo.23458010` always resolves to the latest archived version (the version
archived at submission time is the one named in the submission form). The project has no
funding.
