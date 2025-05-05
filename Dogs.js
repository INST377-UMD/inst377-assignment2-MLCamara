// Dog Slides
async function dogImages() {
    const dogDiv = document.getElementById("dogDiv");

    const imagesLoad = Array.from({length:10}, () => fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        console.log("dataMessage:", data.message);
        return data.message;})    
        

    );

    try {
        const images = await Promise.all(imagesLoad);
        images.forEach(url => {
            const img = document.createElement("img");
            img.src= url;
            dogDiv.appendChild(img);
        });

        simpleslider.getSlider();
    }
    catch (error) {
        console.error("Error loading image:", error);
    }

}
dogImages();

// Dog Descriptions
async function dogDescriptions(){
    try{
        const response = await fetch("https://dogapi.dog/api/v2/breeds");
        const data = await response.json();
        console.log("Result",data);

        const breeds = data.data;

        const dogButtons = document.getElementById("dogButtons");
        const dogDescriptions = document.getElementById("dogDescription");

        dogButtons.innerHTML = "";
        dogDescriptions.innerHTML = "";

        const random = [];

        while (random.length < 10) {
            const randomDogs = Math.floor(Math.random() * breeds.length);
            const dogBreed = breeds[randomDogs];

            const noRepeat = random.some(dog => dog.id === dogBreed.id);
            if (!noRepeat) {
            random.push(dogBreed);
            }
            

        }
    
   
        random.forEach(breeds => {
            const button = document.createElement("button");
            button.textContent = breeds.attributes.name;
            button.classList.add("dogButtons");

            button.addEventListener("click",() => {
                const name = breeds.attributes.name;
                const description = breeds.attributes.description;
                const min = breeds.attributes.life.min;
                const max = breeds.attributes.life.max;

                dogDescriptions.innerHTML = `
                <h2> Name: ${name} <br> </h2>
                <p>
                <b> Description:  ${description} </b> <br>
                <b> Min Life: ${min} </b> <br>
                <b> Max Life: ${max} </b> <br>
                </p>
                `;
                dogDescriptions.style.display = "block";

            });
            dogButtons.appendChild(button);
        });

    } catch (error){
    console.log("error:",error);
    }

}

window.onload = (dogDescriptions);