
export default function convertKeysToLowercase(obj){
  let newObj = {};
  for(let key in obj){
    newObj[key.toLowerCase()] = obj[key];
  };
  return newObj;
};