fetch ('https://zenquotes.io/api/random')
    .then(response => {
        console.log("response",response)
        return response.json();
    })

    .then(data => {
        const quote = data[0].q;
        console.log(`Quote:" ${quote}"`)
        const author = data[0].a;
        console.log(`Author:" ${author}"`)
        document.getElementById('quote-text').innerText = `"${quote}" - ${author}`;
    });

