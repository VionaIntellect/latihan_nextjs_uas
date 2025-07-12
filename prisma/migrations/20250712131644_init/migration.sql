/*
  Warnings:

  - You are about to drop the `Kegiatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organisasi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Kegiatan";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Organisasi";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaOrganisasi" TEXT NOT NULL,
    "ketuaOrganisasi" TEXT NOT NULL,
    "noKontak" TEXT NOT NULL,
    "tahunDibentuk" DATETIME NOT NULL,
    "pembina" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judulKegiatan" TEXT NOT NULL,
    "idOrganisasi" INTEGER NOT NULL,
    "tanggalKegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenisKegiatan" TEXT NOT NULL,
    "deskripsiSingkat" TEXT NOT NULL,
    "tautanPendaftaran" TEXT NOT NULL,
    CONSTRAINT "kegiatan_idOrganisasi_fkey" FOREIGN KEY ("idOrganisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
