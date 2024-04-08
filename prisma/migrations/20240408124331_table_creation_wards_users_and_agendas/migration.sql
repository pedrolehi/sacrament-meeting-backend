-- CreateTable
CREATE TABLE "wards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stake" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT,
    "wardId" TEXT NOT NULL,
    CONSTRAINT "users_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "agendas" (
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
    "testimonies" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_wardId_email_key" ON "users"("wardId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "users_wardId_role_key" ON "users"("wardId", "role");
