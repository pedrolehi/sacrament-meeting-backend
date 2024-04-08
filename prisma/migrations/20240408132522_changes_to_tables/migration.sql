/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardId` to the `agendas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT,
    "password" TEXT NOT NULL,
    "wardId" TEXT NOT NULL,
    CONSTRAINT "users_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users" ("email", "id", "name", "phone", "role", "wardId") SELECT "email", "id", "name", "phone", "role", "wardId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_wardId_email_key" ON "users"("wardId", "email");
CREATE UNIQUE INDEX "users_wardId_role_key" ON "users"("wardId", "role");
CREATE TABLE "new_agendas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "attendants" INTEGER NOT NULL,
    "presiding_authority" TEXT NOT NULL,
    "conductor" TEXT,
    "regent" TEXT,
    "organist" TEXT,
    "announciments" TEXT,
    "ordinances" TEXT,
    "callings" TEXT,
    "type_of_meeting" TEXT NOT NULL,
    "speakers" TEXT,
    "hymns" TEXT,
    "testimonies" TEXT,
    "wardId" TEXT NOT NULL,
    CONSTRAINT "agendas_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_agendas" ("announciments", "attendants", "callings", "conductor", "date", "hymns", "id", "ordinances", "organist", "presiding_authority", "regent", "speakers", "testimonies", "type_of_meeting") SELECT "announciments", "attendants", "callings", "conductor", "date", "hymns", "id", "ordinances", "organist", "presiding_authority", "regent", "speakers", "testimonies", "type_of_meeting" FROM "agendas";
DROP TABLE "agendas";
ALTER TABLE "new_agendas" RENAME TO "agendas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
