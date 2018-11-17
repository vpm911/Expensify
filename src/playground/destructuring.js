console.log('Destructuring');

// A] OBJECT DESTRUCTURING
const person = {
    name: 'Vishal',
    age:25,
    location :{
        city: 'pune',
        temp : 24
    }
};

const person2 = {
    age:24,
    location:{
        city: 'Mumbai'
    }
};

// syntax for using firstName1 as the variable & set it to person.name with a default of 'Anonymous'
const {name:firstName1="Anonymous",age:age1}  = person;
console.log(`${firstName1} is ${age1} years old..`);
const {name:firstName2="Anonymous",age:age2} = person2;
console.log(`${firstName2} is ${age2} years old..`);

// this is also useful for checking if the variable exists before accessing it 
// here we are checking if both, city and temp are specified for an object using this concise syntax
const {city, temp:temperature} =person.location;
if(city && temperature){
    console.log(`Its ${temperature} degrees in ${city}`);
}

const {city:city2, temp:temp2} =person2.location;
if(city2 && temp2){
    console.log(`Its ${temp2} degrees in ${city2}`);
    // this will not be logged because temp2 doesn't exist
}


// B] Array destructuring : 


