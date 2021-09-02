
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data;
    searchField.value = '';

    if (searchText === '') {
        displayError();

    } else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs.slice(0, 15)));
    }


    const search = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(search)
        .then(res => res.json())
        .then(data => totalSearch(data.numFound));

}

// total search value
const totalSearch = total => {
    if (total === '0') {
        displayError();
    } else {
        const totalFind = document.getElementById('total');
        totalFind.innerText = `${total} results found `;
    }
    console.log(total);


}


//Display search result
const displaySearchResult = docs => {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    docs.forEach(docs => {
        console.log(docs);
        const cover_i = (docs.cover_i);
        const url = ` https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `      
        <div class="card" style="width: 18rem;">
        <img src="${url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${docs.text[2]}</h5>
        <p>Author Name: ${docs.author_name[0]}</p>
        <p>Publisher: ${docs.publisher}</p>
        <p>First Publish: ${docs.first_publish_year}</p>
         
        </div>
      </div>
        `
            ;
        searchResult.appendChild(div);
    })
}



//spinner
document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
}