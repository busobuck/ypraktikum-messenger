class ChatApp {
    constructor() {
        this.initForms()
    }

    initForms() {
        const formElements = [...document.getElementsByTagName('form')]

        formElements.forEach((formElement) => {
            console.log(formElement)
            new CustomForm(formElement)
        })
    }
}

class CustomForm {
    constructor(domFormElement) {
        this.domFormElement = domFormElement
        this.setListeners()
    }

    setListeners = () => {
        this.domFormElement.addEventListener('submit', (event) => {
            event.preventDefault()
            console.log(this.aggregateFormData())
        })
    }

    aggregateFormData = () => {
        const formData = new FormData(this.domFormElement)
        return [...formData.keys()].reduce((acc, val) => ({
            ...acc,
            [val]: formData.get(val)
        }), {})
    }
}

new ChatApp()
