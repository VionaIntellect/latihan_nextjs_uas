"use client";

import { useEffect, useState } from "react";

export default function OrganisasiPage() {
  const [organisasis, setOrganisasis] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [ketuaOrganisasi, setKetuaOrganisasi] = useState("");
  const [noKontak, setNoKontak] = useState("");
  const [tahunDibentuk, setTahunDibentuk] = useState("");
  const [pembina, setPembina] = useState("");

  const fetchOrganisasis = async () => {
    const res = await fetch("/api/organisasi");
    const data = await res.json();
    setOrganisasis(data);
  };

  useEffect(() => {
    fetchOrganisasis();
  }, []);

  const resetForm = () => {
    setNamaOrganisasi("");
    setKetuaOrganisasi("");
    setNoKontak("");
    setTahunDibentuk("");
    setPembina("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      namaOrganisasi,
      ketuaOrganisasi,
      noKontak,
      tahunDibentuk: parseInt(tahunDibentuk),
      pembina,
    };

    const res = await fetch("/api/organisasi", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { id: editId, ...payload } : payload),
    });

    if (res.ok) {
      await fetchOrganisasis();
      resetForm();
      setFormVisible(false);
    }
  };

  const handleEdit = (item) => {
    setFormVisible(true);
    setEditId(item.id);
    setNamaOrganisasi(item.namaOrganisasi);
    setKetuaOrganisasi(item.ketuaOrganisasi);
    setNoKontak(item.noKontak);
    setTahunDibentuk(item.tahunDibentuk);
    setPembina(item.pembina);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirm) return;

    const res = await fetch("/api/organisasi", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      await fetchOrganisasis();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manajemen Organisasi</h1>

      <button
        onClick={() => {
          if (formVisible) resetForm();
          setFormVisible(!formVisible);
        }}
        style={{ marginBottom: "10px" }}
      >
        {formVisible ? "Tutup Form" : "Tambah Organisasi"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div>
            <label>Nama Organisasi:</label>
            <input
              type="text"
              value={namaOrganisasi}
              onChange={(e) => setNamaOrganisasi(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ketua Organisasi:</label>
            <input
              type="text"
              value={ketuaOrganisasi}
              onChange={(e) => setKetuaOrganisasi(e.target.value)}
              required
            />
          </div>
          <div>
            <label>No Kontak:</label>
            <input
              type="text"
              value={noKontak}
              onChange={(e) => setNoKontak(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tahun Dibentuk:</label>
            <input
              type="number"
              value={tahunDibentuk}
              onChange={(e) => setTahunDibentuk(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Pembina:</label>
            <input
              type="text"
              value={pembina}
              onChange={(e) => setPembina(e.target.value)}
            />
          </div>
          <button type="submit">
            {editId ? "Perbarui Data" : "Simpan"}
          </button>
        </form>
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Organisasi</th>
            <th>Ketua</th>
            <th>No Kontak</th>
            <th>Tahun Dibentuk</th>
            <th>Pembina</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {organisasis.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.namaOrganisasi}</td>
              <td>{item.ketuaOrganisasi}</td>
              <td>{item.noKontak}</td>
              <td>{item.tahunDibentuk}</td>
              <td>{item.pembina}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
          {organisasis.length === 0 && (
            <tr>
              <td colSpan="7">Belum ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
