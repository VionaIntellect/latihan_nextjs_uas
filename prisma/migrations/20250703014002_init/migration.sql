-- CreateTable
CREATE TABLE "Organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaOrganisasi" TEXT NOT NULL,
    "ketuaOrganisasi" TEXT NOT NULL,
    "noKontak" TEXT NOT NULL,
    "tahunDibentuk" INTEGER NOT NULL,
    "pembina" TEXT
);

-- CreateTable
CREATE TABLE "Kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judulKegiatan" TEXT NOT NULL,
    "idOrganisasi" INTEGER NOT NULL,
    "tanggalKegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenisKegiatan" TEXT NOT NULL,
    "deskripsiSingkat" TEXT NOT NULL,
    "tautanPendaftaran" TEXT,
    CONSTRAINT "Kegiatan_idOrganisasi_fkey" FOREIGN KEY ("idOrganisasi") REFERENCES "Organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
