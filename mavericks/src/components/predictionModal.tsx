// import { useEffect } from "react";

// export default function predictionModal({ isOpen, onClose, onSelectModel }) {
//   // Close modal when pressing ESC
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   if (!isOpen) return null;

//   const models = [
//     {
//       name: "Logistic Regression",
//       description: "Great for classification tasks — predicts if an exoplanet is likely a planet or not.",
//     },
//     {
//       name: "K-Nearest Neighbor",
//       description: "Compares input with similar past data to classify exoplanets.",
//     },
//     {
//       name: "Linear Regression",
//       description: "Predicts continuous outcomes, such as estimating planetary size or brightness.",
//     },
//   ];

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
//       <div className="bg-[#101022] text-white rounded-lg shadow-lg w-96 p-6 relative">
//         <h2 className="text-xl font-bold mb-4 text-center">Choose a Model</h2>
//         <p className="text-sm text-gray-300 mb-6 text-center">
//           Select one of the models below to run your prediction:
//         </p>

//         <div className="space-y-4">
//           {models.map((model, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 onSelectModel(model.name);
//                 onClose(); // closes automatically
//               }}
//               className="w-full text-left bg-[#0a0a18] hover:bg-[#1a1a2e] p-4 rounded-md transition"
//             >
//               <h3 className="font-semibold">{model.name}</h3>
//               <p className="text-xs text-gray-400 mt-1">{model.description}</p>
//             </button>
//           ))}
//         </div>

//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-white"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// }
