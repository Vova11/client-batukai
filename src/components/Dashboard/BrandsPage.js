import React from 'react'
import { useNavigate } from 'react-router-dom'

const BrandsPage = (brand) => {
  const { id, name } = brand;
  console.log('ddd');
  const navigate = useNavigate();
  const goToBrand = () => {
    navigate(`/dashboard/brands/${id}`); // Ensure the company object is within the 'state'
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
      <button 
          className='btn'
          onClick={goToBrand}
          >
          Show
        </button>
      </td>
    </tr>
  )
}

export default BrandsPage
