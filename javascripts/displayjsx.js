
const App = () =>{
    const [blogs, setBlogs] = React.useState([])
React.useEffect(()=>{
    getblogs()
    .then(data => 
    setBlogs(data.data))
    .catch(error => 
            console.error(error));
},[])
    return(
        <div>
        {blogs.length>0 && blogs.map(blog=>(
               <div>
                <h1>{blog.title}</h1>
                <img src={blog.image}/>
                {/* <p dangerouslySetInnerHTML={{ __html: blog.message }}></p> */}
                
                <a href={`view-blog.html?id=${blog._id}`}>readmore</a>
                </div> 
    ))}
    </div>
  )};
const root = ReactDOM.createRoot(document.querySelector("#Inspire"));
root.render(<App />);

const getblogs=async()=>{
  const result= await fetch("https://backend-jdw6.onrender.com/api/blogs")
  if(result.ok){
    return await result.json()
  }else{
  return error}

}