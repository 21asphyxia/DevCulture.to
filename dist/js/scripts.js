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
        console.log("1");
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
        document.getElementById("delete-button").classList.add("d-none");
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
                console.log(result);
                readCategories();

                $(document).ready(function() {
                    $('#form').modal('hide');
                });
                createAlert('success', 'Category has been added successfully.');
            },
            fail: function(result) {
                console.log(result);
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
                console.log(result);
                let categories = JSON.parse(result);
                let categoriesList = document.querySelector("tbody");
                categoriesList.innerHTML = "";
                categories.forEach(category => {
                    categoriesList.innerHTML += `
                        <tr>
                            <td class="fs-7 text-start align-middle">${category.id}</td>
                            <td class=" fs-7 text-cnter align-middle"></td>
                            <td class="fs-7 text-center align-middle">${category.name}</td>
                            <td class="fs-7 text-right align-middle">
                                <button class="btn btn-primary" onclick="editCategory(${category.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
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
        console.log("2");
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
                console.log(result);
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
                console.log(result);
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
                    'Your file has been deleted.',
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
                        console.log(result);
                        readCategories();
                    }
                });
                
            }
        });
    }
    readCategories();
}
