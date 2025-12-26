CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','in_progress','resolved') NOT NULL DEFAULT 'new',
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `status_idx` ON `contact_submissions` (`status`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `contact_submissions` (`email`);