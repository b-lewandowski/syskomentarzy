function doJSON() {
    let form = document.getElementById("formKomentarz");
    let dataKomentarz = {};
    for (let i = 0; i < form.elements.length; i++) {
        let data = form.elements[i];
        if (data.type !== "button") {
            dataKomentarz[data.name] = data.value;
        }
    }

    fetch('http://127.0.0.1:5555/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataKomentarz)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data)
    zbierzKomentarze();
    })
    .then(error => console.log(error))
};

function zbierzKomentarze() {
  fetch('http://127.0.0.1:5555/get', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => {
  const komentarze = document.getElementById('komentarze');
  komentarze.innerHTML = '';

  data.forEach((item, index) => {
    const h = document.createElement('h1');
    const p = document.createElement('p');

    h.textContent = `${item.author}`;
    p.textContent = `${item.comment}`;
    komentarze.appendChild(h);
    komentarze.appendChild(p);
  });
})
.catch(error => {
  console.error(error);
});
}

zbierzKomentarze();
