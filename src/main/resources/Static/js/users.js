console.log("users.js подключен")

const url = '/api/users/'
const dbRoles = [{id: 2, name: "ROLE_USER"}, {id: 1, name: "ROLE_ADMIN"}]

// + User info navbar
const showNavbarInfo = (user) => {
    const navbarInfo = document.getElementById('navbarInfo')
    let result = `
                <span class="navbar-brand">
                <div>
                    <strong>${user.username}</strong> 
                    with roles: 
                    <span> ${user.rolesToString}</span>
                </div>
                </span>
                
                <form action="/logout" method="POST">
                    <button type="submit" class="btn btn-dark">Logout</button>                   
                </form>
                `
    navbarInfo.innerHTML = result
}
fetch('/api/user/')
    .then(response => response.json())
    .then(data => showNavbarInfo(data))
    .catch(error => console.log(error))

// + All users info tab
let usersInfo = ''
const showUsers = (users) => {
    const container = document.querySelectorAll('tbody')[0]
    users.forEach(user => {
        usersInfo += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.rolesToString}</td>
                    <td class="text text-white"><a class="btnEdit btn btn-info" >Edit</a></td>
                    <td class="text text-white"><a class="btnDelete btn btn-danger" >Delete</a></td>
                </tr>
                `
    })
    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}

// + User info tab
let userInfo = ''
const showUser = (user) => {
    const container = document.querySelectorAll('tbody')[1]
    userInfo += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.rolesToString}</td>
                </tr>
                `
    container.innerHTML = userInfo
}
fetch('/api/user/')
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))

// // + Add new user tab
const formNew = document.getElementById('newUserForm')
const firstname = document.getElementById('nameId')
const lastname = document.getElementById('lastnameId')
const age = document.getElementById('ageId')
const username = document.getElementById('emailId')//username
const password = document.getElementById('passwordId')
const roles = document.getElementById('rolesId')
let option = ''

btnNewUser.addEventListener('click', () => {
    console.log('btnNewUser click')
    firstname.value = ''
    lastname.value = ''
    age.value = ''
    username.value = ''
    password.value = ''
    roles.innerHTML = `
                        <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                        <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                        `
    option = 'newUser'
})

formNew.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('rolesId'))
    console.log(
        username.value, firstname.value, lastname.value, age.value, password.value, listRoles
    )
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            firstname: firstname.value,
            lastname: lastname.value,
            age: age.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    $('.nav-tabs a[href="#usersTable"]').tab('show')
})

// + Edit user modal
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('modalEdit')
const name0 = document.getElementById('name0')
const lastname0 = document.getElementById('lastname0')
const age0 = document.getElementById('age0')
const email0 = document.getElementById('email0')
const password0 = document.getElementById('password0')
const roles0 = document.getElementById('roles0')
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML

    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        name0.value = user.firstname
        lastname0.value = user.lastname
        age0.value = user.age
        email0.value = user.username
        password0.value = ''
        roles0.innerHTML = `
                                <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                                <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                                `
        Array.from(roles0.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        // let listRoles = roleArray(document.getElementById('rolesEdit'))
        // console.log(listRoles)
        // console.log(idForm)
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('roles0'))
    console.log(
        idForm, name0.value, lastname0.value, age0.value,
        email0.value, password0.value, listRoles
    )
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            firstname: name0.value,
            lastname: lastname0.value,
            age: age0.value,
            username: email0.value,
            password: password0.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

// + Delete user modal
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const id00 = document.getElementById('id00')
const name00 = document.getElementById('name00')
const lastname00 = document.getElementById('lastname00')
const age00 = document.getElementById('age00')
const email00 = document.getElementById('email00')
const roles00 = document.getElementById('roles00')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        id00.value = user.id
        name00.value = user.firstname
        lastname00.value = user.lastname
        age00.value = user.age
        email00.value = user.username
        roles00.innerHTML = `
                                    <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                                    `
        Array.from(roles00.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show()
    }
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}
