import prisma from "@/lib/prisma";

export async function GET() {
    const data = await prisma.organisasi.findMany( {
        orderBy : { id: 'asc'},
    });

    return new Response(JSON.stringify(data), {status: 200});
}

export async function POST(request) {
  const { namaOrganisasi, ketuaOrganisasi, noKontak, tahunDibentuk, pembina } = await request.json();

  if (!namaOrganisasi || !ketuaOrganisasi || !noKontak || !tahunDibentuk) {
    return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
      status: 400,
    });
  }

  const organisasi = await prisma.organisasi.create({
    data: {namaOrganisasi, ketuaOrganisasi, noKontak, tahunDibentuk, pembina},
  });

  return new Response(JSON.stringify(organisasi), { status: 201 });
}
