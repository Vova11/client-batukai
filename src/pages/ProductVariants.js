import React from 'react'

const ProductVariants = () => {
  return (
    <div>ProductVariants</div>
  )
}

export default ProductVariants;



// import React, { useState } from "react";
// import styled from "styled-components";

// const ProductVariants = ({ variants }) => {
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [buy, setBuy] = useState([]);

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//   };

//   const handleSizeCheckboxChange = (event, size) => {
//     const isChecked = event.target.checked;
//     setSelectedSizes((prevSelectedSizes) =>
//       isChecked
//         ? [...prevSelectedSizes, size]
//         : prevSelectedSizes.filter((s) => s !== size)
//     );

//     // Add or remove selected variant to/from buy state
//     const selectedVariant = variants.find(
//       (variant) =>
//         variant.colour === selectedColor && variant.size === size
//     );

//     if (isChecked && selectedVariant) {
//       setBuy((prevBuy) => [...prevBuy, selectedVariant]);
//     } else {
//       setBuy((prevBuy) =>
//         prevBuy.filter(
//           (variant) => variant.colour !== selectedColor || variant.size !== size
//         )
//       );
//     }
//   };

//   const uniqueColors = Array.from(new Set(variants.map(({ colour }) => colour)));

//   const filteredVariants = selectedColor
//     ? variants.filter((variant) => variant.colour === selectedColor)
//     : variants;

//   const addQuantity = (event, size) => {
//     console.log(event);
//     console.log(size);
//   }
//   return (
//     <Wrapper selectedColor={selectedColor}>
//       {/* <div className="color-options">
//         {uniqueColors.map((color, index) => (
//           <button
//             key={index}
//             className={`color-option ${
//               selectedColor === color ? "selected" : ""
//             }`}
//             style={{ backgroundColor: color }}
//             data-color={color}
//             onClick={() => handleColorSelect(color)}
//           >
//             {selectedColor === color && "✓"}
//           </button>
//         ))}
//       </div> */}

// <div className="color-options">
//         <button
//           className={`color-option default ${selectedColor === "" ? "selected" : ""}`}
//           onClick={() => handleColorSelect("")}
//         >
//           All
//         </button>
//         {uniqueColors.map((color, index) => (
//           <button
//             key={index}
//             className={`color-option ${
//               selectedColor === color ? "selected" : ""
//             }`}
//             style={{ backgroundColor: color }}
//             data-color={color}
//             onClick={() => handleColorSelect(color)}
//           >
//             {selectedColor === color && "✓"}
//           </button>
//         ))}
//       </div>

//       <div>
//         <h4>Select Sizes</h4>
//         <SizeList>
//           {Array.from(new Set(filteredVariants.map(({ size }) => size))).map(
//             (size, index) => (
//               <li key={index}>
//                 <input
//                   type="checkbox"
//                   value={size}
//                   checked={selectedSizes.includes(size)}
//                   onChange={(e) => handleSizeCheckboxChange(e, size)}
//                 />
//                 {size}
//               </li>
//             )
//           )}
//         </SizeList>
//       </div>

//       {/* <div>
//         {filteredVariants
//           .filter((variant) =>
//             selectedSizes.length === 0
//               ? true
//               : selectedSizes.includes(variant.size)
//           )
//           .map(({ colour, size, stock }, index) => (
//             <div key={index}>
//               <h2>Color: {colour}</h2>
//               <h2>Size: {size}</h2>
//               <h2>Stock: {stock}</h2>
//               <hr />
//             </div>
//           ))}
//       </div> */}

//       <div>
//         <h4>Buy</h4>
//         <hr />
//         {buy.map(({ colour, size, stock }, index) => (
//           <div key={index}>
//             <p>Color: {colour}</p>
//             <p>Size: {size}</p>
//             <p>Stock: {stock}</p>
//             <button onClick={() => handleSizeCheckboxChange({target: {checked: false}}, size)}>
//               Remove
//             </button>
//             <button onClick={() => addQuantity({colour, size, stock})}>
//               quantity
//             </button>
//             <hr />
//           </div>
//         ))}
//       </div>
//     </Wrapper>
//   );
// };

// export default ProductVariants;

// const Wrapper = styled.section`
//   .color-options {
//     display: flex;
//     gap: 10px;
//   }

//   .color-option {
//     width: 50px;
//     height: 50px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 50%;
//     border: none;
//     font-size: 16px;
//     box-shadow: ${(props) =>
//       props.selectedColor === props.color
//         ? "0 4px 8px rgba(0, 0, 0, 0.3)"
//         : "0 2px 4px rgba(0, 0, 0, 0.2)"};
//   }

//   .color-option[data-color] {
//     background-color: ${(props) => props.color || "transparent"};
//     color: #fff;
//   }

//   .color-option:not([data-color]) {
//     border: 1px solid #ccc;
//   }
// `;

// const SizeList = styled.ul`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   list-style: none;
//   padding: 0;

//   li {
//     padding: 5px 10px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//   }
// `;
