import { Validation } from './Validation.js';

class Forms {
    constructor() {
        this.forms = [];

        this.init();
    }

    init() {
        this.findAllForms();
        this.addEvents();
    }

    findAllForms() {
        const forms = document.querySelectorAll('.forms');
        this.forms = [...forms];
    }

    addEvents() {
       for (const form of this.forms) {
           const inputs = form.querySelectorAll('input');
           const textareas = form.querySelectorAll('textarea');
           const allInputs = [...inputs, ...textareas];

           const submit = form.querySelector('.btn'); 
           
           submit.addEventListener('click', (event) => {
               event.preventDefault();
               
               for (const input of allInputs) {
                   const rule = input.dataset.validationRule;
                   const text = input.value;
                   
                   switch (rule) {
                        case 'name':
                           console.log(Validation.isValidName(text));
                           break;

                        case 'email':
                            console.log(Validation.isValidEmail(text));
                            break;

                        case 'text':
                           console.log(Validation.isValidText(text));
                           break;

                        default:
                               break;

                    } 
               }

           })
       } 
    }
}

export { Forms } 