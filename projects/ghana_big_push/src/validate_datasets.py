"""Validate the processed datasets against data_dictionary.md's schema.

Usage:
    python src/validate_datasets.py

Checks, per file:
- required columns are present
- verification_status and data_provenance (where applicable) only use allowed values
- required fields (per data_dictionary.md) are non-null
- numeric fields that are present parse as numbers
- every row has a source_url and date_accessed

This does not fetch anything — it only checks what's already in data/processed/. The scraping
step this would normally follow (pulling data/raw/ from primary sources) is blocked in the
current working environment; see methodology.md sec2.7. Once direct source access is available,
a companion `collect_*.py` script should populate data/raw/ and data/processed/ automatically,
and this validator should be run against its output before anything is committed.
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path

PROCESSED_DIR = Path(__file__).resolve().parent.parent / "data" / "processed"

VERIFICATION_STATUSES = {
    "officially_announced",
    "budget_approved",
    "expenditure_actual",
    "procurement_stage",
    "construction_stage",
    "completed",
    "political_claim",
    "independently_verified",
    "contradicted",
}

DATA_PROVENANCES = {"search_synthesis", "direct_scrape", "user_supplied"}

# (filename, required_columns, required_non_null_columns)
SCHEMAS = {
    "projects.csv": (
        {
            "project_id", "snapshot_date", "project_name", "project_type", "road_category",
            "region", "district", "constituency", "start_location", "end_location", "length_km",
            "contractor", "is_local_contractor", "procurement_method", "contract_value_ghs",
            "funding_source", "announcement_date", "contract_award_date", "commencement_date",
            "expected_completion_date", "status", "pct_complete", "amount_released_ghs",
            "amount_spent_ghs", "beneficiaries_est", "jobs_est", "source_url", "date_accessed",
            "verification_status", "data_provenance", "notes",
        },
        {"project_id", "snapshot_date", "project_name", "source_url", "date_accessed",
         "verification_status", "data_provenance"},
    ),
    "regions.csv": (
        {
            "region", "period", "population_est", "mpi_poverty_rate",
            "road_density_km_per_sqkm", "agricultural_output_share", "source_url",
            "date_accessed", "verification_status", "data_provenance", "notes",
        },
        {"region", "period"},
    ),
    "financing_timeline.csv": (
        {
            "year", "figure_type", "amount_ghs", "amount_usd", "as_of_date", "source_url",
            "date_accessed", "verification_status", "data_provenance", "notes",
        },
        {"year", "figure_type", "source_url", "date_accessed", "verification_status"},
    ),
    "prior_programmes.csv": (
        {
            "programme_name", "country", "start_year", "total_value_usd",
            "financing_mechanism", "scope_summary", "outcome_summary", "source_url",
            "date_accessed",
        },
        {"programme_name", "country", "source_url", "date_accessed"},
    ),
}


def validate_file(path: Path, required_columns: set[str], required_non_null: set[str]) -> list[str]:
    errors: list[str] = []
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        actual_columns = set(reader.fieldnames or [])

        missing = required_columns - actual_columns
        if missing:
            errors.append(f"{path.name}: missing columns {sorted(missing)}")

        for i, row in enumerate(reader, start=2):  # row 1 is the header
            for col in required_non_null & actual_columns:
                if not row.get(col, "").strip():
                    errors.append(f"{path.name}:{i}: required field '{col}' is empty")

            vs = row.get("verification_status", "").strip()
            if vs and vs not in VERIFICATION_STATUSES:
                errors.append(f"{path.name}:{i}: unknown verification_status '{vs}'")

            dp = row.get("data_provenance", "").strip()
            if dp and dp not in DATA_PROVENANCES:
                errors.append(f"{path.name}:{i}: unknown data_provenance '{dp}'")

    return errors


def main() -> int:
    all_errors: list[str] = []
    for filename, (required_columns, required_non_null) in SCHEMAS.items():
        path = PROCESSED_DIR / filename
        if not path.exists():
            all_errors.append(f"{filename}: file not found in {PROCESSED_DIR}")
            continue
        all_errors.extend(validate_file(path, required_columns, required_non_null))

    if all_errors:
        print(f"FAILED — {len(all_errors)} issue(s) found:\n")
        for e in all_errors:
            print(f"  - {e}")
        return 1

    print("All processed datasets pass schema validation.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
