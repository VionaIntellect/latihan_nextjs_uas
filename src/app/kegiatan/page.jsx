"use client";

import { useEffect, useState } from "react";
import styles from "./KegiatanPage.module.css";

export default function KegiatanPage() {
  const [kegiatanList, setKegiatanList] = useState([]);
  const [organisasiList, setOrganisasiList] = useState([]);
  const [form, setForm] = useState({
    judulKegiatan: "",
    idOrganisasi: "",
    tanggalKegiatan: "",
    lokasi: "",
    jenisKegiatan: "",
    deskripsiSingkat: "",
    tautanPendaftaran: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchKegiatan = async () => {
    const res = await fetch("/api/kegiatan");
    if (res.ok) {
      const data = await res.json();
      setKegiatanList(data);
    }
  };

  const fetchOrganisasi = async () => {
    const res = await fetch("/api/organisasi");
    if (res.ok) {
      const data = await res.json();
      setOrganisasiList(data);
    }
  };

  useEffect(() => {
    fetchKegiatan();
    fetchOrganisasi();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/kegiatan", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });

    if (res.ok) {
      setForm({
        judulKegiatan: "",
        idOrganisasi: "",
        tanggalKegiatan: "",
        lokasi: "",
        jenisKegiatan: "",
        deskripsiSingkat: "",
        tautanPendaftaran: "",
      });
      setEditId(null);
      fetchKegiatan();
    }
  };

  const handleEdit = (item) => {
    setForm({
      judulKegiatan: item.judulKegiatan,
      idOrganisasi: item.idOrganisasi,
      tanggalKegiatan: item.tanggalKegiatan.split("T")[0],
      lokasi: item.lokasi,
      jenisKegiatan: item.jenisKegiatan,
      deskripsiSingkat: item.deskripsiSingkat,
      tautanPendaftaran: item.tautanPendaftaran || "",
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/kegiatan?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchKegiatan();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manajemen Kegiatan</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="judulKegiatan"
          placeholder="Judul Kegiatan"
          value={form.judulKegiatan}
          onChange={handleChange}
          required
        />

        <select
          name="idOrganisasi"
          value={form.idOrganisasi}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Organisasi</option>
          {organisasiList.map((org) => (
            <option key={org.id} value={org.id}>
              {org.namaOrganisasi}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="tanggalKegiatan"
          value={form.tanggalKegiatan}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lokasi"
          placeholder="Lokasi"
          value={form.lokasi}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="jenisKegiatan"
          placeholder="Jenis Kegiatan"
          value={form.jenisKegiatan}
          onChange={handleChange}
          required
        />

        <textarea
          name="deskripsiSingkat"
          placeholder="Deskripsi Singkat"
          value={form.deskripsiSingkat}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="tautanPendaftaran"
          placeholder="Tautan Pendaftaran (opsional)"
          value={form.tautanPendaftaran}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Simpan Perubahan" : "Tambah Kegiatan"}
        </button>
      </form>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Organisasi</th>
              <th>Tanggal</th>
              <th>Lokasi</th>
              <th>Jenis</th>
              <th>Deskripsi</th>
              <th>Tautan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatanList.map((item) => (
              <tr key={item.id}>
                <td>{item.judulKegiatan}</td>
                <td>
                  {
                    organisasiList.find((org) => org.id === item.idOrganisasi)?.namaOrganisasi ||
                    "-"
                  }
                </td>
                <td>{new Date(item.tanggalKegiatan).toLocaleDateString()}</td>
                <td>{item.lokasi}</td>
                <td>{item.jenisKegiatan}</td>
                <td>{item.deskripsiSingkat}</td>
                <td>
                  {item.tautanPendaftaran ? (
                    <a href={item.tautanPendaftaran} target="_blank">Link</a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}