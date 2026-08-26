-- ============================================================
-- MOHANTY UDYOG — cPanel MySQL Database Schema
-- Run this SQL query inside phpMyAdmin in your cPanel.
-- ============================================================

CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT '',
  `company` VARCHAR(255) DEFAULT '',
  `productInterested` VARCHAR(255) DEFAULT 'General Inquiry',
  `requirement` TEXT DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `city` VARCHAR(100) DEFAULT '',
  `state` VARCHAR(100) DEFAULT '',
  `source` VARCHAR(100) DEFAULT 'Website Contact Form',
  `status` ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional sample initial data
INSERT INTO `leads` (`id`, `name`, `phone`, `email`, `company`, `productInterested`, `requirement`, `message`, `city`, `state`, `source`, `status`, `createdAt`)
VALUES 
('lead-101', 'Rajesh Sharma', '+91 98765 12345', 'rajesh@standardpackaging.in', 'Standard Packaging Ltd.', 'Fully Automatic Double Die Paper Plate Machine', '2 Double Die Machines for new factory line', 'We need delivery in Gujarat within 10 days.', 'Ahmedabad', 'Gujarat', 'Contact Form', 'new', NOW()),
('lead-102', 'Suresh Gupta', '+91 98123 45678', 'suresh.indore@gmail.com', 'Gupta Disposable Industries', 'Heavy Duty Hydraulic Paper Thali Machine', '1 Hydraulic 5-Ton Press + Dies', 'Looking to manufacture deep wrinkle 400 GSM silver thalis.', 'Indore', 'Madhya Pradesh', 'Product Detail Page', 'contacted', NOW());
