// const singleblog = () =>{
//     fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}`)
//     const [blogs, setBlogs] = React.useState([])
// React.useEffect(()=>{
//     getblogs()
//     .then(data => 
//     setBlogs(data.data))
//     .catch(error => 
//             console.error(error));
// },[])
//     return(
//         <div>
//         {blogs.length>0 && blogs.map(blog=>(
//                <div>
//                 <h1>{blog.title}</h1>
//                 {/* <p>{blog.message}</p> */}
//                 <img src={blog.image}/>
//                 <a href="view-blog.html?id=${blog._id}">readmore</a>
                
             
              

//                 </div> 
//     ))}
//     </div>
//   )};
// const root = ReactDOM.createRoot(document.querySelector("#Inspire"));
// root.render(<App />);