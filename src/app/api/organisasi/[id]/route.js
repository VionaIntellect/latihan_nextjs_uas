import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const body = await req.json();
  const updated = await prisma.organisasi.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await prisma.organisasi.delete({
    where: { id: Number(params.id) },
  });
  return Response.json({ message: "Deleted successfully" });
}
