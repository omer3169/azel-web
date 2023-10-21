const repos = document.getElementById("repo-list");
document.addEventListener("DOMContentLoaded", function(event) { 
  typeWriter("output", textArray);
});

var textArray = [
  "Licensed Chess Player", 
  "Discord Bot Developer",
  "Graphig Desinger",
  "Programmer"
]

async function getRepo(user) {
  const result = await fetch(`https://api.github.com/users/${user}/repos`);
  let repos = await result.json();

  repos = filterRepos(repos);
  return repos;
}

function filterRepos(repos) {
  const foundRepos = [];

  for (repo of repos) {
    if (repo.fork) continue;

    repo.created_at = new Date(repo.created_at);
    foundRepos.push(repo);
  }

  const sortRepo = foundRepos.sort((a, b) => b.created_at - a.created_at);

  return sortRepo.slice(0, 12);
}

(async function () {
  for (repo of await getRepo("Cinarss")) {
    const repoDiv = document.createElement("a");
    repoDiv.innerText = repo.name;
    repoDiv.href = repo.html_url;
    repoDiv.target = "_blank";
  }
})();

document.body.onmousemove = (e) => {
  document.getElementById(
    "cordinates"
  ).innerText = `${e.clientX}X, ${e.clientY}Y`;
};
var tarih = new Date();
document.getElementById("date").innerText = tarih.toDateString()
