
fetch('https://backend-jdw6.onrender.com/greet/v1/blog')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(blogDataArray => {
        console.log(blogDataArray)

        const blogContainer = document.getElementById('Inspire');
        blogDataArray.data.forEach(object => {
            const blogElement = document.createElement('div');
            blogElement.innerHTML = `
                        <div class="blog">
                            <div class="Inspiration">
                                <div class="paragraph">
                                    
                                    <p>${object.message}</p>
                                    
                                </div>
                                
                                <div class="photo">
                                </div>
                            </div> 
                        </div>
                        
                    `;
            blogContainer.appendChild(blogElement);
        });

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  