import { relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  bigint,
  uniqueIndex,
  varchar,
  mysqlTableCreator,
} from "drizzle-orm/mysql-core";

const mysqlTable = mysqlTableCreator((name) => `project1_${name}`);

// declaring enum in database
export const countries = mysqlTable("countries", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
});

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));

export const cities = mysqlTable("cities", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  countryId: int("country_id"),
  popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
  headcount: int("headcount"),
});

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
}));
