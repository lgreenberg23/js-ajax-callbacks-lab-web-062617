$(document).ready(function (){

 


});

function searchRepositories(){
	let searchTerm = $('#searchTerm').val()
// Now we start the Ajax GET request. The first parameter is the URL with the data.
// The second parameter is a function that handles the response.
	$.get(`https://api.github.com/search/repositories?q=${searchTerm}`, function(response){
	// $.get(`https://api.github.com/lalala`, function(response){
			console.log(response)
		let repos = response.items.map(repo => `
			<li>
				<a href="#" onclick="showCommits('${repo.commits_url.slice(0, -6)}')">Show Commits</a><br>
				Repo Name: ${repo.name},
				description: ${repo.description},
				link: <a href="${'${repo.archive_url'}">Go to Repos</a>,<br>
				owner login: ${repo.owner['login']},
				avatar:<img src="${repo.owner.avatar_url}">,
				link to profile: ${repo.owner.html_url}
			</li>`) 
		let repoList =
		`
		<ul>
			${repos}	
		</ul>
		`
		$('#results').html(repoList)
	}).fail(function(error) {
	  // This is called when an error occurs
	  console.log('Something went wrong: ', error.responseJSON.message);
	});
}

function showCommits(url){
// function that gets the
// repository's commits from the GitHub API and display them in the `details` div.
// For each commit, list the SHA, the author, the author's login, and the author's
// avatar as an image. 
	$.get(url, function(response){
	console.log(response)
	let commits = response.map(commit =>
		` <li>

		SHA: ${commit.sha}
		Author: ${commit.author.login}

		</li>`)



	let commitList = 
		`
		<ul>
			${commits}	
		</ul>
		`
	

	$('#details').html(commitList)

	}).fail(function(error) {
	  // This is called when an error occurs
	  console.log('Something went wrong: ' + error);
	});
}


// 1. Create a "Search Repositories" link that calls a `searchRepositories`
// function on click, takes the value of a `searchTerms` text input, and queries
// the GitHub repository search API. 

// 2. Display the collection of repositories
// inside the `results` div. Include 
// repository name, 
// description, 
// and a link tothe HTML URL. Also include 
// repository owner login, 
// repository owner avatar as an image, and a 
// link to the owner's profile page. **Hint:** Pay close attention to
// // the structure of the search results! 

// 3. Add a "Show Commits" link to each

// 4. Handle errors on each API call. If `$.get` fails, call a
// function `displayError` and display "I'm sorry, there's been an error. Please
// try again." in the `errors` div. **Hint:** You can test your error callbacks by
// turning off Wi-Fi or temporarily changing the URL you use in the `$.get`
// request.
