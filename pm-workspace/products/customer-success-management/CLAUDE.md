# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product Overview

This is the **Customer Success Management** product workspace within the PM Operating System.

## Context in Workspace

This product directory is part of:
```
/pm-workspace/products/customer-success-management/
```

**Related directories:**
- `../../growth-and-syncs/` - Career frameworks, goals, and 1:1 sync logs
- `../../styles/` - Communication style guides
- `../../CLAUDE.md` - Workspace-level guidance
- Feature-specific CLAUDE.md files in `features/[feature-name]/`

## Directory Structure

### `/strategy` - Product Strategy & Vision
Strategic documents that define the product direction.

**Key Files**:
- `vision-mission.md` - Product vision, mission, principles, personas, and strategic focus areas (template format - needs customization)

**Purpose**: Reference these files when making product decisions, prioritizing features, or communicating product direction.

### `/product-ideas-backlogs` - Product Ideas & Backlog
Space for capturing product ideas and backlog items.

**Key Files**:
- `active-backlog.md` - Current product ideas and backlog items
- `completed-backlog.md` - Completed/shipped backlog items
- `backlog-dashboard.html` - Interactive visual dashboard for backlog items

### `/documentation` - Platform Documentation
Reference documentation for the product platform.

### `/features` - Feature Documentation & Tracking
Active features currently in development.

**Convention**: Each feature should have its own subdirectory with relevant documentation, specs, and research.

### `/data-analysis` - Analytics & Data Insights

#### `/data-analysis/u2-platform` - U2 Platform Data Management
Centralized system for working with platform data exports.

**Key Files**:
- `README.md` - Comprehensive guide to data workflow, conventions, and best practices
- `definitions-registry.md` - CSV definition tracking and export log
- `queries/sample-queries.md` - Reusable query templates

**Note**: Empty data subdirectories (`raw-exports/`, `processed/`) have been removed. Recreate them when first data files are added.

**File Naming Convention**:
- Raw exports: `YYYY-MM-DD_definition-name_filters.csv`
- Processed files: `YYYY-MM-DD_definition-name_processed.csv`
- Analysis reports: `YYYY-MM-DD_analysis-topic.md`

**Workflow**:
1. Export data from your analytics platform
2. Save to `raw-exports/` with proper naming (create directory if needed)
3. Log export in `definitions-registry.md` with:
   - Definition ID
   - Date range
   - Filters applied
   - Purpose
   - Location
4. Process data and save to `processed/`
5. Document analysis in `analysis-reports/`

#### `/data-analysis/insights` - Cross-Platform Insights
- `weekly-insights.md` - Regular insight documentation

### `/research` - User Research & Competitive Analysis
Research artifacts and findings.

**Purpose**: Store and organize all user research to inform product decisions. Create subdirectories as needed when research begins.

## Key Workflows

### Strategic Planning Workflow
1. Start with `strategy/vision-mission.md` to understand product direction
2. Reference vision documents for detailed context
3. Use vision/mission to guide feature prioritization
4. Update strategic documents quarterly or as direction evolves

### Feature Development Workflow
1. **Planning**: Create feature directory in `features/`
2. **Development**: Maintain all specs, research, and docs in feature directory
3. **Release**: Archive or mark as shipped within the feature directory

### Data Analysis Workflow
1. **Export**: Get data from your analytics platform
2. **Save**: Place in `data-analysis/u2-platform/raw-exports/` with proper naming
3. **Log**: Document in `definitions-registry.md` with full details
4. **Process**: Clean data and save to `processed/`
5. **Analyze**: Conduct analysis and document findings
6. **Share**: Create report in `analysis-reports/` and summary in `insights/`

## Common Tasks & Commands

**Managing features:**
```bash
# List all active features
ls -la features/
```

**Working with data:**
```bash
# Search for specific definition
grep -i "DEF_001" data-analysis/u2-platform/definitions-registry.md

# Find analysis about specific topic
grep -ri "churn\|retention\|health score" data-analysis/
```

**Searching strategy docs:**
```bash
# Find vision/mission content
grep -i "vision\|mission\|principle" strategy/*.md
```

**Creating new feature directory:**
```bash
# Create feature directory structure
mkdir -p features/new-feature-name/{references,workings}
```

**Finding research insights:**
```bash
# Search all research (once files are added)
grep -ri "user feedback\|pain point\|customer request" research/
```

## Data Conventions

### CSV Definitions
- Each data export uses a predefined CSV definition (e.g., `DEF_001`)
- Track all definitions in `data-analysis/u2-platform/definitions-registry.md`
- Include: Definition ID, name, description, key fields, update frequency, use cases

### Export Logging
Always log exports with:
- Definition ID and name
- File name and location
- Date range
- Filters applied
- Number of records
- Export purpose
- Status

### Analysis Documentation
When creating analysis reports, include:
- Data sources (definition ID, date range, filters)
- Methodology
- Key findings
- Insights and implications
- Recommendations
- Next steps

## Decision Guide: Which Directory to Use?

**"I need to understand the product direction"**
-> Read: `strategy/vision-mission.md` + vision documents

**"I need to start a new feature"**
-> Create: Feature directory in `features/`

**"I need product data for analysis"**
-> Check: `data-analysis/u2-platform/definitions-registry.md` for available exports

**"I need user research insights"**
-> Check: `research/` for findings and raw data

**"I need to track feature progress"**
-> Check: `features/[feature-name]/` and its CLAUDE.md file

**"I need competitive intelligence"**
-> Check: `research/` directory and strategy documents

## File Organization Best Practices

**Feature Directory Structure:**
```
features/feature-name/
├── CLAUDE.md (feature-specific guidance)
├── references/ (source materials, PDFs, videos)
└── workings/ (analysis documents, research, specs)
```

**Naming Conventions:**
- **Data files**: `YYYY-MM-DD_description_segment.csv`
- **Analysis reports**: `YYYY-MM-DD_analysis-topic.md`
- **Feature directories**: `lowercase-with-hyphens`
- **Documents**: `descriptive-name.md`

**When to create subdirectories:**
- Create feature subdirectories in `features/`
- Create dated subdirectories in `research/` if organizing by time period
- Keep flat structure in `strategy/` - don't over-organize

## Important Notes

- **Vision/Mission Template**: The `strategy/vision-mission.md` is a template with placeholder content - customize with actual product information
- **Feature Organization**: Keep each feature in its own directory with all related materials
- **Data Hygiene**: Always log exports in the definitions registry before analysis
- **Naming Consistency**: Follow the YYYY-MM-DD naming convention for all data files
- **Cross-Reference**: Link analysis reports back to their source exports in the registry
- **Reference parent CLAUDE.md**: Use `../../CLAUDE.md` for workspace-wide conventions and style guides
- **Feature-specific guidance**: Check feature directories for their own CLAUDE.md files

## When Assisting

1. **Strategic Questions**: Reference `strategy/` documents for product vision, mission, and principles
2. **Feature Work**: Organize materials in appropriate feature directory with clear naming
3. **Data Analysis**:
   - Always check `definitions-registry.md` for available data sources
   - Follow the data workflow: export -> log -> process -> analyze
   - Use proper naming conventions
   - Document analysis thoroughly
4. **Research**: Store raw research in appropriate subdirectory, synthesize insights separately
5. **Features**: Maintain feature documentation in `features/` directories

## Quick Reference

### Most Important Files
- `strategy/vision-mission.md` - Product direction
- `data-analysis/u2-platform/README.md` - Data workflow guide
- `data-analysis/u2-platform/definitions-registry.md` - Data source tracking

### Directory Quick Links
- Active features: `features/`
- Data definitions: `data-analysis/u2-platform/definitions-registry.md`
- Data queries: `data-analysis/u2-platform/queries/sample-queries.md`
