
## Script MYSQL
```sql
ALTER TABLE flyers ADD COLUMN file_data LONGBLOB NOT NULL;

-- Ou, se estiver criando do zero:
CREATE TABLE flyers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_type ENUM('pdf', 'image') NOT NULL,
    notification_days JSON,
    file_data LONGBLOB NOT NULL, -- ← arquivo binário
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_flyers_created_at ON flyers(created_at DESC); 
```