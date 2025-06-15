-- Power Dash Database Schema
-- Database: if0_39228567_portifolio
-- Host: sql209.infinityfree.com

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    status ENUM('active', 'completed', 'archived') DEFAULT 'active',
    client VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    budget DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    technologies JSON,
    image_url VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_client (client),
    INDEX idx_created_at (created_at)
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    projects_count INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    last_contact DATE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_company (company),
    INDEX idx_status (status)
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('project_created', 'project_completed', 'client_added', 'payment_received') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INT NULL,
    client_id INT NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- Create analytics table for tracking metrics
CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_date DATE NOT NULL UNIQUE,
    total_projects INT DEFAULT 0,
    active_projects INT DEFAULT 0,
    completed_projects INT DEFAULT 0,
    total_revenue DECIMAL(10, 2) DEFAULT 0.00,
    monthly_growth DECIMAL(5, 2) DEFAULT 0.00,
    client_satisfaction DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_metric_date (metric_date)
);

-- Create users table for authentication (future enhancement)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Insert sample data
INSERT INTO clients (name, email, company, phone, projects_count, total_spent, last_contact, status) VALUES
('João Silva', 'joao@techcorp.com', 'TechCorp Inc.', '+55 11 99999-0001', 3, 45000.00, '2024-01-20', 'active'),
('Maria Santos', 'maria@securebank.com', 'SecureBank', '+55 11 99999-0002', 2, 35000.00, '2024-01-15', 'active'),
('Pedro Costa', 'pedro@dataviz.com', 'DataViz Solutions', '+55 11 99999-0003', 1, 20000.00, '2024-02-10', 'active'),
('Ana Oliveira', 'ana@startup.com', 'StartupTech', '+55 11 99999-0004', 2, 28000.00, '2024-01-25', 'active'),
('Carlos Lima', 'carlos@ecommerce.com', 'E-Commerce Plus', '+55 11 99999-0005', 1, 15000.00, '2024-02-05', 'inactive');

INSERT INTO projects (title, description, category, status, client, start_date, end_date, budget, progress, technologies, image_url, live_url, github_url) VALUES
('Plataforma E-commerce', 'Solução moderna de e-commerce em React com integração de pagamentos', 'Desenvolvimento Web', 'active', 'TechCorp Inc.', '2024-01-15', NULL, 15000.00, 75, '["React", "Node.js", "PostgreSQL", "Stripe"]', '/placeholder.svg', 'https://techcorp-ecommerce.com', 'https://github.com/techcorp/ecommerce'),

('App Bancário Mobile', 'Aplicativo seguro de banco móvel com autenticação biométrica', 'Desenvolvimento Mobile', 'completed', 'SecureBank', '2023-10-01', '2024-01-10', 25000.00, 100, '["React Native", "TypeScript", "Firebase", "Biometrics"]', '/placeholder.svg', 'https://app.securebank.com', 'https://github.com/securebank/mobile-app'),

('Dashboard de IA', 'Dashboard de analytics com insights de machine learning', 'Ciência de Dados', 'active', 'DataViz Solutions', '2024-02-01', NULL, 20000.00, 45, '["Python", "React", "TensorFlow", "D3.js"]', '/placeholder.svg', 'https://dataviz-dashboard.com', 'https://github.com/dataviz/ai-dashboard'),

('Sistema de CRM', 'Sistema completo de gestão de relacionamento com cliente', 'Desenvolvimento Web', 'active', 'StartupTech', '2024-01-20', NULL, 18000.00, 60, '["Vue.js", "Laravel", "MySQL", "Redis"]', '/placeholder.svg', NULL, 'https://github.com/startup/crm'),

('Loja Virtual', 'E-commerce personalizado com painel administrativo', 'Desenvolvimento Web', 'completed', 'E-Commerce Plus', '2023-12-01', '2024-01-30', 15000.00, 100, '["Next.js", "Prisma", "PostgreSQL", "Tailwind"]', '/placeholder.svg', 'https://ecommerce-plus.com', 'https://github.com/ecommerce/store'),

('App de Delivery', 'Aplicativo de delivery com rastreamento em tempo real', 'Desenvolvimento Mobile', 'active', 'StartupTech', '2024-02-15', NULL, 10000.00, 30, '["Flutter", "Firebase", "Google Maps", "Payment API"]', '/placeholder.svg', NULL, 'https://github.com/startup/delivery');

INSERT INTO activities (type, title, description, project_id, client_id) VALUES
('project_completed', 'App Bancário Mobile Concluído', 'Entrega bem-sucedida do aplicativo bancário para SecureBank', 2, 2),
('client_added', 'Novo Cliente Adicionado', 'StartupTech se juntou como novo cliente', NULL, 4),
('payment_received', 'Pagamento Recebido', 'Recebido R$ 15.000 de pagamento da TechCorp Inc.', 1, 1),
('project_created', 'Novo Projeto Criado', 'App de Delivery iniciado para StartupTech', 6, 4),
('project_completed', 'Loja Virtual Concluída', 'E-commerce entregue com sucesso para E-Commerce Plus', 5, 5);

INSERT INTO analytics (metric_date, total_projects, active_projects, completed_projects, total_revenue, monthly_growth, client_satisfaction) VALUES
('2024-01-01', 8, 3, 5, 120000.00, 12.5, 4.7),
('2024-02-01', 10, 4, 6, 150000.00, 15.3, 4.8),
('2024-03-01', 12, 4, 8, 180000.00, 18.2, 4.9);

INSERT INTO users (name, email, password_hash, avatar_url, role) VALUES
('Julio Rayser', 'admin@powerdash.com', '$2b$10$example_hash_here', '/avatar.jpg', 'admin');

-- Create triggers to update client stats automatically
DELIMITER //

CREATE TRIGGER update_client_stats_after_project_insert
AFTER INSERT ON projects
FOR EACH ROW
BEGIN
    UPDATE clients 
    SET projects_count = (
        SELECT COUNT(*) FROM projects WHERE client = clients.company
    ),
    total_spent = (
        SELECT COALESCE(SUM(budget), 0) FROM projects WHERE client = clients.company
    )
    WHERE company = NEW.client;
END//

CREATE TRIGGER update_client_stats_after_project_update
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
    UPDATE clients 
    SET projects_count = (
        SELECT COUNT(*) FROM projects WHERE client = clients.company
    ),
    total_spent = (
        SELECT COALESCE(SUM(budget), 0) FROM projects WHERE client = clients.company
    )
    WHERE company = NEW.client OR company = OLD.client;
END//

CREATE TRIGGER update_client_stats_after_project_delete
AFTER DELETE ON projects
FOR EACH ROW
BEGIN
    UPDATE clients 
    SET projects_count = (
        SELECT COUNT(*) FROM projects WHERE client = clients.company
    ),
    total_spent = (
        SELECT COALESCE(SUM(budget), 0) FROM projects WHERE client = clients.company
    )
    WHERE company = OLD.client;
END//

DELIMITER ;
