const privateKey = "8ae0f4e58ecc48851638b312f79d8102fd90e110",
    publicKey = "d62fb212b50681a46c2e4350922ef15d",
    content = document.getElementById('content');
    search = document.getElementById('search');
const getConnection = () => {
    const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey),
        url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    //es una promesa
    fetch(url)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
            });

        })
        .catch(
            e => console.log(e)
            );
};

const drawHero = e => {
    //crear elementos
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
        <div class=" hero ed-item l-1-3">
        <h3>${e.name}</h3>
        <div class="hero-img">
            <img class="thumbnail" src="${image}">
            <p class="description">${e.description}</p>
        </div>
            
        </div>`;
    content.insertAdjacentHTML('beforeEnd', hero);
};
const searchHero = name =>{
    const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey),
        hero = encodeURIComponent(name),
        url = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        fetch(url)
        .then(response => response.json())
        .then(response =>{
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e => console.log(e));
};
//agregamos un licener
search.addEventListener('keyup', e =>{
    if(e.keyCode === 13){
        content.innerHTML = '';
        searchHero(e.target.value.trim());
    }
});
getConnection();