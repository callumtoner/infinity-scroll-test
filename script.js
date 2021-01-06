//here we are making consts and grabbing the html elements we want by their IDs! 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

photosArray = []; 
let ready = false; 
let imagesLoaded = 0;
let totalImages = 0; 


// Unsplash API
const count = 10;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'Lzi1uxDizxi0ACym3Ms-VumYLE14iIzmG_zvVIR4FvQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//checks if images were loaded 
function imageLoaded() {
    imagesLoaded++; 
    if (imagesLoaded === totalImages) {
        ready = true; 
        loader.hidden = true; 
    }
}


//the helper function to manipulate the DOM elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]); 
    }
}





//display photos function that runs after the fetching, yet has to be written before getphotos as its called in there 
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length; 
    //this keeps the loader working right so the number always reaches 10 and not beyond on subsequent loads of 10 etc 
    photosArray.forEach((photo) => {
        //now we are looking at displaying a single photo in an <a> tag like html!
        const item = document.createElement('a'); 
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank',
        });
        //we just made the a tag, now we make the img for the photo being loaded in! make sense? so we're making these html tags in JS in realtime
        const img = document.createElement('img'); 
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description, 
            title: photo.alt_description,
        });
        //event listener checks when each photo is finished loading
        img.addEventListener('load', imageLoaded); 
        //now the img tag goes into the a tag then both go into the imageContainer Element, check the html to see the setup
        item.appendChild(img);
        imageContainer.appendChild(item); 


    });
}//ends displayPhotos



// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

//scroller ability 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos(); 
    }
})


// On Load
getPhotos();