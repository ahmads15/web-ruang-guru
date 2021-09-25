import * as base from '../base-functions/base-functions';
import  {client} from 'nightwatch-api';
const testData = require('../test_data');

const elements = {
    searchField : "//input[@class='css-1j8fjmh']",
    iconSearch : "//img[@alt='Search Black']",
    wordingNotFound: '.css-15uc6jf',
    valueKeyword : '.css-1ybigkn',
    wordingIstilahPencarianLainnya: "[data-testid='use-other-keyword']",
    wordingIstilahPencarianUmum : "[data-testid='use-general-term']",
    imageNotFound :'.css-nv5zp7',
    wordingHasilUntuk : '.css-j8mf7q',
    wordingFilter : "//p[.='Filter']",
    wordingUrutkan : "//p[.='Urutkan']",
    dropdownHarga : "//*[text()='Harga']",
    dropdownDurasi : "//*[text()='Durasi']",
    dropdownPilih : "//*[text()='Pilih']",
    instructurName : "//h2[@class='css-189195y']",
    totalResult: "[data-testid='total-result']",
    totalItem: "[data-testid='total-item']",
    courseImage : "[data-testid='course-image']",
    courseTitle : "[data-testid='course-title']",
    instructorDescription : "[data-testid='instructor-description']",
    instructorAvatar : "[data-testid = 'instructor-avatar']",
    courseDescription : "[data-testid = 'course-description']",
    price: "[data-testid = 'price-final']",
    btnBuyNow: "[data-testid = 'buy-course']",
    pagination: "[data-testid = 'pagination-per-page']",
    ratingCourse: "[data-testid = 'star-rating']",
    ratingText: "[data-testid = 'rating-text']",
    ratingCount: "[data-testid = 'rating-count']",
    dicountPercentage : "[data-testid = 'discount-percentage']",
    priceBase : "[data-testid = 'price-base']"
};


export const goToWebsiteSkillAcademy = async () =>{
    client.url('https://skillacademy.com/');
};

export const inputKeyword = async (value)=> {
    await client.useXpath();
    await base.setValueElement(elements.searchField, value);
    await base.clickElement(elements.iconSearch);
    await client.useCss();
};

export const verifyResultNotFound = async () => {
    var getKeyword = await base.getStringText(elements.valueKeyword);
    await base.waitElementNotVisible(elements.wordingHasilUntuk);
    await base.waitElementNotVisibleXpath(elements.wordingFilter);
    await base.waitElementNotVisibleXpath(elements.wordingUrutkan)
    await base.waitElementVisible(elements.imageNotFound);
    await base.expectElementEqualText(elements.wordingNotFound, testData.WORDING_SEARCH_NOTFOUND+getKeyword);
    await base.expectElementEqualText(elements.wordingIstilahPencarianLainnya, testData.WORDING_ISTILAH_LAINNYA);
    await base.expectElementEqualText(elements.wordingIstilahPencarianUmum, testData.WORDING_ISTILAH_UMUM);
};

export const verifyResultSearch = async (value) => {
    var getTotalResult = await base.getStringText(elements.totalResult);
    var getLengthData = await base.getElementLengthXpath('xpath',elements.instructurName);
    if(value == 'DQLab'){
        await client.useXpath();
        await base.waitElementVisible(elements.wordingFilter);
        await base.waitElementVisible(elements.wordingUrutkan);
        await base.waitElementVisible(elements.dropdownPilih);
        await base.waitElementVisible(elements.dropdownHarga);
        await base.waitElementVisible(elements.dropdownDurasi);
        for(var i= 1; i<= getLengthData;i++){
            await base.expectElementEqualText(elements.instructurName, value);
        };
        await client.useCss();
        await base.expectElementEqualText(elements.totalItem,'dari '+`${getTotalResult}`+' Kelas');
        await base.waitElementVisible(elements.courseImage);
        await base.waitElementVisible(elements.courseTitle);    
        await base.waitElementVisible(elements.instructorDescription);  
        await base.waitElementVisible(elements.instructorAvatar); 
        await base.waitElementVisible(elements.courseDescription);    
        await base.waitElementVisible(elements.price);
        await base.waitElementVisible(elements.btnBuyNow);        
    }else {
        await base.scrolltoElement(elements.totalItem);
        for(var i= 1; i<= getLengthData;i++){
            await client.expect.element(elements.courseTitle).text.to.contain(value);
        };
        await base.waitElementVisible(elements.courseImage);
        await base.waitElementVisible(elements.courseTitle);    
        await base.waitElementVisible(elements.instructorDescription);  
        await base.waitElementVisible(elements.instructorAvatar); 
        await base.waitElementVisible(elements.courseDescription);    
        await base.waitElementVisible(elements.price);
        await base.waitElementVisible(elements.btnBuyNow);
        await base.waitElementVisible(elements.ratingCourse); 
        await base.waitElementVisible(elements.ratingCount); 
        await base.waitElementVisible(elements.ratingText); 
        await base.waitElementVisible(elements.dicountPercentage);
        await base.waitElementVisible(elements.priceBase); 
        await base.expectElementEqualText(elements.totalItem,'dari '+`${getTotalResult}`+' Kelas');

    };
};

