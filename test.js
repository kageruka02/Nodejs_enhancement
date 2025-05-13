const numbers = [1, 2, 3, 4]
const [firstNumber, secondNumber] = numbers;
console.log(firstNumber, secondNumber)
const good = [...numbers]
good.push(1)
console.log(good)
console.log(numbers);


const people = {
    person: "1", 
    good: "2"
}
printProperties = ({ good }) => good;
console.log(printProperties(people))




const newObject = { "name": 'good' }
const fromObject = Object.entries(newObject)
console.log(fromObject);