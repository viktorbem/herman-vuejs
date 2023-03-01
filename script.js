Vue.createApp({

    data() {
        return {
            user: this.restoreUser(),
            isFormSubmited: false,
            isPasswordHidden: true,
            errorMessages: []
        }
    },

    methods: {
        submitForm() {
            this.errorMessages = [];
            if (Object.values(this.user).some((value) => value === '')) {
                this.errorMessages.push('Musíte vyplnit všechna pole formuláře.');
            }
            if (!/^(.+)@(.+)$/.test(this.user.email)) {
                this.errorMessages.push('Zadejte email ve správném formátu.');
            }
            if (this.user.password !== this.user.password2) {
                this.errorMessages.push('Vámi zadaná hesla nesouhlasí.');
            }
            if (this.user.password.length < 8) {
                this.errorMessages.push('Vámi zadané heslo je příliš krátké.');
            }

            if (this.errorMessages.length === 0) {
                // this is where all the API call will be handled...
                this.isFormSubmited = true;
            }
        },

        clearForm() {
            this.user = this.restoreUser();
            this.isFormSubmited = false;
            this.isPasswordHidden = true;
            this.errorMessages = [];
        },

        restoreUser() {
            return {
                name: '',
                email: '',
                password: '',
                password2: ''
            }
        },

        revealPassword(index) {
            if (index === this.confirmationData.length - 1) {
                this.isPasswordHidden = !this.isPasswordHidden;
            };
        }
    },

    computed: {
        isError() {
            return this.errorMessages.length > 0;
        },

        confirmationData() {
            let userPassword = this.user.password;
            if (this.isPasswordHidden) {
                userPassword = '•'.repeat(userPassword.length);
            }

            return [
                this.user.name,
                this.user.email,
                userPassword
            ];
        }
    }

}).mount('#app');