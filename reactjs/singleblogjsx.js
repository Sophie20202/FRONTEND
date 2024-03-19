
const id = new URLSearchParams(window.location.search).get("id");
const Singleblog = () => {
    const [, setLikeDisabled] = React.useState(false);
    const [, setDislikeDisabled] = React.useState(false);
    const [selectedBlog, setSelectedBlog] = React.useState(null);
    const [likeCount, setLikeCount] = React.useState(null);
    const id = new URLSearchParams(window.location.search).get("id");
    const [comments, setComments] = React.useState([]);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const blogData = await response.json();
                setSelectedBlog(blogData.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        }

        const likeStorage = JSON.parse(localStorage.getItem("bloglike"));
        const dislike = document.getElementById("dislike-btn")

        dislike.setAttribute("disabled", "")
        if (likeStorage === id) {
            setLikeDisabled(true);
            setDislikeDisabled(false);
        }
        if (id) {
            fetchBlog();
            fetchLikes();
            fetchComments();
        }
    }, [id]);

    console.log(selectedBlog);
    const fetchLikes = async () => {
        const id = new URLSearchParams(window.location.search).get("id");
        try {
            const response = await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}/likes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setLikeCount(data.Total_like);
        } catch (error) {
            console.error("Error counting likes:", error);
        }
    };
    const createlikes = async () => {
        const dislike = document.getElementById("dislike-btn")
        const like = document.getElementById("like-btn")

        like.setAttribute("disabled", "");
        dislike.removeAttribute("disabled");
        localStorage.setItem("bloglike", JSON.stringify(id));
        await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                countLikes();
            })
            .catch((error) => {
                console.error("Error creating likes", error);
            });
    };
    const createDislikes = async () => {
        const dislike = document.getElementById("dislike-btn")
        const like = document.getElementById("like-btn")
        like.removeAttribute("disabled");
        dislike.setAttribute("disabled", "");
        localStorage.removeItem("bloglike", JSON.stringify(id));
        await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                countLikes();
            })
            .catch((error) => {
                console.error("Error creating dislikes", error);
            });
    };
    const countLikes = async () => {
        await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}/likes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                document.getElementById("like-count").innerText = data.Total_like;
            })
            .catch((error) => {
                console.error("Error counting likes:", error);
            });
    }

    const fetchComments = async () => {
        try {
            const response = await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}/comments`, {

            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setComments(data.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ message, blogId: id }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setMessage('');
            fetchComments()

            

        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };


    return (

        <div>
            {selectedBlog ? (
                <React.Fragment>
                    <h2>{selectedBlog.title}</h2>
                    <img src={selectedBlog.image} alt={selectedBlog.title} />
                    <p>{selectedBlog.articlecontent}</p>
                    <p dangerouslySetInnerHTML={{ __html: selectedBlog.message }}></p>
                </React.Fragment>
            ) : null}

            <div id="comments">
                <div >

                    <span id="like-count">{likeCount}</span>
                    <button id="like-btn" onClick={createlikes}>Liked</button>
                    <button id="dislike-btn" onClick={createDislikes}>unlike</button>
              </div>
              <div>
                <form id="comment-form" onSubmit={handleSubmit} >
                    <input type="text" id="comment" value={message}  onChange={handleChange}  placeholder="Comment" />
                    <button type="submit">Submit</button>
                    </form>
                    </div>
                <div id="message" className="display">
                    {/* <p id="message-text">No comments</p> */}
                </div>
            </div>
            <div>
                {comments.map(comment => (
                    <div key={comment.id} className="display">
                        <p>{comment.message}</p>
                    </div>
                ))}
            </div>
            

        </div>
    )
                };
ReactDOM.render(<Singleblog />, document.getElementById("singleblog"));

















