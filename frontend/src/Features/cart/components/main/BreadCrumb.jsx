import React ,{useState,useEffect} from "react";
import { CartStore } from '../State/CartContext';
//here i m using this component to show my products for only testing
const BreadCrumb = () => {
  const { dispatch } = CartStore();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5000/products"); // Adjust the path based on your project structure
        const jsonData = await response.json();
           console.log(jsonData.data);
          setData(jsonData.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
    fetchData();
  },[])
  return (
    // <section
    //   className="breadcrumb-area breadcrumb-bg"
    //   data-background="img/bg/breadcrumb_bg03.jpg"
    // >
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-12">
    //         <div className="breadcrumb-content">
    //           <h2>Cart Page </h2>
    //           <nav aria-label="breadcrumb">
    //             <ol className="breadcrumb">
    //               <li className="breadcrumb-product">
    //                 <a href="index.html">Home</a>
    //               </li>
    //               <li className="breadcrumb-product active" aria-current="page">
    //                 Cart
    //               </li>
    //             </ol>
    //           </nav>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section>
      <h4>Data from backend : </h4>
      {console.log(data)}
      <ul>
        {data.map((product) => (
          <React.Fragment key={product._id}>
            
              <li>{product.productName}</li>
              <li>{product.price}</li>
              <li>
                <img src={product.images[0]} alt="" width={85} height={85} />
              </li>
  
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", product: product, id: product._id })
              }
            >
              Add to Cart
            </button>
          </React.Fragment>
        ))}
      </ul>
    </section>
   );
};

export default BreadCrumb;
