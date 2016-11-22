import {ISeoPageResource, SeoPageResourceName, ISeoPage} from "../../resources/seo.page.resource";
const template = `
<md-toolbar md-scroll-shrink ng-if="true">
    <div class="md-toolbar-tools">
        <h1>Сторінки</h1>
        <span flex></span>

    </div>
</md-toolbar>

<form name="orderForm" novalidate class="md-padding  md-margin" ng-submit="::$ctrl.save(orderForm,$ctrl.seotPage)" flex>
    <md-button type="submit" ng-if="$ctrl.seotPage._id"
               class="md-primary " aria-label="new">
        ЗБЕРЕГТИ
    </md-button>
    <md-input-container layout="row" class="md-block">
        <label for="level">Сторінка</label>
        <md-select name="level" ng-model="$ctrl.seotPage"
        >
            <md-option ng-repeat="page in $ctrl.seopages" ng-value="page">
                {{ page.text }}

            </md-option>
        </md-select>
    </md-input-container>

    <md-input-container class="md-block ">
        <label for="name">Заголовок українською (буде у поршому рядку пошуку 50 символів рекомендовано
            65 максимум)</label>
        <input id="name" ng-model="$ctrl.seotPage.title" name="title" ng-maxlength="65"/>
        <div ng-messages="orderForm.title.$error" role="alert"
             ng-show="orderForm.$submitted && orderForm.name.$invalid">
            <div class="md-headline" ng-message="maxlength">
                Перевищено максимум символів
            </div>
        </div>
    </md-input-container>
    
    <md-input-container class="md-block">
        <label for="description">Опис українською. Чому потрібно відкрити цб сторінку (100 символів
            рекомендовано 155 максимум)</label>
        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.seotPage.description"
                  id="description" name="description" ng-maxlength="155"></textarea>

    </md-input-container>
    <md-input-container class="md-block">
        <label for="description">Опис. російською Чому потрібно відкрити цб сторінку (100 символів
            рекомендовано 155 максимум)</label>
        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.seotPage.description_ru"
                  id="description" name="description_ru" ng-maxlength="155"></textarea>

    </md-input-container>

    <md-input-container class="md-block">
        <label for="description">Ключові українською слова( слово чи словосполучання озділені комою 255
            символів максимум)</label>
        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-maxlength="250"
                  ng-model="$ctrl.seotPage.keywords"
                  id="description" name="keywords"></textarea>

    </md-input-container>
    <md-input-container class="md-block">
        <label for="description">Ключові російською слова( слово чи словосполучання озділені комою 255
            символів максимум)</label>
        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-maxlength="250"
                  ng-model="$ctrl.seotPage.keywords_ru"
                  id="description" name="keywords_ru"></textarea>
        <div ng-messages="orderForm.keywords_ru.$error" role="alert"
             ng-show="orderForm.$submitted && orderForm.keywords_ru.$invalid">
            <div class="md-headline" ng-message="maxlength">
                Перевищено максимум символів
            </div>
    </md-input-container>


</form>

`;

export class SeosComponentController {

    static $inject = [SeoPageResourceName, '$mdToast', '$mdDialog'];

    seoPage: ISeoPage;
    seopages: ISeoPage[];
    ganerationRuned: boolean;


    constructor(private SeoPageResource: ISeoPageResource, private $mdToast, private $mdDialog) {
        this.seoPage = new this.SeoPageResource();
    }

    $onInit() {

        this.seopages = this.SeoPageResource.query()
        this.seopages.$promise.then((pages)=> {
            if (pages.length == 0) {
                this.SeoPageResource.getStubs().$promise.then(()=> {
                    this.seopages = this.SeoPageResource.query();
                })
            }
        })
    }

    save(form, page) {
        if (!form.$invalid) {
            page.$save().then((favor) => {
                this.$mdToast.showSimple(`Дані seo збережено`);
            })
                .catch((err)=> {
                    this.showErrorDialog();
                });
        }
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }



}

export let SeosComponentUrl = "/seos";
export let SeosComponentName = 'pgSeos';
export let SeosComponentOptions = {
    template: template,
    controller: SeosComponentController
};