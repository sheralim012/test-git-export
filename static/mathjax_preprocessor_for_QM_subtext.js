$('.text-input-dynamath_data').addClass('inline');	// tmp fix until https://github.com/edx/edx-platform/pull/2869 gets merged

window.MathjaxPreprocessorForQM = function () {
    /*----------------------------------------------------------------------
     * Translate conventions for quantum mechanics math for MathJax
     *   '>' --> '\rangle'
     *----------------------------------------------------------------------
     */
    this.fn = function (eqn) {
        // Default keywords are taken from capa/calc.py
        var default_keywords = ['sin', 'cos', 'tan', 'sqrt', 'log10', 'log2', 'ln', 'arccos', 'arcsin', 'arctan', 'abs', 'pi', 'inf'];

        // Escape keywords are strings that have special meaning in QM that should not be processed by MathJax
        var escape_keywords = ['ket'];

	// make H boldface (denote as operator)
        var replace_H = function (match) {
            return '\\mathbf{H}';
        };
        eqn = eqn.replace(/H/g, replace_H);

	// hbar
        var replace_hbar = function (match) {
            return '\u210F';
        };
        eqn = eqn.replace(/hbar/g, replace_hbar);

	// ZZ
        var replace_ZZ = function (match) {
            return 'Z Z';
        };
        eqn = eqn.replace(/ZZ/g, replace_ZZ);

	// None
        var replace_None = function (match) {
            return 'No n e';
        };
        eqn = eqn.replace(/None/g, replace_None);

	// none
        var replace_none = function (match) {
            return 'no n e';
        };
        eqn = eqn.replace(/none/g, replace_none);

	// eye(n)
        var replace_eye = function (match) {
            return '{:'+match+':}';
        };
        eqn = eqn.replace(/eye\(\d\)/g, replace_eye);

        // handle ket
        var replace_ket = function (match) {
            return '\\rangle:}';
        };
        eqn = eqn.replace(/>/g, replace_ket);

	// handle vertical bar, to add an invisible leftbracket (see common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/jax/input/AsciiMath/jax.js)
        var replace_vert = function (match) {
            return ':{:';
        };
        eqn = eqn.replace(/\|/g, replace_vert);

        var replace_vert2 = function (match) {
            return '{:|{:';
        };
        eqn = eqn.replace(/:{:/g, replace_vert2);

        // handle bra
        var replace_bra = function (match) {
            return '\\langle';
        };
        eqn = eqn.replace(/</g, replace_bra);

	var replace_uni = function(match){ return ''; };
	eqn = eqn.replace(/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0603\u06dd\u070f\u17b4-\u17b5\u200b-\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]|\ud834[\udd73-\udd7a]|\udb40[\udc01\udc20-\udc7f]/g, replace_uni);

        // Second, escape QM specific keywords from MathJax
        var replace_escape_keyword = function (match) {
            return '"' + match + '"'; // Force MathJax plain text
        };
        for(i=0; i<escape_keywords.length; i++) {
            var escape_keyword = escape_keywords[i];
            var escape_pattern = RegExp('\\b'+escape_keyword+'\\b','gi');
            eqn = eqn.replace(escape_pattern, replace_escape_keyword);
        }

        return eqn;
    };
}
