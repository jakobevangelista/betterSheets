import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, varchar, mysqlEnum, datetime, unique, text, bigint, int } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const channel = mysqlTable("Channel", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	type: mysqlEnum("type", ['TEXT','AUDIO','VIDEO']).default('TEXT').notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
	serverId: varchar("serverId", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		profileIdIdx: index("Channel_profileId_idx").on(table.profileId),
		serverIdIdx: index("Channel_serverId_idx").on(table.serverId),
		channelId: primaryKey(table.id),
	}
});

export const member = mysqlTable("Member", {
	id: varchar("id", { length: 191 }).notNull(),
	role: mysqlEnum("role", ['ADMIN','MODERATOR','GUEST']).default('GUEST').notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
	serverId: varchar("serverId", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		profileIdIdx: index("Member_profileId_idx").on(table.profileId),
		serverIdIdx: index("Member_serverId_idx").on(table.serverId),
		memberId: primaryKey(table.id),
	}
});

export const profile = mysqlTable("Profile", {
	id: varchar("id", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	imageUrl: text("imageUrl").notNull(),
	email: text("email").notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		profileId: primaryKey(table.id),
		profileUserIdKey: unique("Profile_userId_key").on(table.userId),
	}
});

export const server = mysqlTable("Server", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	imageUrl: text("imageUrl").notNull(),
	inviteCode: varchar("inviteCode", { length: 191 }).notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		profileIdIdx: index("Server_profileId_idx").on(table.profileId),
		serverId: primaryKey(table.id),
		serverInviteCodeKey: unique("Server_inviteCode_key").on(table.inviteCode),
	}
});

export const prismaMigrations = mysqlTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: datetime("finished_at", { mode: 'string', fsp: 3 }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: datetime("rolled_back_at", { mode: 'string', fsp: 3 }),
	startedAt: datetime("started_at", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	appliedStepsCount: int("applied_steps_count").default(0).notNull(),
},
(table) => {
	return {
		prismaMigrationsId: primaryKey(table.id),
	}
});

export const project1Cities = mysqlTable("project1_cities", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	name: varchar("name", { length: 256 }),
	countryId: int("country_id"),
	popularity: mysqlEnum("popularity", ['unknown','known','popular']),
	headcount: int("headcount"),
},
(table) => {
	return {
		project1CitiesId: primaryKey(table.id),
	}
});

export const project1Countries = mysqlTable("project1_countries", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	name: varchar("name", { length: 256 }),
},
(table) => {
	return {
		project1CountriesId: primaryKey(table.id),
	}
});