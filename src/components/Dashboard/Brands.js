import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBrands, clearImages } from '../../features/brand/brandSlice'
import Spinner from './Spinner'
import Table from 'react-bootstrap/Table'
import BrandPage from './BrandsPage'
const Brands = () => {
  const dispatch = useDispatch()
  const { isLoading, brands, count } = useSelector((store) => store.brand)
  
  const fetchData = async () => {
    try {
      dispatch(fetchBrands())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    dispatch(clearImages())
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h5>
        {count} brand{brands.length > 1 && 's'} found
      </h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => {
            return <BrandPage key={brand.id} {...brand} />
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Brands
