
// import React from 'react';

// export default function FilterSidebar({ isOpen, onClose }) {
// const [price, setPrice] = React.useState(0);

// function onPriceChange(value) {
//   setPrice(value);
// }
//     return (
//         <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-60 text-secondaryColor transform ${
//             isOpen ? 'translate-x-0' : 'translate-x-full'
//         } transition-transform duration-300 ease-in-out`}
//         >
//         <div className="p-4">
//             <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Search Filter</h2>
            
//             <button
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-700"
//                 aria-label="close sidebar"
//             >
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                 />
//                 </svg>
//             </button>
//             </div>

//             {/* category filter*/}
//             <div className="flex flex-col gap-1 py-10">
//                 <h2>Categories:</h2>
                
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Women's Fashion</span>
//                 </label>
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Men's Fashion</span>
//                 </label>
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Electronics</span>
//                 </label>
                
//             </div>

//             {/* brands filter*/}
//             <div className="flex flex-col gap-1">
//                 <h2>brands:</h2>
                
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Canon</span>
//                 </label>
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Dell</span>
//                 </label>
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Defacto</span>
//                 </label>
//                 <label className="flex gap-2 items-center cursor-pointer">
//                     <input type="checkbox" className="hidden peer" />
//                     <span className="w-3 h-3 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-secondaryColor peer-checked:bg-secondaryColor">
//                         <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//                         </svg>
//                     </span>
//                     <span className="text-gray-700 select-none">Puma</span>
//                 </label>
//             </div>

//            {/* Price Range Slider */}
//             <div className="mt-8">
//             <h2 className="font-semibold text-base mb-2">Price Range (EGP)</h2>

//             {/* Display values */}
//             <div className="flex justify-between text-sm text-gray-600 mb-1">
//                 {/* <span>Min: {selectedFilters.price.min} EGP</span>
//                 <span>Max: {selectedFilters.price.max} EGP</span> */}
//             </div>

//             {/* Min price slider */}
//             <input
//                 type="range"
//                 min={0}
//                 // max={selectedFilters.price.max}
//                 // value={selectedFilters.price.min}
//                 onChange={(e) => onPriceChange('min', e.target.value)}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondaryColor"
//             />

//             {/* Max price slider */}
//             <input
//                 type="range"
//                 // min={selectedFilters.price.min}
//                 max={10000}
//                 // value={selectedFilters.price.max}
//                 onChange={(e) => onPriceChange('max', e.target.value)}
//                 className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondaryColor"
//             />
//             </div>
//         </div>
//         </div>

//     )
// }
