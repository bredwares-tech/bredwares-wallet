

// interface ProductTableProps {
//   products: Product[];
//   onViewProduct?: (customer_name: string) => void; // Optional prop
// }

// export const ProductTable: React.FC<ProductTableProps> = ({  products, onViewProduct }) => {
//   // const [products, setProducts] = useState<Product[]>([]);
//   console.log(products,'products_____________123')

//   const [loading, setLoading] = useState(false);
 
 
//   return (
//     <table className="w-full mt-4 border-collapse">
//       <thead className='text-white font-bold' style={{ backgroundColor: "#202c34" }}>
//         <tr>
//           <th className="px-4 py-2">Name</th>
//           <th className="px-4 py-2">Email</th>
//           {/* <th className="px-4 py-2">View</th> */}
//           {/* <th className="px-4 py-2">customer_email</th> */}
//           {/* <th className="px-4 py-2">Total Amount</th> */}
//           <th className="px-4 py-2"> Amount</th>
//            <th className="px-4 py-2">Status</th>
//            <th className="px-4 py-2">Date</th>

//         </tr>
//       </thead>
//       <tbody>
//         {products?.map((data) => (
//           <tr key={data.id}>
//             <td className="border text-center border-gray-300 px-4 py-2">{data.full_name}</td>
//             <td className="border text-center border-gray-300 px-4 py-2">{data.email}</td>
          
//             {/* <td className="border border-gray-300 px-4 py-2">{data.customer_email}</td> */}
//             {/* <td className="border border-gray-300 px-4 py-2">{data.totalAmount}</td> */}
//             <td className="border text-center border-gray-300 px-4 py-2">{data.amount}</td>
//              <td className="border text-center border-gray-300 px-4 py-2">{data.status}</td>
//              <td className="border text-center border-gray-300 px-4 py-2">{data.payment_date}</td>

//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };



import { useState } from "react";
import { Product } from "../components/types";

interface ProductTableProps {
  products: Product[];
  onViewProduct?: (customer_name: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onViewProduct,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse mb-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
          <p className="text-gray-600">No payment records found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full bg-white">
        <thead>
          <tr
            className="text-white font-semibold"
            style={{ backgroundColor: "#202c34" }}
          >
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-right">Amount</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((data) => (
            <tr key={data.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">
                  {data.full_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {data.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-gray-900 font-medium">
                  ${Number(data.amount).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${
                    data.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : data.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {new Date(data.payment_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
