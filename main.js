console.clear()

let contentTitle;
let pathnameParts = location.pathname.split('/');
let id = pathnameParts[pathnameParts.length - 1];

// Jika URL mengandung ID di path (misal: /content/1), tampilkan detail produk
if (!isNaN(id)) {
    fetch('https://tvserve.pages.dev/product.json')
        .then(response => response.json())
        .then(contentList => {
            let product = contentList.find(item => item.id === id);
            if (product) {
                dynamicContentDetails(product);
            } else {
                console.error("Product not found with id:", id);
            }
        });
} else {
    // Jika tidak ada ID, tampilkan semua produk
    fetch('https://tvserve.pages.dev/product.json')
        .then(response => response.json())
        .then(contentList => {
            contentTitle = contentList;

            let containerClothing = document.getElementById("containerClothing");
            let containerAccessories = document.getElementById("containerAccessories");

            for (let i = 0; i < contentTitle.length; i++) {
                let item = contentTitle[i];
                if (item.isAccessory) {
                    containerAccessories.appendChild(dynamicClothingSection(item));
                } else {
                    containerClothing.appendChild(dynamicClothingSection(item));
                }
            }
        });
}

// Fungsi tampilkan daftar
function dynamicClothingSection(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let boxLink = document.createElement("a");
    boxLink.href = "/content/" + ob.id;

    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(ob.name));

    let h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(ob.brand));

    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode("Rs " + ob.price));

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
}

// Fungsi tampilkan detail produk
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

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.appendChild(document.createTextNode('Rs ' + ob.price));

    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode('Description'));

    let para = document.createElement('p');
    para.appendChild(document.createTextNode(ob.description));

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.appendChild(document.createTextNode('Product Preview'));
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    for (let i = 0; i < ob.photos.length; i++) {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.id = 'previewImg';
        imgTagProductPreviewDiv.src = ob.photos[i];
        imgTagProductPreviewDiv.onclick = function () {
            document.getElementById("imgDetails").src = this.src;
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    }

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.appendChild(document.createTextNode('Add to Cart'));

    buttonTag.onclick = function () {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        console.log(document.cookie);
    }

    buttonDiv.appendChild(buttonTag);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
}
