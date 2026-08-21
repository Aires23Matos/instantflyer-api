
## Script PostgreSQL
```sql
-- Adiciona a coluna file_data (BYTEA) à tabela existente
ALTER TABLE flyers ADD COLUMN file_data BYTEA NOT NULL;

-- Ou, se estiver criando do zero:
CREATE TABLE flyers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(10) NOT NULL CHECK (file_type IN ('pdf', 'image')),
    notification_days JSONB,
    file_data BYTEA NOT NULL, -- ← arquivo binário
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_flyers_created_at ON flyers(created_at DESC);
```