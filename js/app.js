const cart = document.querySelector('#cart');
const containerCart = document.querySelector('#list-cart tbody');
const listCourses = document.querySelector('#list-courses');
const emptyCartBtn = document.querySelector('#empty-cart');
let articlesCart = [];

loadEventListeners();
function loadEventListeners () {
    //When you add a course clicking "Add to Cart"
    listCourses.addEventListener('click',addCourse);
    //Erase the articles
    cart.addEventListener('click',deleteCourse);
    //Empty the cart
    emptyCartBtn.addEventListener('click', emptyCart);
}

//Functions
function addCourse(e){
    e.preventDefault();
    if (e.target.classList.contains('add-cart')) {
        const courseSelected = e.target.parentElement.parentElement;
        readCourseInfo(courseSelected);
    }
}
function readCourseInfo(course) {
    //Creates an object with the actual course
    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }
    //Check if the element alreay exist and updates qty
    const exist = articlesCart.some(course => course.id === infoCourse.id);
    if (exist) {
        //Updates qty
        const courses = articlesCart.map(course => {
            if (course.id === infoCourse.id) {
                course.quantity++;
                return course; // updated obj
            } else {
                return course; // no duplicated obj
            }
        } );
        articlesCart = [...courses]
    } else {
        //Add the object course into an array for the cart
        articlesCart = [...articlesCart,infoCourse];        
    }

    htmlCart();
    console.log(articlesCart);
}
function htmlCart(){
    //Clean the cart first
    cleanHTML();
    //Displays the array with objects in the HTML
    articlesCart.forEach(course => {
        const row = document.createElement('tr');
        const {image,title,price,quantity,id} = course;
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>
            <td>
                ${title}
            </td>
            <td>
                ${price}
            </td>
            <td>
                ${quantity}
            </td>
            <td>
                <a href="#" class="delete-course" data-id="${id}">X</a>
            </td>
        `;
        containerCart.appendChild(row);
    } )
}
function cleanHTML(){
    //Erases all the courses from the tbody
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild)
    }
}
function deleteCourse(e){
    if (e.target.classList.contains('delete-course')) {
        const dataId = e.target.getAttribute('data-id');
        //Populate an array w/o the selected obj
        articlesCart = articlesCart.filter( course => course.id !== dataId);
        htmlCart(); //updates html
    }
}
function emptyCart() {
    //Reset array
    articlesCart = [];
    cleanHTML();
}