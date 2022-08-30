var fs = require('fs');

exports.handler = async (event) => {
    const html=`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible"
          content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>Vulnerable Webpage</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossorigin="anonymous">
</head>

<body>
    <div class="container mt-5">
        <h3 class="text-center fw-bold">Search Customers</h3>
        <form class="my-5"
              method="GET">
            <div class="input-group mb-3">
                <span class="input-group-text fw-bold"
                      id="prefix">First name or Last name</span>
                <input type="text"
                       class="form-control"
                       name="query"
                       id="input"
                       aria-label="Search"
                       aria-describedby="prefix">
                <button class="btn btn-danger"
                        type="button"
                        id="suffix">Search</button>
            </div>
        </form>
        <div id="result"
             class="container visually-hidden">
            <h3 class="fw-bold">Result:</h3>
            <h5 id="response"
                class="text-center"></h5>
            <div id="users"></div>
        </div>
    </div>
    <script>
        async function fetchUsers(name) {
            const endpoint = 'https://6rcis30w2d.execute-api.ap-south-1.amazonaws.com/search';
            const options = {
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                }),
                method: 'POST'
            };
            const response = await fetch(endpoint, options);
            const users = await response.json();
            return users;
        }

        function createDataNode(name, data) {
            const node = document.createElement('div');
            const nameSpan = document.createElement('span');
            const dataSpan = document.createElement('span');

            nameSpan.classList.add('fw-bold');
            nameSpan.innerText = name + ": ";
            node.appendChild(nameSpan); 

            dataSpan.innerText = data;
            node.appendChild(dataSpan);
            return node;
        }

        function createNode(node, user) {
            node.classList.add('my-5');
            node.appendChild(createDataNode('First Name', user.first_name));
            node.appendChild(createDataNode('Last Name', user.last_name));
            node.appendChild(createDataNode('Phone number', user.phone_no));
            node.appendChild(createDataNode('Age', user.age));
            node.appendChild(createDataNode('Address', user.address));
        }

        document.getElementById('suffix').addEventListener('click', async function (e) {
            document.getElementById('result').classList.remove('visually-hidden');
            const input = document.getElementById('input').value;
            const response = await fetchUsers(input);
            const usersDiv = document.getElementById('users');
            response.users.forEach(user => {
                const div = document.createElement('div');
                div.classList.add('container');
                createNode(div, user);
                usersDiv.appendChild(div);
            })
        })
    </script>
</body>

</html>`;
    // TODO implement
    const response = {
        'statusCode': 200,
        'isBase64Encoded': false,
        'headers':{
            "Content-Type": "text/html"
        },
        'body': html
    };
    return response;
};
