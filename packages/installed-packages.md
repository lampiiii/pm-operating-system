# Installed Packages

> Last updated: 2026-03-16

## npm (Project)

| Package | Version | Purpose |
|---------|---------|---------|
| *(none — zero-dependency server)* | — | All HTML pages use inline CSS, no build step needed |

## Python (pip3 — system)

| Package | Version | Purpose |
|---------|---------|---------|
| charset-normalizer | 3.4.4 | Character encoding detection |
| pillow | 12.1.1 | Image processing (used by reportlab) |
| pip | 26.0 | Python package installer |
| PyYAML | 6.0.3 | YAML parser and emitter |
| reportlab | 4.4.10 | PDF generation (Word/Excel to PDF workflows) |
| wheel | 0.46.3 | Built-package format for Python |

## Python (venv — `venv/`)

> Activate: `source venv/bin/activate`

### Core Data Analysis

| Package | Version | Purpose |
|---------|---------|---------|
| pandas | 2.3.3 | Data manipulation, cleaning, aggregation |
| numpy | 2.3.5 | Numerical computing, array operations |
| polars | 1.39.0 | Fast alternative to pandas for large datasets |
| scipy | 1.17.1 | Optimization, signal processing, statistical tests |

### Visualization

| Package | Version | Purpose |
|---------|---------|---------|
| matplotlib | 3.10.8 | Foundational plotting library |
| seaborn | 0.13.2 | Statistical visualizations |
| plotly | 6.6.0 | Interactive charts and dashboards |

### Statistical Analysis & Forecasting

| Package | Version | Purpose |
|---------|---------|---------|
| statsmodels | 0.14.6 | Regression, ARIMA, hypothesis testing, time series |
| prophet | 1.3.0 | Time series forecasting with seasonality (Meta) |
| pmdarima | 2.1.1 | Auto-ARIMA model selection |
| sktime | 0.40.1 | Unified time series ML framework |
| darts | 0.42.1 | Time series forecasting (multiple model types) |

### Machine Learning

| Package | Version | Purpose |
|---------|---------|---------|
| scikit-learn | 1.7.2 | Classification, regression, clustering, feature engineering |
| xgboost | 3.2.0 | Gradient boosting (top performer on tabular data) |
| lightgbm | 4.6.0 | Fast gradient boosting |
| catboost | 1.2.10 | Gradient boosting with native categorical support |

### Deep Learning

| Package | Version | Purpose |
|---------|---------|---------|
| torch | 2.10.0 | PyTorch — flexible deep learning framework |
| pytorch-lightning | 2.6.1 | High-level PyTorch training wrapper |
| neuralforecast | 0.1.0 | Neural network models for time series |

> **Note:** TensorFlow/Keras not installed — no Python 3.14 build available yet.

### Bayesian / Probabilistic

| Package | Version | Purpose |
|---------|---------|---------|
| pymc | 5.28.1 | Bayesian modeling and inference |
| arviz | 0.23.4 | Bayesian model diagnostics and visualization |

### Domain-Specific

| Package | Version | Purpose |
|---------|---------|---------|
| lifelines | 0.30.3 | Survival analysis |
| pyod | 2.0.7 | Outlier and anomaly detection |
| tsfresh | 0.21.1 | Automated time series feature extraction |

### Data Loading & Processing

| Package | Version | Purpose |
|---------|---------|---------|
| sqlalchemy | 2.0.48 | Database connections |
| openpyxl | 3.1.5 | Excel file handling |
| requests | 2.32.5 | HTTP requests / API data fetching |
| httpx | 0.28.1 | Async-capable HTTP client |

## CDN (loaded via HTML, not installed locally)

| Package | Version | Used In |
|---------|---------|---------|
| SortableJS | 1.15.6 | Action Tracker — Kanban drag & drop |
| Google Sans Font | latest | Portfolio homepage, Action Tracker dashboard |

## npm (Global)

| Package | Version | Purpose |
|---------|---------|---------|
| npm | 11.11.0 | Node.js package manager |
| @googleworkspace/cli | 0.16.0 | Google Workspace CLI with MCP server (Drive, Docs, Sheets, Gmail, Calendar) |
