-- JA ClaimsAssist - MVP Datenmodell, Entwurf v0.1
-- Zielsystem z. B. PostgreSQL / Supabase / SQL Server anpassbar

CREATE TABLE companies (
    id              VARCHAR(20) PRIMARY KEY,
    code            VARCHAR(10) NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    country         VARCHAR(100),
    is_internal     BOOLEAN NOT NULL DEFAULT TRUE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id              VARCHAR(30) PRIMARY KEY,
    company_id      VARCHAR(20) REFERENCES companies(id),
    full_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(100),
    role            VARCHAR(50) NOT NULL,
    status          VARCHAR(30) NOT NULL DEFAULT 'aktiv',
    password_hash   VARCHAR(255),
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE damage_types (
    id              VARCHAR(30) PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    case_area       VARCHAR(30) NOT NULL, -- SNR, KFS, SUB
    is_active       BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE claims (
    id                          VARCHAR(30) PRIMARY KEY,
    internal_number             VARCHAR(50) NOT NULL UNIQUE,
    number_type                 VARCHAR(10) NOT NULL, -- SNR/KFS
    company_id                  VARCHAR(20) REFERENCES companies(id),
    damage_type_id              VARCHAR(30) REFERENCES damage_types(id),
    processing_status           VARCHAR(100) NOT NULL,
    document_status             VARCHAR(100) NOT NULL,
    amount_status               VARCHAR(100),
    damage_date                 DATE,
    damage_time                 TIME,
    damage_location             TEXT,
    client_name                 VARCHAR(255),
    client_reference            VARCHAR(255),
    tour_number                 VARCHAR(100),
    shipment_number             VARCHAR(100),
    truck_plate                 VARCHAR(50),
    trailer_plate               VARCHAR(50),
    driver_name                 VARCHAR(255),
    description_what_happened   TEXT,
    description_how_happened    TEXT,
    estimated_amount            DECIMAL(12,2),
    claimed_amount              DECIMAL(12,2),
    checked_amount              DECIMAL(12,2),
    currency                    VARCHAR(10) DEFAULT 'EUR',
    kravag_claim_number         VARCHAR(100),
    insurance_policy_number     VARCHAR(100),
    created_by_user_id          VARCHAR(30) REFERENCES users(id),
    created_at                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id                  VARCHAR(30) PRIMARY KEY,
    claim_id             VARCHAR(30) NOT NULL REFERENCES claims(id),
    document_type        VARCHAR(100) NOT NULL,
    file_name            VARCHAR(255) NOT NULL,
    file_url             TEXT,
    status               VARCHAR(50) NOT NULL DEFAULT 'vorhanden',
    ai_summary           TEXT,
    ai_extracted_data    JSON,
    uploaded_by_user_id  VARCHAR(30) REFERENCES users(id),
    uploaded_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE history_entries (
    id                  VARCHAR(30) PRIMARY KEY,
    claim_id             VARCHAR(30) NOT NULL REFERENCES claims(id),
    entry_type           VARCHAR(50) NOT NULL, -- manuell, email, telefon, system
    subject              VARCHAR(255),
    content              TEXT NOT NULL,
    communication_partner VARCHAR(255),
    follow_up_date       DATE,
    created_by_user_id   VARCHAR(30) REFERENCES users(id),
    created_at           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subcontractors (
    id              VARCHAR(30) PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    address         TEXT,
    country         VARCHAR(100),
    contact_email   VARCHAR(255),
    contact_phone   VARCHAR(100),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_claims_internal_number ON claims(internal_number);
CREATE INDEX idx_claims_kravag_number ON claims(kravag_claim_number);
CREATE INDEX idx_claims_company ON claims(company_id);
CREATE INDEX idx_documents_claim ON documents(claim_id);
CREATE INDEX idx_history_claim ON history_entries(claim_id);
