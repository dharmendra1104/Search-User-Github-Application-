document.querySelector('.btn').addEventListener('click', () => {
  let value = input.value
  let gitApi = `https://api.github.com/users/${value}`
  // console.log(value)
  fetchData(gitApi)
})

async function fetchData(url) {
  try {

    document.querySelector('.card-container').innerHTML = `<h1 class='loader'></h1>`;

    const response = await fetch(url);
    const data = await response.json();

    const reposResponse = await fetch(data.repos_url);
    const reposData = await reposResponse.json();

    const repositories = reposData.map(repo => `
      <div>
        <h>Repository ID: ${repo.id}</h><br>
        <h>Repository Name: ${repo.name}</h><br>
        <a href=" ${repo.html_url}">Repository URL: ${repo.html_url}</a><br>
      </div>
    `).join("");

    const userInfoHTML = `
      <div class="card">
      <div class="image">
      <img src=${data.avatar_url} alt="#"/>
      </div>
        <div class="box">
          <div class="box-1">
            <p>${data.name}</p>
            <p>Git-ID : ${data.id}</p>
            <p>Location : ${data.location}</p>
            <p>Email : ${data.email}</p>
          </div>
          <div class="box-2">
            <p>Followers : <span>${data.followers}</span></p>
            <p>Following : <span>${data.following}</span></p>
            <p>Total Repository : <span>${data.public_repos}</span></p>
          </div>
          </div>
          <div class="profile">
          <a href=${data.html_url}>Github Profile</a>
          </div>
        <div class="repos">
          <h2>Some Repositories On GitHub</h2>
          <div class="repo1">${repositories}</div>
        </div>
      </div> `

    document.querySelector('.card-container').innerHTML = userInfoHTML;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

