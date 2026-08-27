# BUILD PROMPT: Autonomous Data Analyst (Multi-Agent AI System)

> Copy this entire file into Antigravity as-is. The IMPLEMENTATION MODE block
> below is the instruction wrapper; everything after it (Sections 1–17) is the
> full specification it refers to.

---

## IMPLEMENTATION MODE

You are the principal software engineer building this project from the
specification below. Do not merely generate a plan, documentation,
pseudocode, mock UI, placeholder implementation, or TODOs — build the actual
working repository incrementally, following the architecture and constraints
exactly.

**This is the source of truth. Do not redesign it.** Do not replace the
selected technologies with alternatives you prefer. Do not introduce
frameworks not listed here. Do not skip phases. Do not build everything as
one giant file. Do not create additional "AI agents" where deterministic
Python is more reliable — Section 5 (7.5 in some earlier drafts) already
specifies exactly what deterministic code handles versus what the LLM
handles; follow that division as written.

**If a requirement is genuinely technically impossible, internally
contradictory, unsafe, or requires a decision this document doesn't specify:
STOP and explain the exact issue before changing the architecture.** Do not
silently substitute your own design to resolve it.

**Technology baseline:** Python 3.11+, Streamlit, pandas, scikit-learn,
XGBoost, Plotly + Kaleido, ReportLab, python-pptx, Ollama (Llama 3.1 8B as
the default local LLM), pytest, joblib, SQLite for lightweight persistence.

**LLM policy:** Ollama is the default and must work without an API key.
Never require OpenAI/Claude/Gemini APIs for the core system — hosted LLMs
are optional providers only. No raw PII may ever be sent to an LLM.
Deterministic Python/statistical methods are preferred over LLM reasoning
everywhere they can do the job. LLMs are used only where semantic
reasoning/generation genuinely helps (Section 5.2 tier 3, insights, chat).

**Critical engineering rules:**
1. Implement one phase at a time (Section 14) — do not implement all phases at once.
2. After each phase, run its tests. Do not proceed if its Definition of Done fails.
3. Never replace real implementation with placeholders. Never silently guess.
4. Preserve `UNKNOWN` / `needs_user_confirmation` states — never force a
   confident answer when evidence is insufficient (see the governing
   principle in Section 1).
5. Save `dio.json` after every successfully completed agent (Section 8).
6. Every important decision has provenance (Section 5.8's `decision_log`).
7. Every generated insight must be traceable to computed evidence (Section 6, Agent 5).
8. Never claim 100% accuracy anywhere in code, UI, or generated reports.
9. Never allow LLM-generated code to execute against the dataset (Agent 7's
   whitelisted-query pattern only).
10. Never allow PII to enter an LLM prompt (`mask_for_llm`, Section 6.1's PII sub-module).
11. Keep the architecture modular via the `SourceAdapter` interface (Section
    6.0) so V2 source adapters can be added without modifying Agents 1–7.
12. Do not begin V2 (multi-source ingestion) or V3 (independent verification)
    work until V1 passes its full acceptance test (Section 17) on real data.

Build strictly in the order given in Section 14 (Build Order). At the end of
each phase, state what was built, what tests were run and passed, and any
known limitations before moving to the next phase.

---

## THE FULL SPECIFICATION


## 1. PROJECT GOAL (one paragraph)

Build **Autonomous Data Analyst**: a multi-agent AI system where a user uploads
a **structured tabular dataset** (CSV/Excel containing numerical, categorical,
textual, and/or date columns — not images, audio, genomic, graph, or streaming
data) and, with zero manual coding, receives: a cleaned dataset,
a complete EDA report, visualizations, a trained ML model (when applicable),
plain-English business insights, a PowerPoint presentation, a PDF report, and an
optional chatbot to ask follow-up questions about the results. The system behaves
like a small human data science team — each AI "agent" has one job, and an
orchestrator runs them in the right order and passes structured data between them.

**Explicitly out of scope for this build:** Kubernetes, multi-cloud deployment,
knowledge graphs, vector databases, 20+ agents, cross-session memory,
hyperparameter search frameworks (Optuna), SHAP/LIME (use built-in feature
importances instead), forecasting/clustering (classification & regression only).
These are documented as "Future Work," not built.

**Governing principle (applies to every agent, stated once here instead of
scattered implicitly): never claim certainty the system doesn't have.** No
tool can guarantee correct analysis on every real-world dataset — mislabeled
data, ambiguous dates, and unknown business semantics are normal, not edge
cases. When evidence is insufficient, the system must say so — return
"unknown," flag `needs_user_confirmation`, or drop an ungrounded claim —
rather than produce a confident-sounding wrong answer. This single principle
is what the date-resolution tiers (6.1), the target-selection veto scoring
(Agent 4), and the insight hallucination guard (Agent 5) are all instances
of. Never describe this system's output as "100% accurate" anywhere in the
README, UI, or reports — describe it with the actual measured accuracy
numbers from the Phase 2 benchmark (Section 15) instead.

---

## 2. HIGH-LEVEL ARCHITECTURE

```
                     USER uploads CSV/XLSX
                              |
                              ▼
                       ORCHESTRATOR
                              |
   ┌───────────┬──────────────┬──────────────┬──────────────┐
   ▼           ▼              ▼              ▼              ▼
 Agent 1     Agent 2        Agent 3        Agent 4        Agent 5
Intelligence Cleaning      EDA/Viz         ML Agent      Insight Agent
   |           |              |              |              |
   └───────────┴──────────────┴──────────────┴──────────────┘
                              |
                              ▼
                        Agent 6: Report Agent
                        (PDF + PPTX generation)
                              |
                              ▼
                    Agent 7: Chat Agent (optional)
                              |
                              ▼
                    USER downloads everything
```

Each agent is a **Python module with one job**. They communicate through a single
shared in-memory/JSON object called the **Dataset Intelligence Object (DIO)** —
defined fully in Section 4. No agent re-derives what a previous agent already
figured out.

---

## 3. TECH STACK (all free / zero-cost)

| Layer | Technology | Why |
|---|---|---|
| Language | Python 3.11+ | ecosystem fit |
| Data processing | pandas | standard, sufficient at this scale |
| File parsing | pandas, openpyxl | CSV/XLSX support |
| Dates | python-dateutil + custom resolver (Section 5.1) | no library solves ambiguity alone |
| PII detection | regex + optional `presidio` (open-source) | free, local, no LLM needed |
| Semantic labeling | rules → regex patterns → LLM fallback (Claude/GPT/local Ollama) | cost-bounded reasoning |
| Visualization | Plotly | interactive, exports to static images for PPT/PDF |
| ML | scikit-learn, xgboost | classification/regression only |
| Report — PDF | ReportLab | free, precise layout control |
| Report — PPTX | python-pptx | free |
| LLM calls (insights + fallback labeling + chat) | **Default: local Ollama (Llama 3.1 8B)** via a provider interface (see 3.1) | $0 by default; used sparingly, never on raw PII |
| UI | Streamlit | fastest path to a usable app, free hosting on Streamlit Community Cloud |
| Storage | Local filesystem + SQLite | no need for Postgres/S3 at this scale |
| Testing | pytest | unit tests per agent |

### 3.1 LLM Provider Interface (pick a default, don't leave it open)

Coding agents build sloppy code when the LLM choice is left ambiguous. Fix it:

```
llm/
├── base.py           # abstract class: .complete(prompt, max_tokens) -> str
├── ollama_client.py   # DEFAULT — local, free, no API key needed
└── openai_client.py   # optional swap-in, same interface, used only if
                        # the user configures an API key in .env
```

All agents call the LLM only through `llm.base.LLMProvider`, never import a
specific client directly. Default provider = Ollama running `llama3.1:8b`
locally. This keeps the project genuinely $0 to run out of the box, while
leaving a clean swap point for a stronger hosted model later.

---

## 4. THE CORE DATA CONTRACT: Dataset Intelligence Object (DIO)

Every agent after Agent 1 reads from and writes to this single structure. Define
it as a Python dataclass/dict and serialize to JSON after each agent runs (so a
run can be resumed/debugged at any stage).

```json
{
  "schema_version": "1.0.0",
  "dataset_id": "string (uuid)",
  "dataset_hash": "string (sha256 of the raw file — enables caching, dedup,
                    and reproducibility checks across runs)",
  "file_name": "string",
  "ingestion": {
    "n_rows": 0,
    "n_columns": 0,
    "file_type": "csv | xlsx",
    "encoding": "utf-8"
  },
  "artifacts": {
    "cleaned_csv": "path | null",
    "removed_rows_csv": "path | null",
    "model_pkl": "path | null",
    "pdf_report": "path | null",
    "pptx_report": "path | null",
    "chart_paths": ["path", "..."]
  },
  "columns": [
    {
      "name": "string",
      "dtype_raw": "string",
      "dtype_inferred": "int | float | string | bool | date | category",
      "semantic_label": "string (e.g. 'email', 'revenue', 'customer_id')",
      "confidence": 0.0,
      "method_used": "rule | pattern | llm",
      "is_pii": false,
      "pii_type": "email | phone | name | address | none",
      "null_pct": 0.0,
      "unique_count": 0,
      "is_target_candidate": false
    }
  ],
  "date_columns": [
    {
      "column": "string",
      "detected_format": "DD/MM/YYYY | MM/DD/YYYY | YYYY-MM-DD | ambiguous",
      "confidence": 0.0,
      "evidence": ["string"],
      "needs_user_confirmation": false
    }
  ],
  "domain_guess": {
    "domain": "retail | healthcare | finance | generic | ...",
    "confidence": 0.0
  },
  "quality": {
    "score": 0,
    "issues": ["string"]
  },
  "cleaning_log": [
    {"column": "string", "action": "string", "reason": "string"}
  ],
  "eda": {
    "summary_stats": {},
    "correlations": {},
    "charts": ["path/to/chart1.png", "..."]
  },
  "ml": {
    "problem_type": "classification | regression | none",
    "target_column": "string | null",
    "models_tried": [
      {"name": "string", "metric_name": "string", "metric_value": 0.0}
    ],
    "best_model": "string",
    "feature_importance": {}
  },
  "insights": ["string", "string", "..."],
  "reports": {
    "pdf_path": "string",
    "pptx_path": "string"
  }
}
```

Every agent below takes the DIO as input, mutates only its own section, and
returns the updated DIO. This is your single most important design decision —
implement it first, before any agent logic.

---

### 4.1 Dataset Size Router (guard before Agent 1 ever runs)

**File:** `core/data_router.py`
```
if file_size_mb < 200:
    load fully with pandas (v1 default path)
elif file_size_mb < 2000:
    load with pandas using chunked read (chunksize param), process
    profiling stats incrementally; skip full-dataset charts, sample for EDA
else:
    reject with a clear message: "Dataset too large for this version
    (max 2GB). Consider sampling it down first."
```
This must run before the file ever reaches Agent 1 — call it from the
Security Validator (Section 8).

---

## 5. ENGINEERING FOUNDATIONS (apply to every agent, define these before writing Agent 1's logic)

### 5.1 BaseAgent pattern (plugin architecture)

Every agent implements the same interface so the orchestrator stays a simple
loop and adding an 8th agent later never requires touching orchestrator logic:

```python
# core/base_agent.py
class BaseAgent:
    name: str = "base"

    def run(self, df, dio: dict) -> dict:
        """Mutates only this agent's section of the DIO. Returns updated DIO."""
        raise NotImplementedError
```

```python
# orchestrator.py
pipeline = [
    IntelligenceAgent(), CleaningAgent(), EDAAgent(),
    MLAgent(), InsightAgent(), ReportAgent(),
]
for agent in pipeline:
    dio["progress"][agent.name] = "RUNNING"
    try:
        dio = agent.run(df, dio)
        dio["progress"][agent.name] = "FINISHED"
    except Exception as e:
        dio["progress"][agent.name] = "FAILED"
        dio["errors"].append({"agent": agent.name, "code": ..., "message": str(e)})
    save_dio_json(dio)  # after every agent, not just at the end
```

### 5.2 Configuration (nothing hardcoded)

**File:** `core/config.py` loading from `config.yaml`:
```yaml
max_upload_size_mb: 200
llm:
  provider: ollama
  model: llama3.1
eda:
  max_charts: 6
security:
  max_llm_tokens_per_run: 20000
ml:
  train_test_split: 0.8
```
Every agent reads limits from this config object — never a literal number
buried in agent code.

### 5.3 Structured logging

**File:** `core/logger.py`. Every agent logs, at minimum: START (timestamp),
END (timestamp + runtime), warnings, errors, LLM tokens used, files produced.
Use Python's standard `logging` module with a consistent format; write to
both console and a per-run `runs/{id}/pipeline.log` file.

### 5.4 Progress states

Each agent's status in `dio["progress"][agent_name]` is one of:
`PENDING | RUNNING | FINISHED | FAILED | SKIPPED`. The Streamlit UI polls this
directly to render live status — no separate event system needed at this scale.

### 5.5 Lightweight error codes

Instead of raw exception strings, prefix errors by agent so they're
searchable and referenceable in logs/docs: `INT_001` (Intelligence Agent),
`CLN_001` (Cleaning), `EDA_001`, `ML_001`, `INS_001`, `RPT_001`. A short
`ERROR_CODES.md` in the repo root maps each code to a one-line meaning. Keep
this simple — a dict, not a framework.

### 5.6 Per-agent metrics

Each agent appends its own entry to `dio["agent_metrics"]`:
```json
{"agent": "eda", "runtime_seconds": 5.6, "warnings": 1, "errors": 0}
```
This rolls up into the `metrics.json` file already defined in Section 6.

### 5.7 Data validation — keep it lean, no new framework

Do **not** add Great Expectations or Pandera — that reintroduces the kind of
framework weight already cut from this project, and duplicates work Agent 1's
schema profiler already does (dtype checks, encoding detection, duplicate
headers, null/empty detection). If a genuinely new structural check is
needed, add it as a plain pandas function inside `schema_profiler.py`, not a
new dependency.

### 5.8 Decision/provenance log (generalizes what cleaning_log already does)

Every agent that makes a non-trivial decision — not just Cleaning — appends
to a single shared `dio["decision_log"]` list, so the whole run is traceable
end to end from one place instead of scattered per-section:
```json
{
  "agent": "intelligence",
  "action": "resolved date format for column 'order_date'",
  "reason": "day value > 12 found in 3 rows",
  "confidence": 1.0,
  "timestamp": "..."
}
```
This is nearly free to add — `date_resolver`, `cleaning_agent`, and
`ml_agent`'s target selection already produce this exact reason/confidence
data (Sections 6.1, and Agent 2/4 specs); this just means writing it to one
shared list instead of discarding it after use. Do not build a separate
provenance database or querying system around it for v1 — it's a list in the
JSON, nothing more.

---

## 6. AGENT-BY-AGENT SPECIFICATION

### 6.0 Source Adapter seam (build this thin interface now, even though V1 only implements two adapters)

Before Agent 1, add one small abstraction so ingestion isn't hardcoded to
"read a CSV" — this costs almost nothing now and avoids a rearchitect later
when JSON/Parquet/SQL/API sources are added in V2 (Section 15.1):

```python
# sources/base_adapter.py
class SourceAdapter:
    def validate(self, path_or_conn) -> bool: ...
    def load(self, path_or_conn) -> pandas.DataFrame: ...
    def describe(self) -> dict:  # source type, size, basic metadata
        ...
```
```
sources/
├── base_adapter.py
├── csv_adapter.py     # V1 — implement now
└── excel_adapter.py    # V1 — implement now
```
Agent 1 always receives a plain pandas DataFrame from whichever adapter
handled ingestion — it never knows or cares whether that came from a CSV
adapter or (later) a SQL adapter. This is the entire point of the seam: V2
adds `json_adapter.py`, `parquet_adapter.py`, `sql_adapter.py`, etc. as new
files implementing the same three methods — zero changes to Agent 1 through
7 or to the orchestrator.

### AGENT 1 — Intelligence Agent (build this first; everything depends on it)

**Do not build this as one file.** It bundles six distinct systems — split
them so no single file exceeds a few hundred lines and each is independently
testable:

```
agents/intelligence/
├── schema_profiler.py     # dtypes, nulls, cardinality, basic stats
├── date_resolver.py        # tiered date-format resolution (5.1)
├── semantic_labeler.py      # tiered column labeling (5.2)
├── pii_detector.py           # regex/NER PII detection + masking (5.3)
├── domain_classifier.py       # weighted-vote domain guess (5.4)
├── quality_scorer.py           # composite quality score (5.5)
└── intelligence_agent.py        # orchestrates the six above, builds the DIO
```

**File (orchestrator for this agent):** `agents/intelligence/intelligence_agent.py`

**Input:** a DataFrame from a SourceAdapter (Section 6.0).
**Output:** populated `ingestion`, `columns`, `date_columns`, `domain_guess`,
`quality` sections of the DIO.

**5.1 Sub-module: Date Resolver (tiered, deterministic-first)**
```
1. Collect all non-null string values in a column matched by a date-like regex.
2. Parse each into (a, b, year) using detected separator (., /, -).
3. If ANY value has a or b > 12 → that position is the day. Format resolved.
   confidence = 1.0. Record evidence: "day value > 12 found".
4. If no value disambiguates:
     a. Check other ALREADY-RESOLVED date columns in the same dataset — if they
        agree on a locale, apply it here. confidence = 0.75. evidence: "matched
        format of column X".
     b. Check for an explicit country/locale column in the dataset (e.g. a
        column semantically labeled "country"). If present, use a lookup table
        (India/UK/etc → DD/MM/YYYY; US → MM/DD/YYYY). confidence = 0.7.
     c. If neither exists: confidence = 0.5, format = "ambiguous",
        needs_user_confirmation = true. DO NOT GUESS.
```
Write this as pure, unit-testable functions. Build a test file with at least
20 hand-picked date strings (unambiguous, ambiguous, and locale-hinted) and
assert expected output before moving on.

**5.2 Sub-module: Semantic Column Labeler (three tiers, LLM last)**
```
Tier 1 — Rules: exact/substring match on column name against a dictionary
  (email/mail -> "email", phone/mobile/contact -> "phone", amt/amount/revenue/
  price/cost -> "currency_amount", dob/birth -> "date_of_birth",
  id/_id/code -> "identifier", etc). confidence = 0.9 if matched.

Tier 2 — Pattern detection on VALUES (not just column name): regex for email
  format, 10-digit phone patterns, currency symbols, percentage ranges (0-100),
  age-like ranges (0-120). confidence = 0.75-0.85 depending on match strength.

Tier 3 — LLM fallback: ONLY for columns unresolved by tiers 1-2. Send the
  column name + up to 10 sample values (never full column, never PII values —
  mask first, see 5.3) to the LLM with a strict prompt:
  "Column name: {name}. Sample values: {samples}. In one phrase, what does
  this column most likely represent? Respond with only the label."
  confidence = 0.6 (LLM tier is capped lower than deterministic tiers).

Bound LLM calls: max one call per unresolved column, max ~500 tokens per call.
Log total tokens used per dataset run.
```

**5.3 Sub-module: PII Detector (must run BEFORE any LLM call, no exceptions)**
```
Regex-based detection for: email, phone (10+ digit patterns), SSN/national ID
patterns, credit card patterns. Optionally add a name-detector using a small
local NER model (spaCy 'en_core_web_sm', free) for name columns.
Any column flagged is_pii=true: its raw values are NEVER included in any LLM
prompt anywhere downstream (Insight Agent, Chat Agent included) — only the
column name and pii_type may be referenced. Enforce this with a single utility
function `mask_for_llm(df)` that every other agent MUST call before building
any LLM prompt — never let agents build prompts directly from raw df.
```

**5.4 Sub-module: Domain Classifier**
```
Weighted vote over resolved semantic_labels. Maintain a lookup table:
  {"blood_pressure","diagnosis","patient_id"} -> healthcare
  {"revenue","sku","customer_id","order_date"} -> retail
  {"account_balance","transaction_id","loan_amount"} -> finance
If no strong match: domain = "generic", confidence = 0.5.
```

**5.5 Sub-module: Quality Scorer**
```
score = 100
  - (avg null_pct across columns) * 30
  - (duplicate_row_pct) * 20
  - (n_ambiguous_dates / n_date_columns) * 15
  - (n_low_confidence_columns / n_columns) * 15
Clamp to [0, 100]. List each deduction as a human-readable issue string.
```

**Deliverable for Agent 1:** a script that takes any CSV and prints a filled-in
DIO as JSON. Test on at least 5 real messy datasets before building Agent 2.

---

### AGENT 2 — Cleaning Agent

**File:** `agents/cleaning_agent.py`
**Input:** DIO (post Agent 1) + the raw dataframe.
**Output:** a cleaned dataframe + `cleaning_log` entries in the DIO.

Rules (deterministic, no LLM):
- Missing numeric → median impute if `|skew| > 1`, else mean. Log which and why.
- Missing categorical → mode impute, or a new "Unknown" category if missing % > 30%.
- Exact duplicate rows → drop, log count removed.
- Type coercion: cast columns to `dtype_inferred` from the DIO; invalid values
  become null then get imputed per the above.
- Date columns: parse into real datetime using the resolved format from Agent 1;
  if `needs_user_confirmation` is true, leave as string and flag in the log —
  do not force-parse an ambiguous date.
- Outlier flagging only (IQR method) — record as a note, do not auto-remove.

**Transparency rule (not a blocking approval loop, but not silent either):**
every action written to `cleaning_log` must be a structured entry, not a
one-line note — include the actual numbers, not just the action taken:
```json
{
  "column": "Age",
  "missing_count": 45,
  "missing_pct": 12.0,
  "method": "median",
  "reason": "distribution skew = 2.3 (>1, median chosen over mean)",
  "replacement_value": 32,
  "reversible": true
}
```
Dropped duplicate rows are reversible too — keep them in a `_removed.csv`
sidecar file so nothing is destroyed. The Streamlit UI (Section 9) must
render this log in full before showing downstream results, and expose a
simple "Review cleaning before continuing" toggle for users who want to gate
on it — default off, so the pipeline still runs end-to-end without a person
in the loop, but nothing is hidden.

---

### AGENT 3 — EDA / Visualization Agent

**File:** `agents/eda_agent.py`
**Input:** cleaned dataframe + DIO.
**Output:** `eda` section (summary stats, correlations, chart file paths).

Chart selection is a fixed rule table — no LLM decision-making:
```
- Numeric column + date column present        -> line chart (trend over time)
- Single numeric column                        -> histogram
- Categorical column (<=15 categories)         -> bar chart of counts
- Two numeric columns                          -> scatter plot
- 3+ numeric columns                           -> correlation heatmap
```
Generate at most 6 charts, save as PNG (needed for PDF/PPT embedding) using
Plotly's `write_image` (requires `kaleido`, free).

---

### AGENT 4 — ML Agent

**File:** `agents/ml_agent.py`
**Input:** cleaned dataframe + DIO.
**Output:** `ml` section of the DIO.

```
0. Preprocessing pipeline (MANDATORY — without this, training will crash on
   any dataset with categorical columns, which is most real datasets):

   agents/ml/preprocessing.py
   ```
   Use sklearn's ColumnTransformer:
     - numeric columns  -> SimpleImputer(strategy="median") + StandardScaler
     - categorical columns -> SimpleImputer(strategy="most_frequent")
                                + OneHotEncoder(handle_unknown="ignore")
   Drop identifier/PII columns entirely before this step — they must never
   reach the model as features.
   Wrap the whole thing in an sklearn Pipeline with the model as the final
   step, so preprocessing + model are saved/loaded together as one artifact.
   Log what the transformer decided into `dio["features"]` instead of
   discarding it:
   ```json
   {
     "numeric": ["age", "salary"],
     "categorical": ["city", "plan_type"],
     "dropped_identifiers": ["customer_id"],
     "encoded_dimension": 54
   }
   ```
   This is a side effect of building the ColumnTransformer, not new work —
   just capture its `.get_feature_names_out()` output instead of throwing it away.
   ```

1. Target detection: NEVER pick a column just because it's "low cardinality
   near the end" — that alone is unsafe (it will happily pick `customer_id`).
   Score every column and pick the highest, with a hard veto list:

   ```
   target_score =
       + 3  if semantic_label in {"churn","status","outcome","target","label",
                                   "class","approved","default","fraud"}
       + 2  if dtype is categorical AND 2 <= unique_count <= 20
       + 2  if dtype is numeric AND NOT semantic_label == "identifier"
       + 1  if column is near the end of the dataframe
       - 10 if semantic_label == "identifier" (customer_id, transaction_id, etc.)
       - 10 if unique_count == n_rows (i.e. it's effectively a unique key)
       - 5  if is_pii == true
   ```
   If the highest score is <= 0, or no column scores meaningfully higher than
   the rest: `problem_type = "none"`, skip ML entirely — do not force a model.
   Log the chosen target and its score to `dio["decision_log"]` (Section 5.8).
2. If classification: train Logistic Regression, Random Forest, and XGBoost
   — **skip XGBoost if n_rows < 500** (it needs more data than that to beat a
   simpler model and just adds runtime; one `if` check, not a new system).
   **Check class balance first** — if the majority class exceeds 90%, flag
   this in the DIO (`ml.class_imbalance_warning = true`) and require
   `class_weight="balanced"`. Report metrics beyond accuracy: precision,
   recall, F1 (macro-averaged for multi-class), and a confusion matrix —
   accuracy alone is misleading on imbalanced data (a model predicting the
   majority class every time can look "95% accurate" while being useless.)
3. If regression: train Linear Regression, Random Forest Regressor, XGBoost
   Regressor. Metric: RMSE, MAE, and R².
4. Train/test split 80/20 (stratified for classification). No hyperparameter
   search in v1 — use sane library defaults.
5. Pick best_model by the primary metric (F1 for classification, RMSE for
   regression) — never by raw accuracy alone. Extract feature_importance
   from the winning model (`.feature_importances_` or `.coef_`) — this
   replaces SHAP/LIME for v1.
6. Turn the top 5 features into a plain-English line each, e.g. "Higher
   `contract_length` is associated with lower churn probability" (direction
   from the sign of `.coef_` for linear models, or from a simple correlation
   check against the target for tree models where sign isn't directly
   available). Store these under `ml.feature_explanations` — this gives the
   Insight Agent something concrete to work from without needing SHAP.
7. **Inline metric sanity check (not a separate agent — a function called at
   the end of this one):** before writing `ml.best_model` to the DIO, run
   `verify_metrics(metrics, df, target_col)` which flags (does not block,
   just flags in `ml.verification_warnings`):
   - suspiciously high scores (F1 > 0.98 or R² > 0.98 on a small dataset is
     more often leakage than a great model — flag for review)
   - class imbalance already checked in step 2 above
   - a train score dramatically higher than test score (overfitting signal)
   This gets the "independent verification" benefit without duplicating the
   whole Intelligence Agent as a second pass — it's one function checking the
   one thing this specific agent could plausibly get wrong.
```

---

### AGENT 5 — Insight Agent

**File:** `agents/insight_agent.py`
**Input:** DIO (eda + ml sections only — never raw data, never PII columns).
**Output:** `insights` list — each entry is an object, not a bare string:
```json
{
  "text": "Average revenue increased from ₹42,000 to ₹51,000 (up 21%).",
  "confidence": 0.9,
  "evidence": "summary_stats.revenue.mean_by_period",
  "recommendation": "Investigate what drove the increase and reinforce it."
}
```
`confidence` is not a new model — reuse the same tiering logic as Section
5.6/6.1: 0.9+ if the number comes straight from a deterministic stat, lower
if it depends on a smaller model-derived signal (e.g. feature importance).
`recommendation` is one short action-oriented sentence generated in the same
LLM call as `text` — this covers the "turn insights into actions" need
without a separate Recommendation Agent; it's one more field in the same
prompt, not a new pipeline stage.

This is the best, safest use of an LLM in the whole system: summarizing
already-computed structured numbers, not reasoning over raw rows.
```
Prompt template:
"Here are dataset statistics: {summary_stats}. Here are correlations: {corr}.
Here is the ML result: {ml_section}. Write 3-6 findings. For each, give: (1)
a plain-English sentence citing a specific number from the data above — never
a vague claim with no figure attached, (2) one short recommended action. No
jargon."
```
Cap output length; never pass raw dataframe rows into this prompt.

**Hallucination guard (mandatory, run after generation, before the insight is
kept):** an LLM can still invent numbers even when told not to. Add a cheap
verifier: extract every number mentioned in each generated insight (regex for
digits/percentages) and check it appears somewhere in `summary_stats`,
`correlations`, or `ml` sections of the DIO (allow small rounding tolerance).
Drop any insight that cites a number not traceable to the computed data, and
log the drop. An insight with zero numbers in it should also be rejected —
"customer satisfaction decreased" is not acceptable; "average rating dropped
from 4.5 to 3.8" is.

---

### AGENT 6 — Report Agent

**File:** `agents/report_agent.py`
**Input:** full DIO + chart image paths.
**Output:** a PDF and a PPTX file.

**PDF (ReportLab), fixed template:**
1. Title page (dataset name, date generated)
2. Dataset overview (rows, cols, quality score, domain guess)
3. Data quality issues list
4. EDA charts (embedded images) with 1-line captions
5. ML results table (if applicable)
6. Insights (bulleted list from Agent 5)

**PPTX (python-pptx), fixed template — same content, presentation format:**
1. Title slide
2. Dataset Overview slide
3. Key Findings slide (insights)
4. Chart slides (one chart per slide, 3-4 max)
5. Model Performance slide (if ML ran)
6. Recommendations slide (derived from insights)

Do not attempt "AI-designed" dynamic layouts in v1 — a clean fixed template
beats a fragile auto-designed one.

---

### AGENT 7 — Chat Agent (optional, build last)

**File:** `agents/chat_agent.py`
**Input:** user question (text) + DIO (already-computed results only).
**Output:** answer string.

This is **retrieval over the DIO's computed outputs plus a whitelisted set of
safe direct queries** — not open code generation/execution, which is a real
injection risk (never let an LLM generate arbitrary pandas/SQL and run it).
```
1. Take user question.
2. Query Classifier (simple keyword/regex matching, no LLM needed for this
   step): does the question match a known safe pattern?
     - "average/mean of <column>"   -> df[col].mean()
     - "sum/total of <column>"       -> df[col].sum()
     - "count of <column>"            -> df[col].value_counts() / len(df)
     - "min/max of <column>"           -> df[col].min() / .max()
     - "average <column> by <column>"   -> df.groupby(col1)[col2].mean()
   Only columns that exist in the dataframe and are NOT flagged is_pii are
   eligible targets. If the question matches, execute the corresponding
   pandas call directly (no LLM, no code generation) and return the number.
3. If no safe pattern matches: fall back to DIO-only retrieval — build
   context from summary_stats/insights/ml results (keyword-filtered, no
   vector DB needed at this scale) and send question + context to the LLM:
   "Given these results: {context}, answer this question: {question}. If the
   answer isn't in the results, say so — do not make up numbers."
4. Never include raw PII columns in context or as query targets, ever.
```

---

## 7. RUN PERSISTENCE (model storage + reproducibility)

Every pipeline run must be reproducible and resumable. No MLflow — too heavy
for this scale. Use a simple filesystem convention instead:

```
runs/
└── {timestamp}_{dataset_name}/
    ├── dio.json              # full Dataset Intelligence Object after each stage
    ├── model.pkl              # trained model, saved via joblib
    ├── model_metadata.json     # algorithm, metrics, feature list, target
    ├── metrics.json             # {dataset, model, primary_metric, all_metrics,
    │                              runtime_seconds} — flat summary for quick
    │                              comparison across runs, useful for a paper
    ├── charts/                    # all PNGs generated by the EDA agent
    ├── report.pdf
    ├── presentation.pptx
    └── removed_rows.csv            # anything dropped by the Cleaning Agent
```

Save the DIO to disk after **every** agent completes (not just at the end) so
a crashed run can be inspected or resumed from the last successful stage.

---

## 8. ORCHESTRATOR

**File:** `orchestrator.py`

Builds on the `BaseAgent` pipeline from Section 5.1, with resumability added:

```python
PIPELINE = [
    ("intelligence", IntelligenceAgent()),
    ("cleaning", CleaningAgent()),
    ("eda", EDAAgent()),
    ("ml", MLAgent()),
    ("insight", InsightAgent()),
    ("report", ReportAgent()),
]

def run_pipeline(source_path, run_dir, resume=False):
    if resume and (run_dir / "dio.json").exists():
        dio = load_dio_json(run_dir / "dio.json")
        completed = {name for name, status in dio["progress"].items()
                     if status == "FINISHED"}
    else:
        dio = new_dio(source_path)
        completed = set()

    df = None
    for name, agent in PIPELINE:
        if name in completed:
            continue  # already done — skip straight to the next stage
        dio["progress"][name] = "RUNNING"
        try:
            df, dio = agent.run(df, dio)
            dio["progress"][name] = "FINISHED"
        except Exception as e:
            dio["progress"][name] = "FAILED"
            dio["errors"].append({"agent": name, "message": str(e)})
        save_dio_json(dio, run_dir / "dio.json")  # after every single agent
    return dio
```
**Resumability rule:** if the pipeline crashes after, say, the EDA Agent, do
not restart from Agent 1 — load the last saved `dio.json`, see that
`intelligence`/`cleaning`/`eda` are already `FINISHED`, and continue from the
ML Agent. This only works because Section 8's save happens after *every*
agent, not just at the end.
Wrap each stage in a try/except that logs the failure into the DIO and
continues where possible (e.g., if ML has no target, skip it and still produce
EDA + report) rather than crashing the whole pipeline.

---

## 9. SECURITY / INPUT VALIDATION

Add before the orchestrator ever touches an uploaded file:

**File:** `security/file_validator.py`
```
- Reject files above a size limit (e.g. 200MB for v1). Do not attempt chunked
  or streaming processing in v1 — that's a real sub-project on its own; if a
  file exceeds the limit, reject with a clear message ("dataset too large for
  this version, max 200MB") rather than silently attempting it and crashing.
  Document chunked processing as Future Work (Section 15).
- Reject anything not .csv/.xlsx/.xls by extension AND by sniffing actual
  file content (don't trust the extension alone).
- Reject empty files / zero-row datasets with a clear error, not a crash.
- Reject files with zero parseable columns.
- Sanitize file names before writing anything to disk (path traversal guard).
```
Call this validator first, before Agent 1 ever sees the file.

---

## 10. USER INTERFACE

**File:** `app.py` (Streamlit)

```
Page 1: Upload — drag-and-drop CSV/XLSX, "Analyze" button.
Page 2: Live progress — show each agent's status as it completes
        (✓ Intelligence Agent done, ⟳ Cleaning Agent running...).
Page 3: Results — tabs for:
        - Dataset Intelligence (column table with semantic labels + confidence)
        - EDA (charts inline)
        - ML Results (metrics table, feature importance chart)
        - Insights (bulleted list)
        - Downloads (PDF button, PPTX button)
        - Chat (optional text box, if Agent 7 is built)
```

---

## 11. FULL PROJECT FOLDER STRUCTURE

Give this to Antigravity verbatim so it scaffolds correctly from the start:

```
autonomous-data-analyst/
├── app.py                  # Streamlit entrypoint
├── orchestrator.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml         # brings up app + local Ollama together
├── .env.example              # OLLAMA_HOST / OPENAI_API_KEY (optional)
│
├── core/
│   ├── dio.py                 # Dataset Intelligence Object schema + helpers
│   ├── config.py
│   └── logger.py
│
├── security/
│   └── file_validator.py
│
├── llm/
│   ├── base.py
│   ├── ollama_client.py
│   └── openai_client.py
│
├── agents/
│   ├── intelligence/            # 6 submodules, see Section 5, Agent 1
│   ├── cleaning/
│   │   └── cleaning_agent.py
│   ├── eda/
│   │   └── eda_agent.py
│   ├── ml/
│   │   └── ml_agent.py
│   ├── insight/
│   │   └── insight_agent.py
│   ├── report/
│   │   ├── pdf_builder.py
│   │   └── pptx_builder.py
│   └── chat/
│       └── chat_agent.py       # optional, built last
│
├── utils/
│   └── mask_for_llm.py          # shared PII-masking utility (Section 11 rule 1)
│
├── tests/                        # see Section 12
│
├── data/                          # sample datasets for local testing
├── runs/                           # output of every pipeline run (Section 6)
└── README.md
```

---

## 12. NON-FUNCTIONAL RULES (enforce these in code, not just docs)

1. **PII never reaches an LLM prompt.** Implement one shared `mask_for_llm()`
   utility; every agent that builds an LLM prompt must call it first. Write a
   test that asserts a known PII value never appears in any prompt string sent
   to the LLM client.
2. **Cost bound:** log total LLM tokens used per run; hard-cap at e.g. 20,000
   tokens per dataset — if exceeded, stop calling the LLM and finish the report
   with whatever's been resolved deterministically.
3. **No silent guessing on ambiguous dates.** If `needs_user_confirmation` is
   true, surface it in the UI and the report — never silently pick one format.
4. **Every agent failure is logged, not fatal.** One broken agent (e.g. no ML
   target found) should not stop the pipeline from producing a report.

---

## 13. TESTING REQUIREMENTS (minimum set — write these alongside the code, not after)

```
tests/
├── test_date_resolver.py       # 20+ hand-picked date strings, expected outputs
├── test_semantic_labeler.py     # known column-name/value pairs -> expected label
├── test_pii_detector.py           # asserts PII never appears in any LLM prompt string
├── test_domain_classifier.py       # known column sets -> expected domain
├── test_quality_scorer.py            # known issue combos -> expected score range
├── test_target_selection.py           # asserts an identifier column is NEVER chosen
├── test_cleaning_agent.py              # missing-value + duplicate handling
├── test_insight_verifier.py             # asserts an insight with an invented
│                                           number gets dropped, a grounded one is kept
└── test_pipeline_end_to_end.py           # full run on a small sample CSV,
                                            # asserts a DIO, PDF, and PPTX are produced
```

**Golden-dataset regression tests:** keep 2-3 small, fixed sample CSVs
permanently in `tests/fixtures/` with their expected DIO output (semantic
labels, domain, quality score range) checked in alongside them. Run the full
pipeline against these on every CI run and assert the output still matches
within tolerance. This is what catches a future change silently breaking
something — without it, refactors have no safety net.

---

## 14. BUILD ORDER (do not skip ahead)

```
Week 1-2: DIO schema + Agent 1 (Intelligence Agent) + its test suite.
          Validate on 5+ real messy CSVs before continuing.
Week 3:   Agent 2 (Cleaning Agent), using Agent 1's output.
Week 4:   Agent 3 (EDA/Viz Agent).
Week 5:   Agent 4 (ML Agent) — classification + regression only.
Week 6:   Agent 5 (Insight Agent) + Agent 6 (Report Agent: PDF + PPTX).
Week 7:   Orchestrator + Streamlit UI wiring everything together.
Week 8:   Agent 7 (Chat Agent) — optional, only if time remains.
```

---

## 15. PHASE 2 (AFTER THE PIPELINE WORKS — NOT PART OF THE 8-WEEK BUILD)

Once Sections 1–14 produce a working end-to-end tool, and only then, add a
benchmark evaluation layer — this is what turns the project from "a working
app" into something with actual research/portfolio evidence behind it:

```
benchmark/
├── datasets/
│   ├── retail/        # e.g. Superstore Sales, Online Retail
│   ├── healthcare/     # e.g. Diabetes dataset
│   └── finance/         # e.g. Loan Prediction
├── ground_truth/
│   ├── retail/
│   │   ├── expected_domain.json
│   │   ├── expected_dates.json
│   │   └── expected_semantics.json
│   ├── healthcare/     # same three files per domain
│   └── finance/
└── evaluation.py            # runs the full pipeline on each dataset, compares
                               output against ground_truth, produces a results
                               table: semantic-label accuracy %, date-resolution
                               accuracy %, PII recall %, plus a side-by-side run
                               of ydata-profiling on the same files for comparison
```
Do not build this before the core pipeline works — you need real, working
output to benchmark against. Building the benchmark harness first would mean
testing nothing.

Also fold in, as part of the same `evaluation.py`, an `evaluation.html`
summary (runtime, token usage, and accuracy per dataset) — this is a report
format for numbers you're already computing, not a new capability.

---

## 16. EXPLICITLY DEFERRED / REJECTED (and why — stop re-adding these)

This project has been through several rounds of "add more" review. Most of
those additions were folded in above because they were cheap and genuinely
useful. The following were deliberately left out — not overlooked. If a
future review suggests them again, this is why they're still out:

- **Data drift detection** — needs multiple related runs over time to mean
  anything; this is a monitoring feature for a continuously-running system,
  not a single-shot "upload → report" tool. Add only if the project evolves
  into something users run repeatedly against the same data source.
- **Agent registry / auto-discovery** — the BaseAgent pattern (5.1) already
  makes adding an 8th agent trivial. A discovery/registration layer on top of
  a 7-item list solves a problem that shows up at 30+ agents, which this
  project deliberately isn't.
- **Async/parallel agent execution** — real complexity (DIO write-conflict
  handling) for a speed gain that doesn't matter until dataset size or user
  concurrency actually demands it. Sequential is easier to debug and log.
- **AI-driven ("importance-based") chart selection** — this would undo the
  earlier fix that made chart choice a deterministic, testable rule table
  (Agent 3). Letting an LLM decide what's "important" reintroduces exactly
  the unreliability that rule table was built to remove.
- **Knowledge graph, vector DB, cross-session memory** — unchanged from the
  original scope cut. Still out.
- **Separate Verification Agent / Model Verification Agent / Quality Agent
  as distinct pipeline stages** — a later review proposed these as
  independent agents re-checking Agent 1's and Agent 4's work. As specified,
  they had no independent signal to check against — they'd re-run the same
  statistical checks and relabel the result "verified," which is duplicated
  computation dressed as rigor, not real independent verification. The
  actual safety property (catching a bad inference before it reaches the
  report) is now built inline instead: Section 6.1's date-confidence
  thresholds, Section 6's target-selection veto scoring, the ML Agent's
  `verify_metrics()` step, and the Insight Agent's hallucination guard each
  check the one thing their own agent could plausibly get wrong, right where
  that agent produces it. Same protection, no duplicate agents.
- **Multi-source ingestion (JSON, Parquet, ORC, SQL databases, APIs)** —
  genuinely valuable and NOT rejected outright — see Section 15.1 (V2
  roadmap) below. The `SourceAdapter` seam (Section 6.0) exists specifically
  so this can be added later without touching Agents 1–7 or the
  orchestrator. It's deferred, not cut, because live SQL connections and API
  auth/pagination are real sub-projects that shouldn't block proving the
  core pipeline on CSV/XLSX first.
- **A separate "Dashboard Agent" that decides KPI cards, filters, layout,
  and dimensions autonomously** — this is the same pattern already rejected
  for chart selection: letting an LLM/agent decide what's "important"
  reintroduces non-determinism into something that should be predictable and
  testable. Section 10 (fixed Streamlit tabs) plus Agent 3's rule-based
  chart selection already deliver a complete, working dashboard — a human
  specified the layout once, deterministically, which is more reliable than
  an agent re-deciding it per dataset. Not needed.

### 16.1 Versioned roadmap (what "later" actually means)

To make "deferred" concrete instead of vague, here's the leveling:

- **V1 (this document, weeks 1–8):** CSV/XLSX only, 7 core agents, inline
  verification, Ollama, PII protection, resumability, PDF/PPTX, optional
  chat. This is what gets built and validated against real data first.
- **V2 (only after V1 is proven on 5+ real datasets):** add `json_adapter.py`,
  `parquet_adapter.py`, `sqlite_adapter.py`, `sql_adapter.py`,
  `api_adapter.py` behind the existing `SourceAdapter` interface. No changes
  to any agent — this is purely an ingestion-layer expansion.
- **V3 (only after V2, and only if the project's direction still calls for
  it):** genuinely independent verification using a second, different method
  (not a restatement of Agent 1's checks) — e.g., cross-checking semantic
  labels against a small human-labeled reference set — plus anomaly
  detection, richer domain reasoning, scheduled/recurring analysis.

Do not start V2 work while V1 is unvalidated, and do not start V3 while V2 is
unvalidated. Each level only earns the next once it's actually been run
against real datasets and shown to work.

The rule going forward: a suggestion earns a place in this document only if
it's cheap AND blocks the Definition of Done (Section 17). Anything else is
genuinely Phase 2+ — polish is endless, and the project only ships if scope
stays closed at some point. That point is now.

---

## 16.2 DOCUMENTATION & GIT DISCIPLINE

Beyond the `README.md` already implied throughout, create:
- **`ARCHITECTURE.md`** — the agent list, the DIO contract, and the pipeline
  diagram from Section 2, so a reader doesn't have to reconstruct it from code.
- **`SECURITY.md`** — the PII-before-LLM rule, file validation limits, and
  what is/isn't sent to the LLM, in one place.
- **`PROJECT_PROGRESS.md`** — updated after every phase (see 16.3).
- **`ERROR_CODES.md`** — already specified in Section 5.5; one line per code.

**`.gitignore` must exclude:** `.env`, any API keys/secrets, `runs/`
(generated per-run artifacts, not source), and any real dataset containing
actual PII if one is used for local testing. Commit only the synthetic/golden
fixture datasets from Section 13's testing requirements.

## 16.3 WORKING METHOD (how to execute each phase)

Before modifying code for a phase: inspect what already exists in the repo,
identify the relevant files, check existing tests, then implement only that
phase — not ahead of it. After implementing: run the tests, actually execute
them (don't claim they pass without running them), verify the phase's
Definition of Done against real output, then produce a short **Phase
Report** before moving on:

```
PHASE REPORT
Phase: <name>
Files created:
Files modified:
Tests executed:
Tests passed / failed:
Verification evidence: (e.g. "ran date_resolver against 20 fixture strings,
  18/20 correct, 2 correctly flagged ambiguous — see test output")
Known limitations:
Next phase:
```
Update `PROJECT_PROGRESS.md` with this after every phase. Do not proceed to
the next phase until the current one's Definition of Done is verified — not
assumed, not "looks right," actually run and checked.

---

## 17. DEFINITION OF DONE

The project is complete when: a stranger can clone the repo, run
`streamlit run app.py`, upload any real-world messy CSV they've never shown
you, and receive — without you touching any code — a cleaned dataset, an EDA
report with charts, a trained model (if a target exists) with metrics, plain-
English insights, a downloadable PDF, a downloadable PPTX, and (if Agent 7 is
built) a working chat box that answers questions about the results without
inventing numbers or exposing PII.

Test this end-to-end acceptance scenario yourself with 3 different real
datasets from 3 different domains before calling any version "finished."
