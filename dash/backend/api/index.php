<?php
/**
 * Power Dash API
 * RESTful API for portfolio management
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://juliorayser.great-site.net');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

class PowerDashAPI {
    private $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->connect();
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $segments = explode('/', trim($path, '/'));
        
        // Remove 'api' from segments if present
        if ($segments[0] === 'api') {
            array_shift($segments);
        }
        
        $endpoint = $segments[0] ?? '';
        $id = $segments[1] ?? null;
        
        try {
            switch ($endpoint) {
                case 'projects':
                    $this->handleProjects($method, $id);
                    break;
                case 'clients':
                    $this->handleClients($method, $id);
                    break;
                case 'activities':
                    $this->handleActivities($method, $id);
                    break;
                case 'analytics':
                    $this->handleAnalytics($method, $id);
                    break;
                case 'dashboard-stats':
                    $this->getDashboardStats();
                    break;
                case 'chart-data':
                    $this->getChartData();
                    break;
                default:
                    $this->sendResponse(404, ['error' => 'Endpoint not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => $e->getMessage()]);
        }
    }
    
    private function handleProjects($method, $id) {
        switch ($method) {
            case 'GET':
                if ($id) {
                    $this->getProject($id);
                } else {
                    $this->getProjects();
                }
                break;
            case 'POST':
                $this->createProject();
                break;
            case 'PUT':
                $this->updateProject($id);
                break;
            case 'DELETE':
                $this->deleteProject($id);
                break;
            default:
                $this->sendResponse(405, ['error' => 'Method not allowed']);
        }
    }
    
    private function getProjects() {
        $stmt = $this->db->query("
            SELECT 
                id,
                title,
                description,
                category,
                status,
                client,
                start_date as startDate,
                end_date as endDate,
                budget,
                progress,
                JSON_UNQUOTE(technologies) as technologies,
                image_url as imageUrl,
                live_url as liveUrl,
                github_url as githubUrl,
                created_at as createdAt,
                updated_at as updatedAt
            FROM projects 
            ORDER BY updated_at DESC
        ");
        
        $projects = $stmt->fetchAll();
        
        // Parse technologies JSON
        foreach ($projects as &$project) {
            $project['technologies'] = json_decode($project['technologies'], true) ?: [];
        }
        
        $this->sendResponse(200, $projects);
    }
    
    private function getProject($id) {
        $stmt = $this->db->prepare("
            SELECT 
                id,
                title,
                description,
                category,
                status,
                client,
                start_date as startDate,
                end_date as endDate,
                budget,
                progress,
                JSON_UNQUOTE(technologies) as technologies,
                image_url as imageUrl,
                live_url as liveUrl,
                github_url as githubUrl,
                created_at as createdAt,
                updated_at as updatedAt
            FROM projects 
            WHERE id = ?
        ");
        
        $stmt->execute([$id]);
        $project = $stmt->fetch();
        
        if ($project) {
            $project['technologies'] = json_decode($project['technologies'], true) ?: [];
            $this->sendResponse(200, $project);
        } else {
            $this->sendResponse(404, ['error' => 'Project not found']);
        }
    }
    
    private function createProject() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $this->db->prepare("
            INSERT INTO projects 
            (title, description, category, status, client, start_date, end_date, budget, progress, technologies, image_url, live_url, github_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $technologies = json_encode($data['technologies'] ?? []);
        
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['category'],
            $data['status'],
            $data['client'],
            $data['startDate'],
            $data['endDate'] ?? null,
            $data['budget'],
            $data['progress'],
            $technologies,
            $data['imageUrl'] ?? null,
            $data['liveUrl'] ?? null,
            $data['githubUrl'] ?? null
        ]);
        
        $projectId = $this->db->lastInsertId();
        $this->getProject($projectId);
    }
    
    private function handleClients($method, $id) {
        switch ($method) {
            case 'GET':
                $this->getClients();
                break;
            default:
                $this->sendResponse(405, ['error' => 'Method not allowed']);
        }
    }
    
    private function getClients() {
        $stmt = $this->db->query("
            SELECT 
                id,
                name,
                email,
                company,
                phone,
                projects_count as projectsCount,
                total_spent as totalSpent,
                last_contact as lastContact,
                status,
                created_at as createdAt,
                updated_at as updatedAt
            FROM clients 
            ORDER BY name
        ");
        
        $clients = $stmt->fetchAll();
        $this->sendResponse(200, $clients);
    }
    
    private function handleActivities($method, $id) {
        switch ($method) {
            case 'GET':
                $this->getActivities();
                break;
            default:
                $this->sendResponse(405, ['error' => 'Method not allowed']);
        }
    }
    
    private function getActivities() {
        $stmt = $this->db->query("
            SELECT 
                id,
                type,
                title,
                description,
                created_at as timestamp
            FROM activities 
            ORDER BY created_at DESC 
            LIMIT 10
        ");
        
        $activities = $stmt->fetchAll();
        $this->sendResponse(200, $activities);
    }
    
    private function getDashboardStats() {
        // Get latest analytics data
        $stmt = $this->db->query("
            SELECT 
                total_projects as totalProjects,
                active_projects as activeProjects,
                completed_projects as completedProjects,
                total_revenue as totalRevenue,
                monthly_growth as monthlyGrowth,
                client_satisfaction as clientSatisfaction
            FROM analytics 
            ORDER BY metric_date DESC 
            LIMIT 1
        ");
        
        $stats = $stmt->fetch();
        
        if (!$stats) {
            // Calculate stats from current data if no analytics record exists
            $projectStats = $this->db->query("
                SELECT 
                    COUNT(*) as totalProjects,
                    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as activeProjects,
                    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completedProjects,
                    SUM(budget) as totalRevenue
                FROM projects
            ")->fetch();
            
            $stats = [
                'totalProjects' => (int)$projectStats['totalProjects'],
                'activeProjects' => (int)$projectStats['activeProjects'],
                'completedProjects' => (int)$projectStats['completedProjects'],
                'totalRevenue' => (float)$projectStats['totalRevenue'],
                'monthlyGrowth' => 15.3,
                'clientSatisfaction' => 4.8
            ];
        }
        
        $this->sendResponse(200, $stats);
    }
    
    private function getChartData() {
        $stmt = $this->db->query("
            SELECT 
                DATE_FORMAT(metric_date, '%Y-%m') as date,
                total_projects as projects,
                total_revenue as revenue,
                (SELECT COUNT(DISTINCT client) FROM projects WHERE YEAR(created_at) = YEAR(metric_date) AND MONTH(created_at) = MONTH(metric_date)) as clients
            FROM analytics 
            ORDER BY metric_date DESC 
            LIMIT 6
        ");
        
        $chartData = $stmt->fetchAll();
        $this->sendResponse(200, array_reverse($chartData));
    }
    
    private function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit();
    }
}

// Initialize and handle the request
$api = new PowerDashAPI();
$api->handleRequest();
?>
