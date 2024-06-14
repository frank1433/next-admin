import React from "react";
import Image from 'next/image'
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Link from "next/link";
import { fetchUsers } from "@/app/lib/data";
async function Userpage({searchParams}) {
  const q= searchParams?.q || ''
  const users = await fetchUsers(q)
  console.log(users)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for user" />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>(
             <tr key={user._id}>
             <td>
               <div className={styles.user}>
                 <Image  src={user.img || '/noavatar.png'} alt='use-pic' width={40} height={40} className={styles.userImage}/>
                 {user.username}
               </div>
             </td>
             <td>{user.email}</td>
             <td>{user.createdAt?.toString().slice(4,16)}</td>
             <td>{user.isAdmin ? 'Admin': 'Client'}</td>
             <td>{user.isActive? 'active': 'passive'}</td>
             <td>
               <div className={styles.buttons}>
               <Link href='/dashboard/users/${user.id}'>
                 <button className={`${styles.button} ${styles.view}`}>View</button>
               </Link>
               <button className={`${styles.button} ${styles.delete}`}>Delete</button>
               </div>
             </td>
           </tr>
          ))}
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
}

export default Userpage;
