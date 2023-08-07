import React, { useState } from "react";
import styled from "styled-components";

const ProductVariants = ({ variants }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleClick = (size) => {
    setSelectedSize(size);
  };

  // Function to sort the sizes in ascending order
  const sortSizes = (a, b) => {
    const sizeA = parseInt(a);
    const sizeB = parseInt(b);
    return sizeA - sizeB;
  };

  // Sort the unique sizes in ascending order
 
 const uniqueSizes = Array.from(new Set(variants.map(({ size }) => size ))).sort(
  sortSizes
);

  return (
    <>
      
      {uniqueSizes.map((size, index) => (
          
        <StyledButton
          key={index}
          onClick={() => handleClick(size)}
          isSelected={selectedSize === size}
        >
          {`${size}`}
        </StyledButton>
      ))}
      
    </>
  );
};
export default ProductVariants;

const StyledButton = styled.button`
  background-color: ${(props) => (props.isSelected ? "var(--clr-primary-5)" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  border: ${(props) => (props.isSelected ? "1px solid var(--clr-primary-5)" : "1px solid #ccc")};
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;
