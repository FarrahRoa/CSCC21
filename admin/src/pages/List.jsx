import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { TbTrash } from "react-icons/tb"

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      // console.log(response.data)

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      // Log when the delete request starts
      console.log("Attempting to remove product with ID:", id)
  
      // Make the delete request
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } })
  
      // Log the response from the delete request
      console.log("Remove response:", response)
  
      // If successful, re-fetch the list
      if (response.data.success) {
        console.log("Product removed successfully, updating list...")
        await fetchList() // Ensure fetchList() is called after a successful delete
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      // Log any errors encountered during the delete process
      console.log("Error while removing product:", error)
      toast.error(error.message)
    }
  }
  

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='pl-8'>
      <h3 className='h3'>All Products List</h3>
      <div className='flex flex-col gap-2 pt-4'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-secondary bg-white bold-14 sm:bold-16 rounded'>
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Remove</h5>
        </div>

        {/* Product List */}

        {list.map((item) => (
          <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-l'>
            <img src={item.image[0]} alt="" className='w-12 rounded-lg' />
            <h5 className='text-sm font-semibold'>{item.name}</h5>
            <p className='text-sm font-semibold'>{item.category}</p>
            <div className='text-sm font-semibold'>{currency}{item.price}</div>
            <div className=''><TbTrash onClick={()=> removeProduct(item._id)} className=' text-right md:text-center cursor-pointer text-lg' /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List