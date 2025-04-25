console.clear();

// ✅ Ambil ID dari URL path
let id = window.location.pathname.split('/').pop();
console.log("Product ID:", id);

// ✅ Tampilkan badge cart dari cookie jika ada
if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

// ✅ Fungsi untuk menampilkan detail produk
function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;
    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(ob.name));

    let h4 = document.createElement('h4');
    h4.appendChild(document.createTextNode(ob.brand));

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3Price = document.createElement('h3');
    h3Price.appendChild(document.createTextNode('Rs ' + ob.price));

    let h3Desc = document.createElement('h3');
    h3Desc.appendChild(document.createTextNode('Description'));

    let para = document.createElement('p');
    para.appendChild(document.createTextNode(ob.description));

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3Preview = document.createElement('h3');
    h3Preview.appendChild(document.createTextNode('Product Preview'));
    productPreviewDiv.appendChild(h3Preview);

    for (let i = 0; i < ob.photos.length; i++) {
        let previewImg = document.createElement('img');
        previewImg.id = 'previewImg';
        previewImg.src = ob.photos[i];
        previewImg.onclick = function () {
            imgTag.src = ob.photos[i];
            document.getElementById("imgDetails").src = this.src;
        };
        productPreviewDiv.appendChild(previewImg);
    }

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Add to Cart'));

    button.onclick = function () {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
        console.log(document.cookie);
    };

    buttonDiv.appendChild(button);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);

    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3Price);
    detailsDiv.appendChild(h3Desc);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
}

// ✅ Ambil data dari file product.json dan render berdasarkan ID
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let contentDetails = JSON.parse(this.responseText);
        let product = contentDetails.find(item => item.id === id);
        if (product) {
            dynamicContentDetails(product);
        } else {
            console.error("Produk dengan ID " + id + " tidak ditemukan.");
        }
    } else if (this.readyState === 4) {
        console.error("Gagal memuat product.json. Status:", this.status);
    }
};

httpRequest.open('GET', 'https://tvserve.pages.dev/product', true);
httpRequest.send();
