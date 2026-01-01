CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
CREATE TABLE `contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`entryFee` decimal(10,2) NOT NULL DEFAULT '0.00',
	`prizePool` decimal(10,2) NOT NULL,
	`maxEntries` int NOT NULL,
	`currentEntries` int NOT NULL DEFAULT 0,
	`status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`startTime` timestamp NOT NULL,
	`endTime` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` varchar(255) NOT NULL,
	`seriesId` varchar(255),
	`name` varchar(255) NOT NULL,
	`matchType` varchar(50),
	`dateTimeGMT` timestamp NOT NULL,
	`venue` text,
	`status` varchar(100),
	`matchState` enum('fixture','live','result') NOT NULL,
	`team1` varchar(255),
	`team2` varchar(255),
	`team1Img` text,
	`team2Img` text,
	`scoreData` text,
	`seriesName` varchar(255),
	`fantasyEnabled` boolean NOT NULL DEFAULT true,
	`hasSquad` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(100),
	`battingStyle` varchar(100),
	`bowlingStyle` varchar(100),
	`imageUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_players` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userTeamId` int NOT NULL,
	`playerId` varchar(255) NOT NULL,
	`role` varchar(100),
	`points` decimal(10,2) NOT NULL DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `team_players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`userTeamId` int NOT NULL,
	`entryFee` decimal(10,2) NOT NULL,
	`finalRank` int,
	`winnings` decimal(10,2) NOT NULL DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`matchId` varchar(255) NOT NULL,
	`teamName` varchar(255) NOT NULL,
	`captainId` varchar(255),
	`viceCaptainId` varchar(255),
	`totalPoints` decimal(10,2) NOT NULL DEFAULT '0.00',
	`rank` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `dateOfBirth` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `age` int;--> statement-breakpoint
ALTER TABLE `users` ADD `isAgeVerified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `state` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `isRestricted` boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX `match_id_idx` ON `contests` (`matchId`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `contests` (`status`);--> statement-breakpoint
CREATE INDEX `match_state_idx` ON `matches` (`matchState`);--> statement-breakpoint
CREATE INDEX `date_time_idx` ON `matches` (`dateTimeGMT`);--> statement-breakpoint
CREATE INDEX `user_team_id_idx` ON `team_players` (`userTeamId`);--> statement-breakpoint
CREATE INDEX `player_id_idx` ON `team_players` (`playerId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_contests` (`userId`);--> statement-breakpoint
CREATE INDEX `contest_id_idx` ON `user_contests` (`contestId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_teams` (`userId`);--> statement-breakpoint
CREATE INDEX `contest_id_idx` ON `user_teams` (`contestId`);--> statement-breakpoint
CREATE INDEX `match_id_idx` ON `user_teams` (`matchId`);ALTER TABLE `contests` DROP COLUMN `entryFee`;--> statement-breakpoint
ALTER TABLE `contests` DROP COLUMN `prizePool`;--> statement-breakpoint
ALTER TABLE `user_contests` DROP COLUMN `entryFee`;--> statement-breakpoint
ALTER TABLE `user_contests` DROP COLUMN `winnings`;CREATE TABLE `contact_submissions` (
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
CREATE INDEX `email_idx` ON `contact_submissions` (`email`);ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `loginMethod` varchar(64) NOT NULL DEFAULT 'email';--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);