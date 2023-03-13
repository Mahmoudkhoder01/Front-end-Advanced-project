// import React, { useState, useEffect } from "react";
// import { Button, Form } from "semantic-ui-react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Update() {
//   //   const [id, setId] = useState(null);
//   //   const [name, setName] = useState("");

//   //   useEffect(() => {
//   //     setId(localStorage.getItem("id"));
//   //     setName(localStorage.getItem("Name"));
//   //   }, []);

//   const [data, setData] = useState("");

//   return (
//     <div>
//       <Form>
//         {/* <Form.Field>
//           <label>id</label>
//           <input placeholder="id" onChange={(e) => setId(e.target.value)} />
//         </Form.Field>

//         <Form.Field>
//           <label>Name</label>
//           <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
//         </Form.Field> */}
//         <Link to="/update">
//         <Form.Field>
//           <label>Name</label>
//           <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
//         </Form.Field> 
//           <Form.Field>
//             <Button type="submit" onClick={() => setData(data)}>
//               Update
//             </Button>
//           </Form.Field>
//         </Link>
//       </Form>
//     </div>
//   );
// }
