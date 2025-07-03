import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    namaKegiatan,
    tanggalPelaksanaan,
    lokasi,
    deskripsi,
    organisasiId,
  } = await request.json();

  try {
    const updatedKegiatan = await prisma.kegiatan.update({
      where: { id: Number(id) },
      data: {
        namaKegiatan,
        tanggalPelaksanaan: new Date(tanggalPelaksanaan),
        lokasi,
        deskripsi,
        organisasiId,
      },
    });

    return new Response(JSON.stringify(updatedKegiatan), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gagal memperbarui kegiatan" }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.kegiatan.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: "Kegiatan berhasil dihapus" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gagal menghapus kegiatan" }), {
      status: 500,
    });
  }
}
