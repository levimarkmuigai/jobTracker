CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'applied' NOT NULL,
	`date_applied` integer,
	`link` text,
	`source` text,
	`next_action` text,
	`next_action_date` integer,
	`notes` text,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `job_id_idx` ON `applications` (`id`);