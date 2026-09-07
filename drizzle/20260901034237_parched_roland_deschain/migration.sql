CREATE TABLE `reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`date` text NOT NULL UNIQUE,
	`breakfast` text DEFAULT 'empty' NOT NULL,
	`lunch` text DEFAULT 'empty' NOT NULL,
	`dinner` text DEFAULT 'empty' NOT NULL
);
