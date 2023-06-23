import React, { useState } from "react";
import Layout from "@/widget/Layout";
import Link from "next/link";
import { db } from "@/config/firebase";
import { collection,addDoc } from "firebase/firestore";
import { Router, useRouter } from "next/router";
import Judul from "@/component/judul";

export const TambahBuku = () => {
  const [namaBuku,setNamaBuku]=useState("");
  const [Penulis,setPenulis]=useState("");
  const [DeskripsiBuku,setDeskripsiBuku]=useState("");
  const [tahunTerbit,setTahunTerbit]=useState("");
  const bukuCollectionRef = collection(db,"buku");
  const router = useRouter();
  const submitHandler =async (e)=>{
    e.preventDefault();
    try {
      await addDoc(bukuCollectionRef,{
        nama_buku:namaBuku,
        penulis:Penulis,
        deskripsi_buku:DeskripsiBuku,
        tahun_terbit:tahunTerbit,
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Layout>
      <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
          {/* judul */}
          <Judul title="Form Tambah Data Buku" />
          {/* FORM TAMBAH */}
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="text-md">Nama Buku</label>
              <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="Text"
              onChange={(e)=>{setNamaBuku(e.target.value);
              }}value={namaBuku}/>
            </div>
            <div className="mb-3">
              <label className="text-md">Penulis</label>
              <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="Text"
              onChange={(e)=>{setPenulis(e.target.value);
              }}value={Penulis}/>
            </div>
            <div className="mb-3">
              <label className="text-md">Deskripsi Buku</label>
              <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="Text"
              onChange={(e)=>{setDeskripsiBuku(e.target.value);
              }}value={DeskripsiBuku} />
            </div>
            <div className="mb-3">
              <label className="text-md">tahun Terbit</label>
              <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="Text"
              onChange={(e)=>{setTahunTerbit(e.target.value);
              }}value={tahunTerbit}/>
            </div>
            <button className="bg-sky-500 hover:bg-sky-700 px-16 py-3 ml-20 rounded-full mt-3 text-white">Simpan</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TambahBuku;
