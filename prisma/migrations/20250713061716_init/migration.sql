/*
  Warnings:

  - You are about to drop the column `deskripsiSingkat` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `idOrganisasi` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `jenisKegiatan` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `judulKegiatan` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalKegiatan` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `tautanPendaftaran` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `ketuaOrganisasi` on the `organisasi` table. All the data in the column will be lost.
  - You are about to drop the column `namaOrganisasi` on the `organisasi` table. All the data in the column will be lost.
  - You are about to drop the column `noKontak` on the `organisasi` table. All the data in the column will be lost.
  - You are about to drop the column `tahunDibentuk` on the `organisasi` table. All the data in the column will be lost.
  - Added the required column `deskripsi_singkat` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_organisasi` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kegiatan` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judul_kegiatan` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_kegiatan` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ketua_organisasi` to the `organisasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_organisasi` to the `organisasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_kontak` to the `organisasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun_dibentuk` to the `organisasi` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul_kegiatan" TEXT NOT NULL,
    "id_organisasi" INTEGER NOT NULL,
    "tanggal_kegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenis_kegiatan" TEXT NOT NULL,
    "deskripsi_singkat" TEXT NOT NULL,
    "tautan_pendaftaran" TEXT,
    CONSTRAINT "kegiatan_id_organisasi_fkey" FOREIGN KEY ("id_organisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_kegiatan" ("id", "lokasi") SELECT "id", "lokasi" FROM "kegiatan";
DROP TABLE "kegiatan";
ALTER TABLE "new_kegiatan" RENAME TO "kegiatan";
CREATE TABLE "new_organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_organisasi" TEXT NOT NULL,
    "ketua_organisasi" TEXT NOT NULL,
    "no_kontak" TEXT NOT NULL,
    "tahun_dibentuk" INTEGER NOT NULL,
    "pembina" TEXT NOT NULL
);
INSERT INTO "new_organisasi" ("id", "pembina") SELECT "id", "pembina" FROM "organisasi";
DROP TABLE "organisasi";
ALTER TABLE "new_organisasi" RENAME TO "organisasi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
