import './styles/main.css';
import { addArticle, insertStoredArticles } from './js/store';
import { convertDate, getDateDays } from './js/utils';
import { API } from './js/api';

let currentPage = 1;
let allPages;
let category = 'all';

const DAYS_BEFORE = 30;

let pageNumber = document.querySelector('.pagination span');
let categoryButtons = document.querySelectorAll('.filters_container button');
let newsContentSearch = document.getElementById('newsContentSearch');

function insertArticles(data){
    const wrapper = document.querySelector('.article_list');
    wrapper.innerHTML = '';

    data.map(article => {
        let element = document.createElement('div');
        element.innerHTML = '<li class="article">' +
                '<div class="article_text">'+
                    '<div class="article_info">' +
                        '<span>#' + article.sectionName + '</span>' +
                        '<label>'+ convertDate(article.webPublicationDate) + '</label>' +
                    '</div>' +
                    '<h3>'+ article.webTitle + '</h3>' +
                    article.fields.trailText +
                    '<div class="article_actions">' +
                        '<a href="'+ article.webUrl + '" target="_blank" class="button button--secondary">Read later</a>' +
                        '<button class="button btn-readlater button--primary">Read later</button>' +
                    '</div>' +
                '</div>'+
            '</li>';

        var button = element.querySelector('.btn-readlater');
        button.onclick = function(){
            addArticle(article);
        };

        wrapper.appendChild(element);
    });
}

function nextPage(){
    if(currentPage < allPages){
        currentPage += 1;
        fetchData();
    }
}

function prevPage(){
    if(currentPage > 1){
        currentPage -= 1;
        fetchData();
    }
}

function updatePagination(){
    pageNumber.innerHTML = `${currentPage} / ${allPages}`;
}

async function fetchData(){
    let search = newsContentSearch.value;
    let date = getDateDays(DAYS_BEFORE);

    let { response } = await API.getArticles(currentPage,category,search,date);

    allPages = response.pages;

    updatePagination();
    insertArticles(response.results);
}

fetchData();
insertStoredArticles();


Array.from(categoryButtons).map(btn => {
    btn.addEventListener('click', () => {
        Array.from(categoryButtons).forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        currentPage = 1;
        category = btn.getAttribute('data-value');
        fetchData();
    });
});

document.getElementById('newsContentSearch').addEventListener('change', () => {
    currentPage = 1;
    fetchData();
});
document.getElementById('pagination_prev').addEventListener('click', prevPage);
document.getElementById('pagination_next').addEventListener('click', nextPage);