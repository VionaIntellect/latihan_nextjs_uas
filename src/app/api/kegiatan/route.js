import prisma from "@/lib/prisma";

export async function POST(request) {
  const {
    judulKegiatan,
    idOrganisasi,
    tanggalKegiatan,
    lokasi,
    jenisKegiatan,
    deskripsiSingkat,
    tautanPendaftaran,
  } = await request.json();

  if (
    !judulKegiatan ||
    !idOrganisasi ||
    !tanggalKegiatan ||
    !lokasi ||
    !jenisKegiatan ||
    !deskripsiSingkat
  ) {
    return new Response(JSON.stringify({ error: "Semua field wajib diisi" }), {
      status: 400,
    });
  }

  const kegiatan = await prisma.kegiatan.create({
    data: {
      judulKegiatan,
      idOrganisasi,
      tanggalKegiatan: new Date(tanggalKegiatan),
      lokasi,
      jenisKegiatan,
      deskripsiSingkat,
      tautanPendaftaran: tautanPendaftaran || null, 
    },
  });

  return new Response(JSON.stringify(kegiatan), { status: 201 });
}
