var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  // DID: Use handlebars to render your articles.
  //       - Get your template from the DOM.
  //       - Now "compile" your template with Handlebars.

  // var dataCategory = this.category;
  // var dataAuthor = this.author;

  var blogTemplate = $('#blog-post').html();
  var compiledTemplate = Handlebars.compile(blogTemplate);


  // DONE: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced by key in the template.
  //   For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var htmlBody = $(this.body).html();
   var dataSource = {
     title: this.title,
     author: this.author,
     body: htmlBody,
     daysAgo: this.daysAgo,
     url: this.authorUrl
   }

   var html = compiledTemplate(dataSource);

  $('#posts').append(html);
  $('#posts').append('hello ');

return html;
  // DID: Use the function that Handlebars gave you to return your filled-in html template for THIS article.
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
