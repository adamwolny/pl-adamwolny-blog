
const API_URL = 'https://content.guardianapis.com';
const API_KEY = 'c84fd772-85f3-4943-8584-6a5a92e7abff';

export const API = {
    getArticles: (page,section,search,date) => fetch(`${API_URL}/search?api-key=${API_KEY}&from-date=${date}&show-fields=thumbnail,trailText&page=${page}&q=${search}${section !== 'all' ? `&section=${section}` : ''}`)
        .then(response => response.json())
};