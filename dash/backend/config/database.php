<?php
/**
 * Power Dash - Database Configuration
 * MySQL Database Connection for InfinityFree hosting
 */

class Database {
    private $host = "sql209.infinityfree.com";
    private $db_name = "if0_39228567_portifolio";
    private $username = "if0_39228567";
    private $password = ""; // Add your database password here
    private $charset = "utf8mb4";
    private $pdo;

    public function connect() {
        $this->pdo = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            
            $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch(PDOException $e) {
            error_log("Connection Error: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }
        
        return $this->pdo;
    }
    
    public function getConnection() {
        return $this->pdo;
    }
}

// Database configuration for different environments
return [
    'production' => [
        'host' => 'sql209.infinityfree.com',
        'database' => 'if0_39228567_portifolio',
        'username' => 'if0_39228567',
        'password' => '', // Set your password
        'charset' => 'utf8mb4',
        'prefix' => '',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    ],
    
    'development' => [
        'host' => 'localhost',
        'database' => 'powerdash_dev',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8mb4',
        'prefix' => '',
    ]
];
?>
