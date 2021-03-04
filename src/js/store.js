import { convertDate } from './utils';

function saveItems(array){
    localStorage.setItem('items', JSON.stringify(array));
    insertStoredArticles();
}

function getItems(){
    let items = JSON.parse(localStorage.getItem('items'));

    if(!items){
        return [];
    }

    return items;
}

export function deleteArticle(article){
    let items = getItems().filter(el => el.id !== article.id);
    saveItems(items);
}

export function addArticle(article){
    let items = getItems();

    if(!items.find(el => el.id === article.id)){
        items.push(article);
    }

    saveItems(items);
}

export function insertStoredArticles(){
    let data = getItems();
    let wrapper = document.querySelector('.readlater_list');
    wrapper.innerHTML = '';

    data.map(article => {
        let element = document.createElement('div');
        element.innerHTML = '<li class="readlater_article">' +
                        '<span>#' + article.sectionName + '</span>' +
                        '<h3>'+ article.webTitle + '</h3>' +
                        '<label>'+ convertDate(article.webPublicationDate) + '</label>' +
                        '<div class="article_actions">' +
                            '<a href="'+ article.webUrl + '" target="_blank" class="button button--fourth">Read</a>' +
                            '<button class="button button--fourth  button-clear">Remove</button>' +
                        '</div>' +
                    '</li>';

        let button = element.querySelector('.button-clear');
        button.onclick = function(){
            deleteArticle(article);
        };

        wrapper.appendChild(element);
    });
}