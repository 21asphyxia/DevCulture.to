// Only run when on the login and sign up page
if(document.getElementById('loginRegisterSubmit') != null){
    function validateEmail(){
        let email = document.getElementById('email');
        let emailError = document.getElementById('emailError');
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(emailRegex.test(email.value)){
            email.style.border = "2px solid green";
            document.getElementById('loginRegisterSubmit').disabled = false;
            emailError.classList.add('d-none');
            return true;
        }else{
            email.style.border = "2px solid red";
            document.getElementById('loginRegisterSubmit').disabled = true;
            emailError.classList.remove('d-none');
            return false;
        }
    }

    function validateName(){
        let name = document.getElementById('fullName');    
        let nameError = document.getElementById('nameError');
        if(name.value.length > 0){
            name.style.border = "2px solid green";
            document.getElementById('loginRegisterSubmit').disabled = false;
            nameError.classList.add('d-none');
            return true;
        }else{
            name.style.border = "2px solid red";
            document.getElementById('loginRegisterSubmit').disabled = true;
            nameError.classList.remove('d-none');
            return false;
        }
    }

    function validatePassword(){
        let password = document.getElementById('password');
        let passwordError = document.getElementById('passwordError');
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if(passwordRegex.test(password.value)){
            password.style.border = "2px solid green";
            document.getElementById('loginRegisterSubmit').disabled = false;
            passwordError.classList.add('d-none');
            return true;
        }else{
            password.style.border = "2px solid red";
            document.getElementById('loginRegisterSubmit').disabled = true;
            passwordError.classList.remove('d-none');
            return false;
        }
    }

    function validateConfirmPassword(){
        let confirmPassword = document.getElementById('confirmPassword');
        let confirmPasswordError = document.getElementById('confirmPasswordError');
        if(confirmPassword.value == document.getElementById('password').value && confirmPassword.value.length > 0){
            confirmPassword.style.border = "2px solid green";
            document.getElementById('loginRegisterSubmit').disabled = false;
            confirmPasswordError.classList.add('d-none');
            return true;
        }else{
            confirmPassword.style.border = "2px solid red";
            document.getElementById('loginRegisterSubmit').disabled = true;
            confirmPasswordError.classList.remove('d-none');
            return false;
        }
    }

    function validateRegister(){
        document.querySelector('#fullName').addEventListener('input', validateName);
        document.querySelector('#email').addEventListener('input', validateEmail);
        document.querySelector('#password').addEventListener('input', validatePassword);
        document.querySelector('#confirmPassword').addEventListener('input', function(){
            document.getElementById('loginRegisterSubmit').disabled = false;
        });

        if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword()){
            document.getElementById('loginRegisterSubmit').disabled = false;
        }else{
            document.getElementById('loginRegisterSubmit').disabled = true;
        }
    }

    function validateLogin(){
        document.querySelector('#email').addEventListener('input', validateEmail);
        document.querySelector('#password').addEventListener('input', validatePassword);
        if (validateEmail() && validatePassword()){
            document.getElementById('loginRegisterSubmit').disabled = false;
        }else{
            document.getElementById('loginRegisterSubmit').disabled = true;
        }
    }
}

function createAlert(alertType, alertMessage){
    if(document.querySelector('.alert') != null){
        document.querySelector('.alert').remove();
    }
    let alert = document.createElement('div');
    alert.classList.add('alert', 'alert-' + alertType, 'alert-dismissible', 'fade', 'show','mb-4');
    let alertMsg = document.createElement('strong');
    alertMsg.classList.add('text-black');
    alertMsg.innerText = alertType.charAt(0).toUpperCase() + alertType.slice(1);
    alert.appendChild(alertMsg);
    alert.innerHTML += " " + alertMessage;
    let button = document.createElement('button');
    button.classList.add('btn-close','btn-close-dark');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-dismiss', 'alert');
    alert.appendChild(button);
    document.querySelector("main").insertBefore(alert, document.querySelector("main").firstChild);
}

// Only run when on the categories page
if(document.getElementById('categories') != null){
    
    // Enable save and update button when all inputs are filled
    let enableADD = () => {
        if (document.getElementById("categoryName").value != "") {
            document.getElementById("save-button").disabled = false;
            document.getElementById("update-button").disabled=false;
        } else {
            document.getElementById("save-button").disabled=true;
            document.getElementById("update-button").disabled=true;
        }
    }

    document.querySelector("#form").addEventListener("input", enableADD);

    function createCategory() {
        // initialiser task form
        initTaskForm();
        document.getElementById("modalTitle").innerHTML = "Add Category";
        // Afficher le boutton save
        document.getElementById("save-button").classList.remove("d-none");
        document.getElementById("cancel-button").classList.remove("d-none");
        document.getElementById("save-button").addEventListener("click", saveCategory);
        // Ouvrir modal form
        $(document).ready(function() {
            $('#form').modal('show');
        });
    }

    document.querySelector('#addButton').addEventListener('click', createCategory);

    function initTaskForm() {
        // Clear task form from data
        form.reset();
        document.getElementById("categoryName").value = "";
        
        // Hide all action buttons
    
        document.getElementById("save-button").classList.add("d-none");
        document.getElementById("cancel-button").classList.add("d-none");
        document.getElementById("update-button").classList.add("d-none");
    
        enableADD();
    }

    function saveCategory() {
        $.ajax({
            url: '/DevCulture.to/controllers/CategoriesController.php',
            type: 'POST',
            data: {
                type: "create",
                categoryName: document.getElementById("categoryName").value,
            },
            success: function(result) {
                if(result){
                    let res = JSON.parse(result);
                    if(res.error){
                        let errorMsg = document.createElement('div');
                        errorMsg.classList.add('text-danger','categoryNameError');
                        errorMsg.innerHTML = res.error.categoryName;
                        if(document.querySelector('.categoryNameError') == null){
                            document.querySelector('#categoryName').style.border = "2px solid red";
                            document.querySelector('#categoryName').after(errorMsg);
                        }
                    }
                }
                else{
                    readCategories();

                    $(document).ready(function() {
                        $('#form').modal('hide');
                    });
                    createAlert('success', 'Category has been added successfully.');
                }
            },
            fail: function(result) {
                createAlert('danger', 'Category has not been added.');
            }
        });
    } 

    function readCategories() {
        $.ajax({
            // read all categories
            url: '/DevCulture.to/controllers/CategoriesController.php',
            type: 'POST',
            data: {
                type: "read",
            },
            success: function(result) {
                let categories = JSON.parse(result);
                let categoriesList = document.querySelector("tbody");
                categoriesList.innerHTML = "";
                categories.forEach(category => {
                    categoriesList.innerHTML += `
                        <tr>
                            <td class="fs-7 text-start align-middle">${category.id}</td>
                            <td class=" fs-7 text-cnter align-middle"></td>
                            <td class="fs-7 text-center align-middle">${category.name}</td>
                            <td class="actionsIcons d-flex justify-content-end align-items-center">
                                <button onclick="editCategory(${category.id})"><i class="bi fs-6 text-primary bi-pencil-square" ></i></button>
                                <button class="ms-3" onclick="deleteCategory(${category.id})"><i class="bi bi-trash fs-6 text-danger"></i></button>
                            </td>
                        </tr>
                    `;
                });
            },
            fail: function(result) {
                console.log(result);
            }
        });
    }

    function editCategory(id) {
        // initialiser task form
        initTaskForm();
        document.getElementById("modalTitle").innerHTML = "Edit Category";
        
        document.getElementById("update-button").classList.remove("d-none");
        document.getElementById("update-button").addEventListener("click", updateCategory);
        document.getElementById("cancel-button").classList.remove("d-none");
        // Ouvrir modal form
        $(document).ready(function() {
            $('#form').modal('show');
        });
        $.ajax({
            // read all categories
            url: '/DevCulture.to/controllers/CategoriesController.php',
            type: 'POST',
            data: {
                type: "readSingle",
                id: id,
            },
            success: function(result) {
                let category = JSON.parse(result);
                document.getElementById("categoryId").value = category.id;
                document.getElementById("categoryName").value = category.name;
            },
            fail: function(result) {
                console.log(result);
            }
        });
    }

    function updateCategory() {
        $.ajax({
            url: '/DevCulture.to/controllers/CategoriesController.php',
            type: 'POST',
            data: {
                type: "update",
                id: document.getElementById("categoryId").value,
                categoryName: document.getElementById("categoryName").value,
            },
            success: function(result) {
                readCategories();

                $(document).ready(function() {
                    $('#form').modal('hide');
                });
                createAlert('success', 'Category has been updated successfully.');
            },
            fail: function(result) {
                console.log(result);
                $(document).ready(function() {
                    $('#form').modal('hide');
                });
                createAlert('danger', 'Category has not been updated successfully.');
            }
        });
    }

    function deleteCategory(id) {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'The category has been deleted.',
                    'success'
                )
                $.ajax({
                    url: '/DevCulture.to/controllers/CategoriesController.php',
                    type: 'POST',
                    data: {
                        type: "delete",
                        id: id,
                    },
                    success: function(result) {
                        readCategories();
                    }
                });
                
            }
        });
    }
    readCategories();
}

if(document.getElementById('articles') != null){
    
    // Enable save and update button when all inputs are filled
    let enableADD = () => {
        let titles = [...document.querySelectorAll('#articleTitle')];
        let contents = [...document.querySelectorAll('#articleDescription')];
        let categories = [...document.querySelectorAll('#articleCategory')];
        
        if (titles.some(title => title.value == "") || contents.some(content => content.value == "") || categories.some(category => category.value == "")) {
            document.getElementById("save-button").disabled=true;
            document.getElementById("update-button").disabled=true;
        } else {
            document.getElementById("save-button").disabled = false;
            document.getElementById("update-button").disabled=false;
        }
    }

    function duplicator(num) {
        if(num < document.querySelectorAll('.modal-body').length) {
            let diff = document.querySelectorAll('.modal-body').length - num;
            for (let i = 0; i < diff; i++) {
                document.querySelectorAll('.modal-body')[document.querySelectorAll('.modal-body').length - 1].remove();
                document.querySelectorAll('hr')[document.querySelectorAll('hr').length - 1].remove();
            }
            return;
        }
        let diff = num - document.querySelectorAll('.modal-body').length;
        for (let i = 0; i < diff; i++) {
            let hr = document.createElement('hr');
            let clone = document.querySelector('.modal-body').cloneNode(true);
            clone.querySelector('#articleTitle').value = "";
            clone.querySelector('textarea').value = "";
            // add hr tag before the clone
            document.querySelectorAll('.modal-body')[document.querySelectorAll('.modal-body').length - 1].after(hr);
            // add clone after the hr tag
            hr.after(clone);
        }
        enableADD();
    }

    document.querySelector("#form").addEventListener("input", enableADD);

    function createArticle() {
        // initialiser task form
        initTaskForm();
        if(document.getElementById('duplicator') == null) {
            let dup = document.createElement('input');
            dup.setAttribute('type', 'number');
            dup.setAttribute('id', 'duplicator');
            dup.setAttribute('name', 'duplicator');
            dup.setAttribute('min', '1');
            dup.classList.add('form-control', 'mb-2', 'd-flex','align-self-center');
            dup.setAttribute('value', '1');
            document.querySelector('.modal-content').appendChild(dup);
            dup.addEventListener("change", function() {
                duplicator(this.value);
            });
        }
        else {
            document.getElementById('duplicator').value = 1;
            duplicator(1);
        }
        document.getElementById("modalTitle").innerHTML = "Add Article";
        // Afficher le boutton save
        document.getElementById("save-button").classList.remove("d-none");
        document.getElementById("cancel-button").classList.remove("d-none");
        document.getElementById("save-button").addEventListener("click", saveArticle);
        // Ouvrir modal form
        $(document).ready(function() {
            $('#form').modal('show');
        });
    }

    document.querySelector('#addButton').addEventListener('click', createArticle);

    function initTaskForm() {
        // Clear task form from data
        document.querySelector('#form').reset();
        document.querySelector('textarea').innerText = "";
        
        // Hide all action buttons
    
        document.getElementById("save-button").classList.add("d-none");
        document.getElementById("cancel-button").classList.add("d-none");
        document.getElementById("update-button").classList.add("d-none");
    
        enableADD();
    }

    function saveArticle() {
        let titles = document.querySelectorAll('#articleTitle');
        let contents = document.querySelectorAll('#articleDescription');
        let categories = document.querySelectorAll('#articleCategory');
        let articles = [];
        for (let i = 0; i < titles.length; i++) {
            articles.push({
                title: titles[i].value,
                description: contents[i].value,
                category: categories[i].value
            });
        }
        $.ajax({
            url: '/DevCulture.to/controllers/ArticlesController.php',
            type: 'POST',
            data: {
                type: "create",
                articles: articles
            },
            success: function(result) {
                console.log(result);
                if(result){
                    let res = JSON.parse(result);
                    if(res.error){
                        console.log(res.error);
                        for([errorNum, fullError] of Object.entries(res.error)){
                            console.log(fullError);
                            for([errorTitle, error] of Object.entries(fullError)){
                                console.log(errorTitle);
                                console.log(error);
                                let elements = document.querySelectorAll('#article'+errorTitle.charAt(0).toUpperCase() + errorTitle.slice(1));
                                console.log(elements);
                                console.log(errorNum);
                                console.log(elements[errorNum]);
                                if(elements[errorNum].nextElementSibling == null){
                                    elements[errorNum].style.border = "2px solid red";
                                    let errorMsg = document.createElement('div');
                                    errorMsg.classList.add('text-danger',errorTitle+'Error');
                                    errorMsg.innerHTML = error;
                                    elements[errorNum].after(errorMsg);
                                }
                            }
                        }
                    }
                    
                        // for([errorTitle, error] of Object.entries(res.error)){
                        //     let errorMsg = document.createElement('div');
                        //     errorMsg.classList.add('text-danger',errorTitle+'Error');
                        //     errorMsg.innerHTML = error;
                        //     let elements = document.querySelectorAll('#'+errorTitle);
                        //     if(elements.length > 0){
                        //         for (let i = 0; i < elements.length; i++) {
                        //             elements[i].style.border = "2px solid red";
                        //             elements[i].after(errorMsg);
                        //         }
                        //     }
                        // }
                    else{
                        readArticles();

                        $(document).ready(function() {
                            $('#form').modal('hide');
                        });
                        createAlert('success', 'Article has been added successfully.');
                    }
                }
            },
            fail: function(result) {
                createAlert('danger', 'Article has not been added.');
            }
        });
    } 

    function readArticles() {
        function categoriesSelect() {
            $.ajax({
                // read all categories
                url: '/DevCulture.to/controllers/CategoriesController.php',
                type: 'POST',
                data: {
                    type: "read",
                },
                success: function(result) {
                    let categories = JSON.parse(result);
                    let categoriesOptions = document.querySelector("#articleCategory");
                    categoriesOptions.innerHTML = '<option disabled selected hidden value="">Select Category</option>';
                    categories.forEach(category => {
                        categoriesOptions.innerHTML += `
                            <option value="${category.id}">${category.name}</option>
                        `;
                    });
                },
                fail: function(result) {
                    console.log(result);
                }
            });
        }

        $.ajax({
            // read all articles
            url: '/DevCulture.to/controllers/ArticlesController.php',
            type: 'POST',
            data: {
                type: "read",
            },
            success: function(result) {
                let articles = JSON.parse(result);
                let articlesList = document.querySelector("tbody");
                articlesList.innerHTML = "";
                categoriesSelect();
                articles.forEach(article => {
                    articlesList.innerHTML += `
                        <tr>
                            <td class="fs-7 text-start align-middle">${article.id}</td>
                            <td class=" fs-7 text-cnter align-middle"></td>
                            <td class="fs-7 text-center align-middle">${article.title}</td>
                            <td class="fs-7 text-center align-middle">${article.description}</td>
                            <td class="fs-7 text-center align-middle">${article.category}</td>
                            <td class="fs-7 text-center align-middle">${article.author}</td>
                            <td class="actionsIcons d-flex justify-content-end align-items-center">
                                <button onclick="editArticle(${article.id})"><i class="bi fs-6 text-primary bi-pencil-square" ></i></button>
                                <button class="ms-3" onclick="deleteArticle(${article.id})"><i class="bi bi-trash fs-6 text-danger"></i></button>
                            </td>
                        </tr>
                    `;
                });
            },
            fail: function(result) {
                console.log(result);
            }
        });
    }

    function editArticle(id) {
        // initialiser task form
        initTaskForm();
        if (document.querySelector("#duplicator") != null) {
            duplicator(1);
            document.querySelector("#duplicator").remove();
        }
        document.getElementById("modalTitle").innerHTML = "Edit Article";
        
        document.getElementById("update-button").classList.remove("d-none");
        document.getElementById("update-button").addEventListener("click", updateArticle);
        document.getElementById("cancel-button").classList.remove("d-none");
        // Ouvrir modal form
        $(document).ready(function() {
            $('#form').modal('show');
        });
        $.ajax({
            // read all categories
            url: '/DevCulture.to/controllers/ArticlesController.php',
            type: 'POST',
            data: {
                type: "readSingle",
                id: id,
            },
            success: function(result) {
                let article = JSON.parse(result);
                document.getElementById("articleId").value = article.id;
                document.getElementById("articleTitle").value = article.title;
                document.getElementById("articleDescription").innerText = article.description;
                document.getElementById("articleCategory").value = article.category;
            },
            fail: function(result) {
                console.log(result);
            }
        });
    }

    function updateArticle() {
        $.ajax({
            url: '/DevCulture.to/controllers/ArticlesController.php',
            type: 'POST',
            data: {
                type: "update",
                id: document.getElementById("articleId").value,
                title: document.getElementById("articleTitle").value,
                category: document.getElementById("articleCategory").value,
                description: document.getElementById("articleDescription").value
            },
            success: function(result) {
                if(result){
                    let res = JSON.parse(result);
                    if(res.error){
                        for([errorTitle, error] of Object.entries(res.error)){
                            let errorMsg = document.createElement('div');
                            errorMsg.classList.add('text-danger',errorTitle+'Error');
                            errorMsg.innerHTML = error;
                            if(document.querySelector('.'+errorTitle+'Error') == null){
                                document.querySelector('#'+errorTitle).style.border = "2px solid red";
                                document.querySelector('#'+errorTitle).after(errorMsg);
                            }
                        }
                    }
                    else{
                        readArticles();
    
                        $(document).ready(function() {
                            $('#form').modal('hide');
                        });
                        createAlert('success', 'Article has been updated successfully.');
                    }
                }
            },
            fail: function(result) {
                console.log(result);
                createAlert('danger', 'Article has not been updated.');
            }
        });
    }

    function deleteArticle(id) {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your Article has been deleted.',
                    'success'
                )
                $.ajax({
                    url: '/DevCulture.to/controllers/ArticlesController.php',
                    type: 'POST',
                    data: {
                        type: "delete",
                        id: id,
                    },
                    success: function(result) {
                        readArticles();
                    }
                });
                
            }
        });
    }
    readArticles();
}
