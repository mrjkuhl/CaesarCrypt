function CipherObject(shift) {

	// Need to handle spaces
	this.encrypt = function(text) {

		text = text.toLowerCase();
		var i = 0;
		var j = 0;
		var cipherText = new Array();

		while (i < text.length) {

		  while (j < this.cipher.length) {

		    if(text[i] == this.alphabet[j]) {

		      cipherText[i] = this.cipher[j];
		      j = 0;
		      break;
		    }
		    j++;
		  }
		  i++;
		}

		return cipherText.join("");
	}

	// Need to handle spaces
	this.decrypt = function(cipherText) {

		var i = 0;
		var j = 0;
		var text = new Array();

		while (i < cipherText.length) {

		  while (j < this.cipher.length) {

		    if(cipherText[i] == this.cipher[j]) {

		      text[i] = this.alphabet[j];
		      j = 0;
		      break;
		    }
		    j++;
		  }
		  i++;
		}

		return text.join("");
	}

	this.setCipher = function() {

		var i = 0;
		var cipher = new Array(this.alphabet.length);

		while (i < this.alphabet.length) {

			cipher[i] = this.alphabet[(i+this.shift)%this.alphabet.length];

			i++;
		}

		this.cipher = cipher;
	}

	this.setShift = function(shift) {

		this.shift = shift;
		this.setCipher();
	}

	this.alphabet=[
		'a', 'b', 'c', 'd', 'e',
		'f', 'g', 'h', 'i', 'j',
		'k', 'l', 'm', 'n', 'o',
		'p', 'q', 'r', 's', 't',
		'u', 'v', 'w', 'x', 'y',
		'z'
	];

	this.shift = shift;
	this.cipher;

	this.setCipher();
}
