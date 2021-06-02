/**
* DO NOT MODIFY, I REPEAT, DO NOT MODIFY
**/

/**
* Gets an item from a safe
* @param {string} password - the password for the safe
* @returns {Promise} promise that resolves or rejects depending on whether the password is correct
*
*/
function getItemFromSafe(password) {
  console.log('getItemFromSafe');
  const itemsMap = {
    '10-A-w-4-878': 'Magic Wand',
    '16-R-a-9-1497': 'The one ring to rule them all',
    '5-N-3-441': 'Corgi',
    '9-Y-d-2-643': 'Apples and Pears',
    '7-H-673': 'Oscar nomination',
    '12-D-l-4-860': 'Chocolate Brownie'
  }
  return new Promise((resolve, reject) => {
    if (itemsMap[password]) {
      console.log('IF');
      resolve(itemsMap[password])
    } else {
      console.log('Else');
      reject('Unauthorised access to safe')
    }
  })
}
/** 
 * END DO NOT MODIFY 
 **/

async function unlockSafe(customerName) {
  /** 
   * WRITE YOUR CODE IN HERE 
   **/
  console.log('customerName ::', customerName);
  var pwd = '';
  // Split full name
  var fullNameSplit = customerName.split(" ");
  var fName = fullNameSplit[0];
  var lName = fullNameSplit.length > 1 ? fullNameSplit[fullNameSplit.length - 1] : '';
  // console.log('fName ::', fName);
  // console.log('lName ::', lName);

  //length
  const lengthFnameLname = getFullNameLength(fName, lName);
  //console.log('lengthFnameLname ::', lengthFnameLname);

  if (lengthFnameLname > 0) {
    pwd += lengthFnameLname + '-';
  }

  const lastLtrOfFname = lastLetterOfFName(fName);
  //console.log('lastLtrOfFname ::', lastLtrOfFname);

  if (lastLtrOfFname.length > 0) {
    pwd += lastLtrOfFname + '-';
  }

  const firstLtrOfLName = firstLetterOfLName(lName);
  //console.log('firstLtrOfLName ::', firstLtrOfLName);
  if (firstLtrOfLName.length > 0) {
    pwd += firstLtrOfLName + '-';
  }

  let countVowel = 0;
  countVowel = countVowels(customerName);
  //console.log('countVowel ::', countVowel);
  if (countVowel > 0) {
    pwd += countVowel + '-';
  }

  //remove duplicate
  const noDupChar = removeDuplicate(customerName).split(" ").join("");
  console.log('noDupChar ::', noDupChar);

  //Sum of UTF Char 
  const sumUTFCharCode = strToUTF16(noDupChar);
  console.log('sumUTFCharCode ::', sumUTFCharCode);
  if (sumUTFCharCode > 0) {
    pwd += sumUTFCharCode;
  }
  console.log('Final password ::', pwd);
  getItemFromSafe(pwd);

  //Clear password before next user
  pwd = '';

};

//The first name length added to the last name length
getFullNameLength = (fName, lName) => {
  return fName.length + lName.length;
};

//The captialised last letter of the first name
lastLetterOfFName = (fName) => {
  return (fName.substr(fName.length - 1)).toUpperCase();
};

//The lowercasefirst character of the last name
firstLetterOfLName = (lName) => {
  return (lName.charAt(0)).toLowerCase();
};

//The total number of vowels (a, e, i, o, u) in the full name
countVowels = (customerName) => {
  return (customerName.match(/[aeiou]/gi) == null) ? 0 : customerName.match(/[aeiou]/gi).length;
};

//Remove duplicate characters from the user name
removeDuplicate = (nameStr) => {
  var input = nameStr;
  var seen = new Set();
  var output = input
    .split("")
    .filter(x => !seen.has(x.toLowerCase()) && seen.add(x.toLowerCase()))
    .join("");
  return output;
};

//Get UTF-8/16 character code of any string 
function strToUTF16(str) {
  var arr = []
  var sumUTFCharCode = 0;
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i);
    sumUTFCharCode += parseInt(str.charCodeAt(i));
  }
  console.log('UTF-8/16 code ::', arr)
  return sumUTFCharCode;
};

module.exports = unlockSafe