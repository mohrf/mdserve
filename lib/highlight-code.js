const hljs = require('highlight.js');
const md = require('markdown-it');

module.exports = () => {
  return {
	  highlight: function(str, lang) {
	    if (lang && hljs.getLanguage(lang)) {
		    try {
		      return '<pre class="hljs"><code>' +
			      hljs.highlight(lang, str, true).value +
			      '</code></pre>';
		    } catch(__) {}
	    }

	    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  }
}
