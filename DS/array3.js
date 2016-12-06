
//closest greater palindrome

var string1 = "165362"
var string2 = "125"
var string3 = "99"

function printPalindrome(str) {
	var len = str.length;
	var mid
	if (str === str.split("").reverse().join("")) {
		console.log(str);
	} else {
		if (len % 2 == 0) {
			mid = Math.floor(len / 2) - 1;
			if (Number(str.split("").splice(0, mid + 1).join("")) < Number(str.split("").splice(-(len - mid - 1), mid + 1).join(""))) {
				str = str.substr(0, mid) + (Number(str[mid]) + 1) + str.substr(mid + 1, len);
			}
		} else {
			mid = Math.floor(len / 2)
			str = str.substr(0, mid) + (Number(str[mid]) + 1) + str.substr(mid + 1, len);
		}
		str = str.split("")
		for (i = mid + 1; i <= len; i++) {
			str[i] = str[len - (i + 1)]
		}
		console.log(str.join(""))
	}
}
printPalindrome(string1)
printPalindrome(string2)
printPalindrome(string3)
