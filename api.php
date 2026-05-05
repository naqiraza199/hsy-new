<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$host = $_SERVER['HTTP_HOST'];
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];
$scriptDir = dirname(__FILE__);
$distPath = $scriptDir . '/dist';

define('LISTINGS_PATH', $scriptDir . '/listings.json');
define('BROKERS_PATH', $scriptDir . '/broker.json');
define('BLOGS_PATH', $scriptDir . '/blogs.json');
define('EVENTS_PATH', $scriptDir . '/events.json');

if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function loadJsonFile($filepath) {
    if (file_exists($filepath)) {
        $content = file_get_contents($filepath);
        return json_decode($content, true);
    }
    return null;
}

function saveJsonFile($filepath, $data) {
    file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT));
    return true;
}

$uri = parse_url($requestUri, PHP_URL_PATH);

if (strpos($uri, '/api/') === 0) {
    $apiPath = str_replace('/api/', '', $uri);
    
    if ($apiPath === 'listings') {
        if ($requestMethod === 'GET') {
            $listings = loadJsonFile(LISTINGS_PATH);
            echo json_encode($listings ?: []);
        } elseif ($requestMethod === 'POST') {
            $input = file_get_contents('php://input');
            $newListings = json_decode($input, true);
            
            if (!$newListings) {
                echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
                exit;
            }
            
            if (isset($newListings['data']) || isset($newListings['listings'])) {
                $newListings = $newListings['data'] ?? $newListings['listings'] ?? [];
            }
            
            if (!is_array($newListings)) {
                $newListings = [$newListings];
            }
            
            $existingListings = loadJsonFile(LISTINGS_PATH) ?: [];
            $combinedListings = array_merge($existingListings, $newListings);
            saveJsonFile(LISTINGS_PATH, $combinedListings);
            
            echo json_encode([
                'success' => true,
                'message' => 'Added ' . count($newListings) . ' listings',
                'total' => count($combinedListings)
            ]);
        }
        exit;
    }
    
    if ($apiPath === 'brokers') {
        if ($requestMethod === 'GET') {
            $brokers = loadJsonFile(BROKERS_PATH);
            echo json_encode($brokers ?: []);
        } elseif ($requestMethod === 'POST') {
            $input = file_get_contents('php://input');
            $newBrokers = json_decode($input, true);
            
            if (!$newBrokers) {
                echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
                exit;
            }
            
            if (isset($newBrokers['data']) || isset($newBrokers['brokers'])) {
                $newBrokers = $newBrokers['data'] ?? $newBrokers['brokers'] ?? [];
            }
            
            if (!is_array($newBrokers)) {
                $newBrokers = [$newBrokers];
            }
            
            $existingBrokers = loadJsonFile(BROKERS_PATH) ?: [];
            $combinedBrokers = array_merge($existingBrokers, $newBrokers);
            saveJsonFile(BROKERS_PATH, $combinedBrokers);
            
            echo json_encode([
                'success' => true,
                'message' => 'Added ' . count($newBrokers) . ' brokers',
                'total' => count($combinedBrokers)
            ]);
        }
        exit;
    }
    
    if ($apiPath === 'blogs') {
        if ($requestMethod === 'GET') {
            $blogs = loadJsonFile(BLOGS_PATH);
            echo json_encode($blogs ?: []);
        } elseif ($requestMethod === 'POST') {
            $input = file_get_contents('php://input');
            $newBlogs = json_decode($input, true);
            
            if (!$newBlogs) {
                echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
                exit;
            }
            
            if (isset($newBlogs['data']) || isset($newBlogs['blogs'])) {
                $newBlogs = $newBlogs['data'] ?? $newBlogs['blogs'] ?? [];
            }
            
            if (!is_array($newBlogs)) {
                $newBlogs = [$newBlogs];
            }
            
            $existingBlogs = loadJsonFile(BLOGS_PATH) ?: [];
            $combinedBlogs = array_merge($existingBlogs, $newBlogs);
            saveJsonFile(BLOGS_PATH, $combinedBlogs);
            
            echo json_encode([
                'success' => true,
                'message' => 'Added ' . count($newBlogs) . ' blogs',
                'total' => count($combinedBlogs)
            ]);
        }
        exit;
    }
    
    if ($apiPath === 'events') {
        if ($requestMethod === 'GET') {
            $events = loadJsonFile(EVENTS_PATH);
            echo json_encode($events ?: []);
        } elseif ($requestMethod === 'POST') {
            $input = file_get_contents('php://input');
            $newEvents = json_decode($input, true);
            
            if (!$newEvents) {
                echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
                exit;
            }
            
            if (isset($newEvents['data']) || isset($newEvents['events'])) {
                $newEvents = $newEvents['data'] ?? $newEvents['events'] ?? [];
            }
            
            if (!is_array($newEvents)) {
                $newEvents = [$newEvents];
            }
            
            $existingEvents = loadJsonFile(EVENTS_PATH) ?: [];
            $combinedEvents = array_merge($existingEvents, $newEvents);
            saveJsonFile(EVENTS_PATH, $combinedEvents);
            
            echo json_encode([
                'success' => true,
                'message' => 'Added ' . count($newEvents) . ' events',
                'total' => count($combinedEvents)
            ]);
        }
        exit;
    }
}

if (empty($uri) || $uri === '/') {
    $indexPath = $distPath . '/index.html';
    if (file_exists($indexPath)) {
        readfile($indexPath);
    } else {
        http_response_code(404);
        echo 'index.html not found';
    }
    exit;
}

if (strpos($uri, '/data/') === 0) {
    $dataFile = $distPath . $uri;
    
    if (file_exists($dataFile) && is_file($dataFile)) {
        header('Content-Type: application/json');
        readfile($dataFile);
        exit;
    }
}

$filePath = $distPath . $uri;

if (file_exists($filePath) && is_file($filePath)) {
    $extension = pathinfo($filePath, PATHINFO_EXTENSION);
    
    $mimeTypes = [
        'html' => 'text/html',
        'js' => 'application/javascript',
        'css' => 'text/css',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
        'mp4' => 'video/mp4',
        'webm' => 'video/webm',
        'ico' => 'image/x-icon'
    ];
    
    if (isset($mimeTypes[$extension])) {
        header('Content-Type: ' . $mimeTypes[$extension]);
    }
    
    readfile($filePath);
    exit;
}

$fallbackPath = $distPath . '/index.html';
if (file_exists($fallbackPath)) {
    readfile($fallbackPath);
} else {
    http_response_code(404);
    echo 'File not found: ' . $uri;
}