class Helpers {
    static getClassSelectorByName(name) {
        return `.${name}`
    }
}

class ChatApp {
    /**
     * todo *2
     * readonly
     * @type {{chatWindow: string, additionalOptionsHandler: string}}
     */
    selectors = {
        chatWindow: 'chat-messages-window',
        additionalOptionsHandler: 'chat-messages-input__additional'
    }

    constructor() {
        this.initForms()
        this.pixelateImages()

        if (window.isChatWindow !== undefined && window.isChatWindow) {
            this.chatItemsInit()

            this.chatMessagesWindow = document.getElementById(this.selectors.chatWindow)
            if (this.chatMessagesWindow !== null && !this.chatMessagesWindow.classList.contains(`${this.selectors.chatWindow}--inactive`)) {
                this.searchButtonInit()
                this.chatPlusButtonInit()
            }
        }
    }

    initForms() {
        const formElements = [...document.getElementsByTagName('form')]

        formElements.forEach((formElement) => {
            console.log('setting form event listener to:', formElement)
            new CustomForm(formElement)
        })
    }

    chatItemsInit() {
        this.chatItems = document.querySelectorAll('.chat-item')

        this.chatItems.forEach((chatItem) => {
            chatItem.addEventListener('click', () => {
                if (chatItem.classList.contains('active')) {

                } else {
                    this.chatItems.forEach((item) => item.classList.remove('active'))
                    chatItem.classList.add('active')
                }

            })
        })
    }

    searchButtonInit() {
        document
            .getElementById('chat-search-button')
            .addEventListener('click', (element) => {
                console.log('search event dispatch by the button')
                element.target.closest('form').dispatchEvent(new Event('submit'))
            })
    }

    /**
     * All images on page with class 'pixelate' must be pixelized
     */
    pixelateImages() {
        document.querySelectorAll('img.pixelate')
            .forEach((imageTag) => {
                // todo: implements later
                // pixelate()
            })
    }

    chatPlusButtonInit() {
        this.chatMessagesWindow.querySelector(Helpers.getClassSelectorByName(this.selectors.additionalOptionsHandler))
            .addEventListener('click', (event) => {
                let chatWindow = event.target.closest(Helpers.getClassSelectorByName(this.selectors.chatWindow))
                chatWindow.classList.toggle(`${this.selectors.chatWindow}--with-additional-options`)
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
