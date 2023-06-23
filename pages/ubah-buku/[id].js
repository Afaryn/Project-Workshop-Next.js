import React from "react";
import Layout from "@/widget/Layout";
import Link from "next/link";
import Judul from "@/component/judul";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "@/config/firebase";
import { doc,getDoc,updateDoc } from "firebase/firestore";

const UbahBuku = () => {
  const [namaBuku,setNamaBuku]= useState("");
  const [penulis,setPenulis]= useState("");
  const [deskripsiBuku,setDeskripsiBuku] = useState("");
  const [tahunTerbit, setTahunTerbit]= useState("");

  const router = useRouter();

  useEffect(()=>{
    const id = router.query.id;
    if (id) {
      const getBukuListById = async () => {
        const bukuDocRef = doc (db,"buku",id);
        try {
          const docSnap = await getDoc(bukuDocRef);
          const dataBuku = docSnap.data();
          setNamaBuku(dataBuku.nama_buku);
          setPenulis(dataBuku.penulis);
          setDeskripsiBuku(dataBuku.deskripsi_buku);
          setTahunTerbit(dataBuku.tahun_terbit);
        } catch (err) {
          console.error(err);
        }
      };
      getBukuListById();
    }
  },[router]);

  const handleUpdate = async (e)=> {
    const {id} = router.query;
    const bukuDocRef = doc (db,"buku",id);
    e.preventDefault();
    try {
      await updateDoc(bukuDocRef,{
        nama_buku : namaBuku,
        penulis : penulis,
        deskripsi_buku : deskripsiBuku,
        tahun_terbit : tahunTerbit,
      });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
          {/* judul */}
          <Judul title="Form Ubah Data Buku" />
          {/* FORM TAMBAH */}
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="text-md">Nama Buku</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="Text"
                name="nama_buku"
                onChange={(Event)=> {setNamaBuku(Event.target.value)}}
                value={namaBuku}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Penulis</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="Text"
                name="penulis"
                onChange={(Event)=> {setPenulis(Event.target.value)}}
                value={penulis}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Deskripsi Buku</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="Text"
                name="deskripsi_buku"
                onChange={(Event)=> {setDeskripsiBuku(Event.target.value)}}
                value={deskripsiBuku}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-md">tahun Terbit</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="Text"
                name="tahun_terbit"
                onChange={(Event)=> {setTahunTerbit(Event.target.value)}}
                value={tahunTerbit}
                required
              />
            </div>
            <button className="bg-sky-500 hover:bg-sky-700 px-16 py-3 ml-20 rounded-full mt-3 text-white">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UbahBuku;
