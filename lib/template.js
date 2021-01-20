var sanitizeHTML = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
	  <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${sanitizeHTML(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }, authorsTag:function(authors, defaultTag){
		var tag = `<select name="author">`;
		var i = 0;
		while(i<authors.length){
			var selected = "";
			if(defaultTag==authors[i].id){
				selected = " selected"
			}
			tag += `<option value="${authors[i].id}"${selected}>${sanitizeHTML(authors[i].name)}</option>`;
			++i;
		}
		tag += `</select>`;
	  	return tag;
  }, authorsTable:function(authors){
	 	 var tag = `<table>`;
			var i = 0;
			while(i<authors.length){
				tag += `
				<tr>
					<td>${sanitizeHTML(authors[i].name)}</td>
					<td>${sanitizeHTML(authors[i].profile)}</td>
					<td><a href="/author/update?id=${authors[i].id}">update</a></td>
					<td>
						<form action="/author/delete_process" method="post">
							<input type="hidden" name="id" value="${authors[i].id}">
							<input type="submit" value="delete">
						</form>
					</td>
				</tr>
				`
				++i;
			}
	  return tag;
  }
}
