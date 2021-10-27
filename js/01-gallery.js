import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const gallery = document.querySelector('.gallery');
renderImages();

gallery.addEventListener('click', onGalleryItemClick);

function renderImages() {
    const markup = galleryItems.map(({ preview, original, description }) => 
    `<div class="gallery__item">
        <a class="gallery__link" href=${original}>
        <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt="${description}"
        />
        </a>
    </div>`).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function onGalleryItemClick(event) {
    event.preventDefault();
    
    const isImageClicked = event.target.classList.contains('gallery__image'); 
    if (!isImageClicked) return;

    const origin = event.target.dataset.source;
    createModal(origin);
}

function createModal(value) {
    const instance = basicLightbox.create(`<div class="modal">
    <img class="modal-image" src="${value}">
</div>`, {
    onShow: (instance) => {
        instance.element().querySelector('img').onclick = instance.close;

        window.addEventListener('keydown', onEscButtonClick);
        
        function onEscButtonClick(event) {
    
            const visible = basicLightbox.visible();
            const isEscPress = event.code === 'Escape';
            
            if(isEscPress && visible) {
                // console.log('нажали на ESC');
                instance.close();
            }
        }

        window.removeEventListener('keyup', onEscButtonClick);
    }
})

instance.show();
}