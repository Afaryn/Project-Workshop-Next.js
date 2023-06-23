import Layout from "@/widget/Layout";
import Link from "next/link";
import IkonUbah from "@/assets/IkonUbah";
import IkonHapus from "@/assets/IkonHapus";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection,getDocs,doc,deleteDoc } from "firebase/firestore";
import Judul from "@/component/judul";


export default function home() {
  const [buku, setBuku] = useState([]);

  const router= useRouter();

  const addBookHandler = ()=> {
    router.push("/tambah-buku");
  }
  const changeBookHandler = (id)=> {
    router.push('/ubah-buku/${id}');
  };

  const bukuCollectionRef = collection (db, "buku");
  const getBukuList = async() => {
    try {
      const data = await getDocs (bukuCollectionRef);
      const filteredData = data.docs.map
      ((doc)=> ({
        ... doc.data(),
        id: doc.id,
      }))
      setBuku(filteredData)
      console.log(data);
      console.log(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getBukuList();

  },[]);

  const deleteBuku = async (id) => {
    const bukuDoc= doc (db,"buku",id);
    await deleteDoc(bukuDoc);
    getBukuList()
  }
  return (
    <Layout>
      {/* ============ CONTENT ============ */}
      <div className="flex justify-center mx-3">
        <div>
          {/* JUDUL */}
          <Judul title="Data Buku Perpustakaan"/>
          <button onClick={addBookHandler}
          className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-700">
            Tambah Buku
          </button>
          {/* TABLE */}
          <div className="my-5">
            <table className="bg-sky-50 py-10 rounded-xl table-auto ">
              <thead className="mx-3 border-b-4 ">
                <tr className="hover:bg-sky-200">
                  <th className=" px-6 py-3">Nama Buku</th>
                  <th className=" px-6 py-3">Penulis</th>
                  <th className=" px-6 py-3">Deskripsi Buku</th>
                  <th className=" px-6 py-3">Tahun terbit</th>
                  <th className=" px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {buku.map((data)=>(
                <tr className="hover:bg-sky-200" key={data.id}>
                  <td className=" px-6 py-3">{data.nama_buku}</td>
                  <td className=" px-6 py-3">{data.penulis}</td>
                  <td className=" px-6 py-3">{data.deskripsi_buku}</td>
                  <td className=" px-6 py-3">{data.tahun_terbit}</td>
                  <td className="flex px-6 py-3">
                    <span onClick={()=>{changeBookHandler()}}
                    className="cursor-pointer h-8 w-8 mr-2 hover:text-sky-500">
                      <IkonUbah />
                    </span>
                    <span className="cursor-pointer h-8 w-8 mr-2 hover:text-red-500" onClick={()=>{deleteBuku(data.id);}}>
                      <IkonHapus />
                    </span>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
