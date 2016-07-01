const template = `
<h1>У Вас недостатньо прав для перегляду цієї сторінки.<br/> Спробуйте <a href="/admin#/login">залогінитися</a>  як користувач з достатніми правами</h1>`;
export const NotAuthorizedComponentName = 'pgNotAuthorized';
export const NotAuthorizedComponentUrl = '/notauthorized';
export const NotAuthorizedComponentOptions = {
    template: template
};