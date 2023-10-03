-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Channel` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`type` enum('TEXT','AUDIO','VIDEO') NOT NULL DEFAULT 'TEXT',
	`profileId` varchar(191) NOT NULL,
	`serverId` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `Channel_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Member` (
	`id` varchar(191) NOT NULL,
	`role` enum('ADMIN','MODERATOR','GUEST') NOT NULL DEFAULT 'GUEST',
	`profileId` varchar(191) NOT NULL,
	`serverId` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `Member_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Profile` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`imageUrl` text NOT NULL,
	`email` text NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `Profile_id` PRIMARY KEY(`id`),
	CONSTRAINT `Profile_userId_key` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `Server` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`imageUrl` text NOT NULL,
	`inviteCode` varchar(191) NOT NULL,
	`profileId` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `Server_id` PRIMARY KEY(`id`),
	CONSTRAINT `Server_inviteCode_key` UNIQUE(`inviteCode`)
);
--> statement-breakpoint
CREATE TABLE `_prisma_migrations` (
	`id` varchar(36) NOT NULL,
	`checksum` varchar(64) NOT NULL,
	`finished_at` datetime(3),
	`migration_name` varchar(255) NOT NULL,
	`logs` text,
	`rolled_back_at` datetime(3),
	`started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`applied_steps_count` int unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `_prisma_migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project1_cities` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`country_id` int,
	`popularity` enum('unknown','known','popular'),
	`headcount` int,
	CONSTRAINT `project1_cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project1_countries` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `project1_countries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `Channel_profileId_idx` ON `Channel` (`profileId`);--> statement-breakpoint
CREATE INDEX `Channel_serverId_idx` ON `Channel` (`serverId`);--> statement-breakpoint
CREATE INDEX `Member_profileId_idx` ON `Member` (`profileId`);--> statement-breakpoint
CREATE INDEX `Member_serverId_idx` ON `Member` (`serverId`);--> statement-breakpoint
CREATE INDEX `Server_profileId_idx` ON `Server` (`profileId`);
*/