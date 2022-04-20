// Constants
import { timeInMs, alphabet } from './constants';

// Emailjs
import emailjs from '@emailjs/browser';

export function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Accounts
export function validateEmail(email) {
    const domainExt = ["com", "edu", "net", "org"]
    let validated = true

    if (!(email.includes('@'))) {
        // Error: No '@'
        validated = false
    } else if (email.split('@')[1].split('.') === '') {
        // Error: @.com
        validated = false
    } else if (!(domainExt.includes(email.split('@')[1].split('.')[1]))) {
        // Error: .something
        validated = false
    }

    return validated
}

export function sendRegisterCode(params) {
    // console.log('sending params')
    emailjs.send('FoodSpace', 'register_template', params, '9f_fxwxgsAliU65LI')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};


export function generateHashCode() {


    let code = ''
    for (let i = 0; i < 4; i++) {
        let hash = ''
        for (let j = 0; j < 2; j++) {
            hash += randomItem(alphabet)
            hash += (Math.floor(Math.random() * 9)) + 1
        }
        if (i !== 3) {
            code += `${hash}-`
        } else {
            code += hash
        }
    }

    // Output: a1b2-c3d4-e5f6-g7h8
    return code
}

export function convertToMs(lifeSpan, time) {
    return lifeSpan * timeInMs[time]
}

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function convertToValidDate(date) {
    return new Date(date).toJSON().split('T')[0]
}